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

// const FAL_TRAINING_MODEL_ID = "fal-ai/flux-lora-portrait-trainer";
const FAL_TRAINING_MODEL_ID = "fal-ai/turbo-flux-trainer";
const FAL_LORA_MODEL_ID = "fal-ai/flux-lora";
const FAL_LORA_TRIGGER_PHRASE = "ohwx";
const FAL_UPSCALE_MODEL_ID = "fal-ai/recraft/upscale/crisp";

export const upscaleHeadshot = schemaTask({
	id: "upscale-headshot",
	schema: z.object({
		headshotImageId: z.string(),
	}),
	retry: {
		maxAttempts: 2,
	},
	maxDuration: 60,
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

		if (!image) {
			throw new Error("Headshot image not found");
		}

		if (image.upscaledImageUrl) {
			return { upscaledImageUrl: image.upscaledImageUrl };
		}

		const upscaledFalImage = await fal.subscribe(FAL_UPSCALE_MODEL_ID, {
			input: {
				image: image.imageUrl,
			},
		});

		const upscaledImage = await fetch(upscaledFalImage.data.images[0].url);
		const upscaledImageBuffer = Buffer.from(await upscaledImage.arrayBuffer());
		const upscaledImageId = await uploadImage(upscaledImageBuffer, {
			headshotRequestId: image.headshotRequest.id,
			userId: image.headshotRequest.userId,
		});
		const upscaledImageUrl = `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${upscaledImageId}/public`;

		await db
			.update(headshotImage)
			.set({
				upscaledImageUrl,
			})
			.where(eq(headshotImage.id, image.id));

		await db
			.update(headshotRequest)
			.set({
				editingCredits: sql`${headshotRequest.editingCredits} - 1`,
			})
			.where(eq(headshotRequest.id, image.headshotRequest.id));

		return { upscaledImageUrl };
	},
});
