import { ORPCError } from "@orpc/server";
import { tasks } from "@trigger.dev/sdk/v3";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import {
	createHeadshotRequestSchema,
	editHeadshotRequestSchema,
} from "@lookcrafted/constants";

import {
	headshotImage,
	headshotRequest,
	headshotRequestImage,
} from "../db/schema";
import { env } from "../env";
import { createCreemCheckout } from "../lib/creem";
import { protectedProcedure, ratelimitWithKey } from "../lib/orpc";
import type { upscaleHeadshot } from "../trigger/upscale-headshot";

const headshotRequestColumns = {
	id: true,
	userId: true,

	createdAt: true,
	updatedAt: true,

	headshotCount: true,

	gender: true,
	ageGroup: true,
	hairColor: true,
	hairLength: true,
	hairTexture: true,
	ethnicity: true,
	bodyType: true,

	backgrounds: true,
	outfits: true,

	status: true,
	completedAt: true,

	regenerationCount: true,
} as const;

const headshotUploadColumns = {
	id: true,
	createdAt: true,
	imageUrl: true,
} as const;

const headshotImageColumns = {
	id: true,
	createdAt: true,
	imageUrl: true,
	upscaledImageUrl: true,
	isFavorite: true,
	regenerationIndex: true,
} as const;

export const headshotRouter = {
	getAll: protectedProcedure
		.route({ method: "GET", path: "/headshots", tags: ["headshots"] })
		.input(
			z.object({
				includeUploads: z.boolean().optional().default(false),
				includeImages: z.boolean().optional().default(false),
			}),
		)
		// TODO: Add output schema
		.handler(async ({ context, input }) => {
			const { session, db } = context;

			const result = await db.query.headshotRequest.findMany({
				where: eq(headshotRequest.userId, session.user.id),
				columns: headshotRequestColumns,
				with: {
					uploads: input.includeUploads
						? {
								columns: headshotUploadColumns,
							}
						: undefined,
					images: input.includeImages
						? {
								columns: headshotImageColumns,
							}
						: undefined,
				},
				orderBy: desc(headshotRequest.createdAt),
			});

			return result;
		}),

	getOne: protectedProcedure
		.route({ method: "GET", path: "/headshots/{id}", tags: ["headshots"] })
		.input(
			z.object({
				id: z.string(),
				includeUploads: z.boolean().optional().default(false),
				includeImages: z.boolean().optional().default(false),
			}),
		)
		// TODO: Add output schema
		.handler(async ({ context, input }) => {
			const { db, session } = context;

			const result = await db.query.headshotRequest.findFirst({
				where: eq(headshotRequest.id, input.id),
				columns: headshotRequestColumns,
				with: {
					uploads: input.includeUploads
						? {
								columns: headshotUploadColumns,
							}
						: undefined,
					images: input.includeImages
						? {
								columns: headshotImageColumns,
							}
						: undefined,
				},
				orderBy: desc(headshotRequest.createdAt),
			});

			if (!result || result.userId !== session.user.id) {
				throw new ORPCError("NOT_FOUND", {
					message: "Headshot request not found",
				});
			}

			return result;
		}),

	create: protectedProcedure
		.route({ method: "POST", path: "/headshots/create", tags: ["headshots"] })
		.input(createHeadshotRequestSchema)
		.output(z.object({ id: z.string() }))
		.handler(async ({ context, input }) => {
			const { session, db } = context;

			await ratelimitWithKey(
				session.user.id,
				5,
				"10 m",
				"ratelimit:headshot:createHeadshotRequest",
			);

			const id = crypto.randomUUID();

			await db.insert(headshotRequest).values({
				id,
				userId: session.user.id,
				headshotCount: 0,
				gender: input.gender,
				ageGroup: input.ageGroup,
				hairColor: input.hairColor,
				hairLength: input.hairLength,
				hairTexture: input.hairTexture,
				ethnicity: input.ethnicity,
				bodyType: input.bodyType,
				backgrounds: input.backgrounds,
				outfits: input.outfits,
			});

			for (const imageId of input.uploadedImageIds) {
				await db.insert(headshotRequestImage).values({
					id: crypto.randomUUID(),
					headshotRequestId: id,
					imageUrl: `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${imageId}/public`,
				});
			}

			return { id };
		}),

	edit: protectedProcedure
		.route({ method: "PATCH", path: "/headshots/{id}", tags: ["headshots"] })
		.input(editHeadshotRequestSchema)
		.output(z.object({ success: z.boolean() }))
		.handler(async ({ context, input }) => {
			const { session, db } = context;

			await ratelimitWithKey(
				session.user.id,
				20,
				"10 m",
				"ratelimit:headshot:editHeadshotRequest",
			);

			const result = await db.query.headshotRequest.findFirst({
				where: and(
					eq(headshotRequest.id, input.id),
					eq(headshotRequest.userId, session.user.id),
				),
				columns: {
					id: true,
					status: true,
				},
			});

			if (!result) {
				throw new ORPCError("NOT_FOUND", {
					message: "Headshot request not found",
				});
			}

			if (!["pending", "unpaid"].includes(result.status)) {
				throw new ORPCError("BAD_REQUEST", {
					message: "Headshot request is not pending",
				});
			}

			await db
				.update(headshotRequest)
				.set({
					headshotCount: 0,
					gender: input.gender,
					ageGroup: input.ageGroup,
					hairColor: input.hairColor,
					hairLength: input.hairLength,
					hairTexture: input.hairTexture,
					ethnicity: input.ethnicity,
					bodyType: input.bodyType,
					backgrounds: input.backgrounds,
					outfits: input.outfits,
				})
				.where(eq(headshotRequest.id, result.id));

			if (input.uploadedImageIds?.length) {
				await db
					.delete(headshotRequestImage)
					.where(eq(headshotRequestImage.headshotRequestId, result.id));

				for (const imageId of input.uploadedImageIds) {
					await db.insert(headshotRequestImage).values({
						id: crypto.randomUUID(),
						headshotRequestId: result.id,
						imageUrl: `https://imagedelivery.net/${env.CLOUDFLARE_ACCOUNT_HASH}/${imageId}/public`,
					});
				}
			}

			return { success: true };
		}),

	checkout: protectedProcedure
		.route({
			method: "GET",
			path: "/headshots/{id}/checkout",
			tags: ["headshots"],
			successStatus: 307,
			outputStructure: "detailed",
		})
		.input(
			z.object({
				id: z.string(),
				plan: z.enum(["starter", "basic", "premium"]),
				referral: z.string().optional(),
			}),
		)
		.output(z.object({ headers: z.record(z.string(), z.string()) }))
		.handler(async ({ context, input }) => {
			try {
				const { session, db } = context;

				const result = await db.query.headshotRequest.findFirst({
					where: and(
						eq(headshotRequest.id, input.id),
						eq(headshotRequest.userId, session.user.id),
					),
					columns: {
						id: true,
					},
				});

				if (!result) {
					throw new ORPCError("NOT_FOUND", {
						message: "Headshot request not found",
					});
				}

				const checkout = await createCreemCheckout({
					plan: input.plan,
					headshotRequestId: result.id,
					email: session.user.email,
					userId: session.user.id,
					referral: input.referral,
				});

				if (!checkout.checkoutUrl) {
					throw new ORPCError("INTERNAL_SERVER_ERROR", {
						message: "Failed to create checkout",
					});
				}

				return { headers: { location: checkout.checkoutUrl } };
			} catch (error) {
				throw new ORPCError("INTERNAL_SERVER_ERROR", {
					message: "Failed to create checkout",
					data: error,
				});
			}
		}),

	favoriteImage: protectedProcedure
		.route({
			method: "POST",
			path: "/headshots/images/{imageId}/favorite",
			tags: ["headshots"],
		})
		.input(
			z.object({
				imageId: z.string(),
				isFavorite: z.boolean(),
			}),
		)
		.output(z.object({ success: z.boolean() }))
		.handler(async ({ context, input }) => {
			const { session, db } = context;

			const result = await db.query.headshotImage.findFirst({
				where: eq(headshotImage.id, input.imageId),
				columns: {
					id: true,
				},
				with: {
					headshotRequest: {
						columns: {
							userId: true,
						},
					},
				},
			});

			if (!result || result.headshotRequest.userId !== session.user.id) {
				throw new ORPCError("NOT_FOUND", {
					message: "Image not found",
				});
			}

			await db
				.update(headshotImage)
				.set({
					isFavorite: input.isFavorite,
				})
				.where(eq(headshotImage.id, result.id));

			return { success: true };
		}),

	upscaleImage: protectedProcedure
		.route({
			method: "POST",
			path: "/headshots/images/{imageId}/upscale",
			tags: ["headshots"],
		})
		.input(
			z.object({
				imageId: z.string(),
			}),
		)
		.output(z.object({ upscaledImageUrl: z.string() }))
		.handler(async ({ context, input }) => {
			const { session, db } = context;

			const result = await db.query.headshotImage.findFirst({
				where: eq(headshotImage.id, input.imageId),
				columns: {
					id: true,
				},
				with: {
					headshotRequest: {
						columns: {
							userId: true,
						},
					},
				},
			});

			if (!result || result.headshotRequest.userId !== session.user.id) {
				throw new ORPCError("NOT_FOUND", {
					message: "Image not found",
				});
			}

			const upscaleResult = await tasks.triggerAndWait<typeof upscaleHeadshot>(
				"upscale-headshot",
				{
					headshotImageId: input.imageId,
				},
			);

			if (!upscaleResult.ok) {
				throw upscaleResult.error;
			}

			return upscaleResult.output;
		}),
};
