import { Buffer } from "node:buffer";
import { PassThrough } from "node:stream";
import { fal } from "@fal-ai/client";
import archiver from "archiver";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { headshotRequest } from "../db/schema";
import { env } from "../env";

fal.config({
	credentials: env.FALAI_API_KEY,
});

const FAL_TRAINING_MODEL_ID = "fal-ai/flux-lora-portrait-trainer";

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

export const submitPortraitTraining = async (headshotRequestId: string) => {
	try {
		const request = await db.query.headshotRequest.findFirst({
			where: (headshotRequest, { eq }) =>
				eq(headshotRequest.id, headshotRequestId),
			with: {
				uploads: {
					columns: {
						imageUrl: true,
					},
				},
			},
		});

		if (!request) {
			throw new Error("Headshot request not found");
		}

		if (request.status !== "pending") {
			throw new Error("Headshot request is not pending");
		}

		const imagesDataUrl = await uploadImagesToFalStorage(
			request.uploads.map((upload) => upload.imageUrl),
		);

		const { request_id } = await fal.queue.submit(FAL_TRAINING_MODEL_ID, {
			input: {
				steps: request.trainingSteps,
				images_data_url: imagesDataUrl,
			},
			webhookUrl: `${env.FALAI_WEBHOOK_URL}`,
		});

		await db
			.update(headshotRequest)
			.set({
				status: "training",
				trainingRequestId: request_id,
				trainingModelId: FAL_TRAINING_MODEL_ID,
				trainingStartedAt: new Date(),
			})
			.where(eq(headshotRequest.id, headshotRequestId));
	} catch (error) {
		await db
			.update(headshotRequest)
			.set({
				status: "failed",
			})
			.where(eq(headshotRequest.id, headshotRequestId))
			.catch(() => {});
	}
};
