import { fal } from "@fal-ai/client";
import { schemaTask } from "@trigger.dev/sdk/v3";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "../db";
import { headshotImage, headshotRequest } from "../db/schema";
import { env } from "../env";
import { uploadImage } from "../lib/cloudflare";

fal.config({
	credentials: env.FALAI_API_KEY,
});

const FAL_UPSCALE_MODEL_ID = "fal-ai/recraft/upscale/crisp";

export const upscaleHeadshot = schemaTask({
	id: "upscale-headshot",
	schema: z.object({
		headshotImageId: z.string(),
	}),
	retry: {
		maxAttempts: 2,
	},
	maxDuration: 3 * 60,
	run: async (payload) => {
		const image = await db.query.headshotImage.findFirst({
			where: (headshotImage, { eq }) =>
				eq(headshotImage.id, payload.headshotImageId),
			columns: {
				id: true,
				imageUrl: true,
				upscaledImageUrl: true,
			},
			with: {
				headshotRequest: {
					columns: {
						id: true,
						userId: true,
						editingCredits: true,
					},
				},
			},
		});
		console.log(`Upscaling headshot image ${image?.id}`);

		if (!image) {
			console.error(`Headshot image not found ${payload.headshotImageId}`);
			throw new Error("Headshot image not found");
		}

		if (image.headshotRequest.editingCredits <= 0) {
			console.error(`No editing credits remaining ${image.headshotRequest.id}`);
			throw new Error("No editing credits remaining");
		}

		if (image.upscaledImageUrl) {
			console.log(`Headshot image already upscaled ${image.id}`);
			return { upscaledImageUrl: image.upscaledImageUrl };
		}

		console.log(
			`Upscaling headshot image ${image.id} with ${FAL_UPSCALE_MODEL_ID}`,
		);
		const upscaledFalImage = await fal.subscribe(FAL_UPSCALE_MODEL_ID, {
			input: {
				image_url: image.imageUrl,
			},
			onEnqueue: async (requestId) => {
				console.log(
					`Updating headshot image ${image.id} with upscaled image ${requestId}`,
				);
			},
		});

		const upscaledImage = await fetch(upscaledFalImage.data.image.url);
		const upscaledImageBuffer = Buffer.from(await upscaledImage.arrayBuffer());
		const upscaledImageId = await uploadImage(
			upscaledImageBuffer,
			{
				headshotRequestId: image.headshotRequest.id,
				userId: image.headshotRequest.userId,
			},
			upscaledFalImage.data.content_type,
		);
		const upscaledImageUrl = `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${upscaledImageId}/public`;

		console.log(
			`Updating headshot image ${image.id} with upscaled image ${upscaledImageUrl}`,
		);
		await db
			.update(headshotImage)
			.set({
				upscaledImageUrl,
			})
			.where(eq(headshotImage.id, image.id));

		console.log(
			`Updating headshot request ${image.headshotRequest.id} with ${headshotRequest.editingCredits} - 1`,
		);
		await db
			.update(headshotRequest)
			.set({
				editingCredits: sql`${headshotRequest.editingCredits} - 1`,
			})
			.where(eq(headshotRequest.id, image.headshotRequest.id));

		return { upscaledImageUrl };
	},
});
