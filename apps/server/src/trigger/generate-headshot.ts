import { Buffer } from "node:buffer";
import { PassThrough } from "node:stream";
import { fal } from "@fal-ai/client";
import { schemaTask } from "@trigger.dev/sdk/v3";
import archiver from "archiver";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../db";
import { headshotRequest } from "../db/schema";
import { env } from "../env";

fal.config({
	credentials: env.FALAI_API_KEY,
});

const FAL_TRAINING_MODEL_ID = "fal-ai/flux-lora-portrait-trainer";
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

		// const result = await fal.subscribe("fal-ai/flux-lora", {
		// 	input: {
		// 		loras: [
		// 			{
		// 				path: result.data.diffusers_lora_file.url,
		// 			},
		// 		],
		// 		prompt: "A headshot of a person",
		// 	},
		// 	webhookUrl: `${env.FALAI_WEBHOOK_URL}`,
		// });

		console.log(
			"Training completed for headshot request",
			trainingResult.output,
		);
		// TODO
	},
});

export const processHeadshotTraining = schemaTask({
	id: "process-headshot-training",
	schema: z.object({
		headshotRequestId: z.string(),
	}),
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

			await db
				.update(headshotRequest)
				.set({
					loraId: result.data.diffusers_lora_file.url,
				})
				.where(eq(headshotRequest.id, payload.headshotRequestId));

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
		}
	},
});
