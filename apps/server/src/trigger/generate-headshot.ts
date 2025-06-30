import { Buffer } from "node:buffer";
import { PassThrough } from "node:stream";
import { openai } from "@ai-sdk/openai";
import { fal } from "@fal-ai/client";
import { schemaTask } from "@trigger.dev/sdk/v3";
import { generateObject } from "ai";
import archiver from "archiver";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../db";
import { headshotImage, headshotRequest } from "../db/schema";
import { env } from "../env";
import { uploadImage } from "../lib/cloudflare";
import { sendHeadshotCompletedEmail } from "../lib/email";

fal.config({
	credentials: env.FALAI_API_KEY,
});

// const FAL_TRAINING_MODEL_ID = "fal-ai/flux-lora-portrait-trainer";
const FAL_TRAINING_MODEL_ID = "fal-ai/turbo-flux-trainer";
const FAL_LORA_MODEL_ID = "fal-ai/flux-lora";
const FAL_LORA_TRIGGER_PHRASE = "ohwx";
const FAL_UPSCALE_MODEL_ID = "fal-ai/recraft/upscale/crisp";

const fetchImageData = async (
	url: string,
): Promise<{
	name: string;
	data: Buffer;
}> => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status} for URL: ${url}`);
	}

	const urlParts = new URL(url).pathname.split("/");
	const imageId = urlParts[urlParts.length - 2];

	const contentType = response.headers.get("content-type") || "";
	let ext = ".jpg";
	if (contentType.includes("image/png")) ext = ".png";
	else if (contentType.includes("image/jpeg")) ext = ".jpeg";
	else if (contentType.includes("image/gif")) ext = ".gif";

	const filename = `${imageId}_${Date.now()}${ext}`;
	const imageBuffer = Buffer.from(await response.arrayBuffer());
	return { name: filename, data: imageBuffer };
};

const createZipBuffer = async (
	files: { name: string; data: Buffer }[],
	folderNameInsideZip = "",
): Promise<Buffer> => {
	return new Promise((resolve, reject) => {
		const archive = archiver("zip", { zlib: { level: 9 } });
		const passthrough = new PassThrough();
		const chunks: Buffer[] = [];
		passthrough.on("data", (chunk) => chunks.push(chunk));
		passthrough.on("end", () => resolve(Buffer.concat(chunks)));
		archive.on("error", (err: Error) => reject(err));
		passthrough.on("error", (err: Error) => reject(err));
		archive.pipe(passthrough);
		for (const file of files) {
			const entryName = folderNameInsideZip
				? `${folderNameInsideZip}/${file.name}`
				: file.name;
			archive.append(file.data, { name: entryName });
		}
		archive.finalize();
	});
};

const uploadImagesToFalStorage = async (
	imageUrls: string[],
	folderNameInsideZip = "images",
): Promise<string> => {
	const fetchedImageFiles: { name: string; data: Buffer }[] = [];
	for (const url of imageUrls) {
		const imageData = await fetchImageData(url);
		fetchedImageFiles.push(imageData);
	}

	if (fetchedImageFiles.length === 0) {
		throw new Error("No images successfully fetched to upload.");
	}

	const zipBuffer = await createZipBuffer(
		fetchedImageFiles,
		folderNameInsideZip,
	);

	const zipFilename = `images_${Date.now()}.zip`;
	const zipFile = new File([zipBuffer], zipFilename, {
		type: "application/zip",
	});

	const falStorageUrl = await fal.storage.upload(zipFile);
	return falStorageUrl;
};

export const generateHeadshot = schemaTask({
	id: "generate-headshot",
	schema: z.object({
		headshotRequestId: z.string(),
	}),
	retry: {
		maxAttempts: 0,
	},
	maxDuration: 1 * 60 * 60,
	run: async (payload) => {
		const trainingResult = await processHeadshotTraining.triggerAndWait({
			headshotRequestId: payload.headshotRequestId,
		});

		if (!trainingResult.ok) {
			console.error(
				`Error processing headshot training for headshot request ${payload.headshotRequestId}`,
				trainingResult,
			);
			throw new Error("Error processing headshot training");
		}

		const generateHeadshotVariationsResult =
			await generateHeadshotVariations.triggerAndWait({
				headshotRequestId: payload.headshotRequestId,
			});

		if (!generateHeadshotVariationsResult.ok) {
			console.error(
				`Error generating headshot variations for headshot request ${payload.headshotRequestId}`,
				generateHeadshotVariationsResult,
			);
			throw new Error("Error generating headshot variations");
		}
	},
});

export const processHeadshotTraining = schemaTask({
	id: "process-headshot-training",
	schema: z.object({
		headshotRequestId: z.string(),
	}),
	retry: {
		maxAttempts: 0,
	},
	maxDuration: 1 * 60 * 60,
	run: async (payload) => {
		console.log(
			`Processing headshot training for headshot request ${payload.headshotRequestId}`,
		);
		try {
			const request = await db.query.headshotRequest.findFirst({
				where: (headshotRequest, { eq }) =>
					eq(headshotRequest.id, payload.headshotRequestId),
				with: {
					uploads: {
						columns: {
							imageUrl: true,
						},
					},
				},
			});

			if (!request) {
				console.error(
					`Headshot request not found for headshot request ${payload.headshotRequestId}`,
				);
				throw new Error("Headshot request not found");
			}

			if (request.status !== "pending") {
				console.error("Headshot request is not pending", payload);
				throw new Error("Headshot request is not pending");
			}

			console.log("Uploading images to Fal storage", request.uploads);
			const imagesDataUrl = await uploadImagesToFalStorage(
				request.uploads.map((upload) => upload.imageUrl),
			);

			console.log(`Updating headshot request ${request.id} to training`);
			await db
				.update(headshotRequest)
				.set({
					status: "training",
					// trainingRequestId: request_id,
					trainingModelId: FAL_TRAINING_MODEL_ID,
					trainingStartedAt: new Date(),
					triggerPhrase: FAL_LORA_TRIGGER_PHRASE,
				})
				.where(eq(headshotRequest.id, payload.headshotRequestId));

			console.log(
				`Subscribing to Fal training model for headshot request ${request.id}`,
			);
			const result = await fal.subscribe(FAL_TRAINING_MODEL_ID, {
				input: {
					steps: request.trainingSteps,
					images_data_url: imagesDataUrl,
					trigger_phrase: FAL_LORA_TRIGGER_PHRASE,
				},
				onEnqueue: async (requestId) => {
					console.log(
						`Updating headshot request ${request.id} training request id to ${requestId}`,
					);
					await db
						.update(headshotRequest)
						.set({
							trainingRequestId: requestId,
						})
						.where(eq(headshotRequest.id, payload.headshotRequestId));
				},
			});
			console.log(`Training completed for headshot request ${request.id}`);

			console.log(
				`Updating headshot request ${request.id} to training-completed`,
			);
			await db
				.update(headshotRequest)
				.set({
					loraId: result.data.diffusers_lora_file.url,
					trainingCompletedAt: new Date(),
					status: "training-completed",
				})
				.where(eq(headshotRequest.id, payload.headshotRequestId));
			console.log(
				`Updated headshot request ${request.id} to training-completed`,
			);

			return result;
		} catch (error) {
			console.error(
				`Error processing headshot training for headshot request ${payload.headshotRequestId}`,
				error,
			);
			await db
				.update(headshotRequest)
				.set({
					status: "failed",
				})
				.where(eq(headshotRequest.id, payload.headshotRequestId))
				.catch(() => {});

			throw error;
		}
	},
});

const generatePrompts = async (
	request: typeof headshotRequest.$inferSelect,
) => {
	const { object } = await generateObject({
		model: openai("gpt-4o"),
		schema: z.array(
			z.object({
				prompt: z.string(),
				background: z.string(),
				outfit: z.string(),
			}),
		),
		system: `You are a prompt generator for an AI headshot generator that uses custom LoRA models.

Your goal is to create realistic, photorealistic studio portrait prompts. The prompts will be used with a LoRA-trained image generation model, and must include a trigger phrase provided by the user.

📌 Include this LoRA trigger exactly once in every prompt — ideally at the start or end of the description.

Each prompt must include:
- Subject appearance (age, ethnicity, gender, hair type, body type)
- Expression and pose
- Outfit and background (from user lists)
- Style keywords (e.g. "studio lighting", "soft shadows", "professional photo")
- The trigger phrase (from user input)

⚠️ Ensure variation across:
- Expression and pose
- Wording and sentence structure
- Outfit/background combinations

📦 Output format must be valid JSON:
\`\`\`json
{
  "prompts": [
    {
      "prompt": "<full text prompt>",
      "background": "<background>",
      "outfit": "<outfit>"
    }
  ]
}
\`\`\``,
		prompt: JSON.stringify({ request }),
	});

	return object;
};

export const generateHeadshotVariations = schemaTask({
	id: "generate-headshot-variations",
	schema: z.object({
		headshotRequestId: z.string(),
	}),
	retry: {
		maxAttempts: 0,
	},
	maxDuration: 1 * 60 * 60,
	run: async (payload) => {
		try {
			const request = await db.query.headshotRequest.findFirst({
				where: (headshotRequest, { eq }) =>
					eq(headshotRequest.id, payload.headshotRequestId),
			});

			if (!request) {
				console.error(
					`Headshot request not found for headshot request ${payload.headshotRequestId}`,
				);
				throw new Error("Headshot request not found");
			}

			if (request.status !== "training-completed") {
				console.error(
					`Headshot request is not training-completed for headshot request ${payload.headshotRequestId}`,
				);
				throw new Error("Headshot request is not training-completed");
			}

			const loraId = request.loraId;
			if (!loraId) {
				console.error(
					`Lora ID not found for headshot request ${payload.headshotRequestId}`,
				);
				throw new Error("Lora ID not found");
			}

			if (request.headshotCount === 0) {
				console.log(
					`Headshot count is 0 for headshot request ${payload.headshotRequestId}`,
				);
				return;
			}

			await db
				.update(headshotRequest)
				.set({
					status: "generating",
				})
				.where(eq(headshotRequest.id, payload.headshotRequestId));

			console.log(
				`Generating prompts for headshot request ${payload.headshotRequestId}`,
			);
			const prompts = await generatePrompts(request);
			console.log(
				`${prompts.length} prompts generated for headshot request ${payload.headshotRequestId}`,
			);

			const chunks = prompts.reduce(
				(acc, prompt, index) => {
					const chunkIndex = Math.floor(index / 10);
					if (!acc[chunkIndex]) {
						acc[chunkIndex] = [];
					}
					acc[chunkIndex].push(prompt);
					return acc;
				},
				[] as {
					prompt: string;
					metadata?: Record<string, string | number>;
				}[][],
			);

			await Promise.all(
				chunks.map(async (chunk) => {
					for (const prompt of chunk) {
						try {
							console.log(
								`Generating image for prompt ${prompt.prompt} for headshot request ${payload.headshotRequestId}`,
							);
							const falImage = await fal.subscribe(FAL_LORA_MODEL_ID, {
								input: {
									prompt: prompt.prompt,
									image_size: "portrait_4_3",
									loras: [
										{
											path: loraId,
										},
									],
									output_format: "png",
									seed: Math.floor(Math.random() * 1000000),
								},
							});

							const image = await fetch(falImage.data.images[0].url);
							const imageBuffer = Buffer.from(await image.arrayBuffer());
							const imageId = await uploadImage(imageBuffer, {
								...prompt.metadata,
								headshotRequestId: payload.headshotRequestId,
								userId: request.userId,
							});

							let upscaledImageId: string | null = null;
							if (request.upscaleImages) {
								try {
									const upscaledFalImage = await fal.subscribe(
										FAL_UPSCALE_MODEL_ID,
										{
											input: {
												image_url: falImage.data.images[0].url,
											},
										},
									);

									const upscaledImage = await fetch(
										upscaledFalImage.data.image.url,
									);
									const upscaledImageBuffer = Buffer.from(
										await upscaledImage.arrayBuffer(),
									);
									upscaledImageId = await uploadImage(
										upscaledImageBuffer,
										{
											...prompt.metadata,
											headshotRequestId: payload.headshotRequestId,
											userId: request.userId,
											upscaled: true,
										},
										upscaledFalImage.data.content_type,
									);
								} catch (error) {
									console.error(
										`Error upscaling image for prompt ${prompt.prompt} for headshot request ${payload.headshotRequestId}`,
										error,
									);
								}
							}

							const headshotImageId = crypto.randomUUID();
							await db.insert(headshotImage).values({
								id: headshotImageId,
								headshotRequestId: payload.headshotRequestId,

								imageUrl: `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${imageId}/public`,
								...(upscaledImageId
									? {
											upscaledImageUrl: `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${upscaledImageId}/public`,
										}
									: {}),
								prompt: prompt.prompt,

								modelVersion: FAL_LORA_MODEL_ID,
							});

							console.log(
								`Image uploaded for prompt ${prompt.prompt} for headshot request ${payload.headshotRequestId}`,
							);
						} catch (error) {
							console.error(
								`Error generating image for prompt ${prompt.prompt} for headshot request ${payload.headshotRequestId}`,
								error,
							);
						}
					}
				}),
			);

			await db
				.update(headshotRequest)
				.set({
					status: "completed",
					completedAt: new Date(),
				})
				.where(eq(headshotRequest.id, payload.headshotRequestId));

			try {
				console.log(
					`Sending headshot completion email to user ${request.userId} for headshot request ${payload.headshotRequestId}`,
				);
				const user = await db.query.user.findFirst({
					where: (user, { eq }) => eq(user.id, request.userId),
					columns: {
						email: true,
						name: true,
					},
				});

				if (user?.email) {
					const headshotImages = await db.query.headshotImage.findMany({
						where: (headshotImage, { eq }) =>
							eq(headshotImage.headshotRequestId, payload.headshotRequestId),
					});

					await sendHeadshotCompletedEmail({
						to: user.email,
						name: user.name || undefined,
						headshots: headshotImages.length,
						headshotGalleryLink: `${env.FRONTEND_URL}/app/headshots/${payload.headshotRequestId}`,
					});

					console.log(`Headshot completion email sent to ${user.email}`);
				}
			} catch (emailError) {
				console.error("Error sending headshot completion email:", emailError);
			}
		} catch (error) {
			console.error(
				`Error generating headshot variations for headshot request ${payload.headshotRequestId}`,
				error,
			);

			await db
				.update(headshotRequest)
				.set({
					status: "failed",
				})
				.where(eq(headshotRequest.id, payload.headshotRequestId));

			throw error;
		}
	},
});
