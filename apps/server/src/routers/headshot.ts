import { ORPCError } from "@orpc/server";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import {
	createHeadshotRequestSchema,
	editHeadshotRequestSchema,
} from "@lookcrafted/constants";

import { headshotRequest, headshotRequestImage } from "../db/schema";
import { env } from "../env";
import { protectedProcedure, ratelimitWithKey } from "../lib/orpc";
import { polarClient } from "../lib/polar";

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
				columns: {
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

					regenerationCount: true,
				},
				with: {
					uploads: input.includeUploads
						? {
								columns: {
									id: true,
									createdAt: true,
									imageUrl: true,
								},
							}
						: undefined,
					images: input.includeImages
						? {
								columns: {
									id: true,
									createdAt: true,
									imageUrl: true,
									isFavorite: true,
									regenerationIndex: true,
								},
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
				columns: {
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

					regenerationCount: true,
				},
				with: {
					uploads: input.includeUploads
						? {
								columns: {
									id: true,
									createdAt: true,
									imageUrl: true,
								},
							}
						: undefined,
					images: input.includeImages
						? {
								columns: {
									id: true,
									createdAt: true,
									imageUrl: true,
									isFavorite: true,
									regenerationIndex: true,
								},
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
			}),
		)
		.output(z.object({ headers: z.record(z.string(), z.string()) }))
		.handler(async ({ context, input }) => {
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

			const product = {
				starter: env.POLAR_STARTER_PRODUCT_ID,
				basic: env.POLAR_BASIC_PRODUCT_ID,
				premium: env.POLAR_PREMIUM_PRODUCT_ID,
			}[input.plan];

			if (!product) {
				throw new ORPCError("BAD_REQUEST", {
					message: "Invalid plan",
				});
			}

			const { url } = await polarClient.checkouts.create({
				products: [product],
				successUrl: `${env.FRONTEND_URL}/headshot/${result.id}`,
				customerEmail: session.user.email,
				customerExternalId: session.user.id,
				customerName: session.user.name,
				metadata: {
					headshotRequestId: result.id,
					userId: session.user.id,
					plan: input.plan,
				},
			});

			return { headers: { location: url } };
		}),
};
