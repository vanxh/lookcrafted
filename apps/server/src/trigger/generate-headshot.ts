import { Buffer } from "node:buffer";
import { PassThrough } from "node:stream";
import { fal } from "@fal-ai/client";
import { schemaTask } from "@trigger.dev/sdk/v3";
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
	maxDuration: 2 * 60 * 60,
	run: async (payload) => {
		// const trainingResult = await processHeadshotTraining.triggerAndWait({
		// 	headshotRequestId: payload.headshotRequestId,
		// });

		// if (!trainingResult.ok) {
		// 	console.error(
		// 		`Error processing headshot training for headshot request ${payload.headshotRequestId}`,
		// 		trainingResult,
		// 	);
		// 	throw new Error("Error processing headshot training");
		// }

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
				webhookUrl: `${env.FALAI_WEBHOOK_URL}`,
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
	const {
		triggerPhrase,
		gender,
		ageGroup,
		hairColor,
		hairLength,
		hairTexture,
		ethnicity,
		bodyType,
		backgrounds,
		outfits,
		headshotCount,
	} = request;

	const generatedPrompts: {
		prompt: string;
		metadata?: Record<string, string | number>;
	}[] = [];
	const totalImagesToGenerate = headshotCount;

	const styleTerms = [
		"studio lighting, realistic photography, high detail, sharp focus, photorealistic, 8k, professional look, clean skin, good composition",
		"professional lighting, crisp details, natural skin tone, clean background, balanced composition",
		"corporate portrait, modern photography, clear focus, flattering light",
		"high-quality professional photo, sharp image, smooth skin, professional pose",
	];

	const expressionAngleTerms = [
		"looking at camera, neutral expression",
		"looking at camera, slight smile",
		"looking at camera, confident smile",
		"looking slightly away, neutral expression",
		"looking slightly away, slight smile",
		"3/4 view, looking at camera, neutral expression",
		"shoulder up shot",
		"chest up shot",
		"head and shoulders portrait",
		"close up portrait",
	];

	const userDescription = `${ethnicity} ${gender}, ${ageGroup} years old, with ${hairColor.toLowerCase()} ${hairLength.toLowerCase()} ${hairTexture.toLowerCase()} hair, ${bodyType.toLowerCase()} build`;

	const totalCombinations = (backgrounds || []).length * (outfits || []).length;
	const imagesPerCombination =
		totalCombinations > 0
			? Math.max(1, Math.floor(totalImagesToGenerate / totalCombinations))
			: totalImagesToGenerate;

	let promptCount = 0;

	const effectiveBackgrounds = backgrounds || [];
	const effectiveOutfits = outfits || [];

	for (const bg of effectiveBackgrounds) {
		for (const outfit of effectiveOutfits) {
			for (let i = 0; i < imagesPerCombination; i++) {
				if (promptCount >= totalImagesToGenerate) break;

				const currentStyleTerms = styleTerms[promptCount % styleTerms.length];
				const currentExpressionAngle =
					expressionAngleTerms[promptCount % expressionAngleTerms.length];

				let positivePrompt = `professional corporate headshot, studio portrait, ${currentStyleTerms}`;

				positivePrompt += `, ${triggerPhrase}`;

				positivePrompt += `, a ${userDescription}`;

				positivePrompt += `, ${currentExpressionAngle}`;

				positivePrompt += `, wearing a clean ${outfit} outfit`;
				positivePrompt += `, with a clean ${bg} background`;

				generatedPrompts.push({
					prompt: positivePrompt.trim(),
					metadata: {
						background: bg,
						outfit: outfit,
						variationIndex: i,
						combination: `${bg}-${outfit}`,
					},
				});

				promptCount++;
			}
			if (promptCount >= totalImagesToGenerate) break;
		}
		if (promptCount >= totalImagesToGenerate) break;
	}

	while (promptCount < totalImagesToGenerate) {
		for (const bg of effectiveBackgrounds) {
			for (const outfit of effectiveOutfits) {
				if (promptCount >= totalImagesToGenerate) break;

				const currentStyleTerms = styleTerms[promptCount % styleTerms.length];
				const currentExpressionAngle =
					expressionAngleTerms[promptCount % expressionAngleTerms.length];

				let positivePrompt = `professional corporate headshot, studio portrait, ${currentStyleTerms}`;
				positivePrompt += `, ${triggerPhrase}`;
				positivePrompt += `, a ${userDescription}`;
				positivePrompt += `, ${currentExpressionAngle}`;
				positivePrompt += `, wearing a clean ${outfit} outfit`;
				positivePrompt += `, with a clean ${bg} background`;

				generatedPrompts.push({
					prompt: positivePrompt.trim(),
					metadata: {
						background: bg,
						outfit: outfit,
						variationIndex: promptCount,
						combination: `${bg}-${outfit}`,
					},
				});
				promptCount++;
			}
			if (promptCount >= totalImagesToGenerate) break;
		}
	}

	return generatedPrompts.slice(0, totalImagesToGenerate);
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

						const headshotImageId = crypto.randomUUID();
						await db.insert(headshotImage).values({
							id: headshotImageId,
							headshotRequestId: payload.headshotRequestId,

							imageUrl: `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${imageId}/public`,
							prompt: prompt.prompt,

							modelVersion: FAL_LORA_MODEL_ID,
						});

						console.log(
							`Image uploaded for prompt ${prompt.prompt} for headshot request ${payload.headshotRequestId}`,
						);
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
						gender: request.gender,
						ageGroup: request.ageGroup,
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
