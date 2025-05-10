import { ORPCError } from "@orpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import {
	createHeadshotRequestSchema,
	editHeadshotRequestSchema,
} from "@lookcrafted/constants";

import { headshotRequest } from "../db/schema";
import { protectedProcedure, ratelimitWithKey } from "../lib/orpc";

export const headshotRouter = {
	getAll: protectedProcedure
		.input(
			z.object({
				includeUploads: z.boolean().optional().default(false),
				includeImages: z.boolean().optional().default(false),
			}),
		)
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
		.input(
			z.object({
				id: z.string(),
				includeUploads: z.boolean().optional().default(false),
				includeImages: z.boolean().optional().default(false),
			}),
		)
		.handler(async ({ context, input }) => {
			const { db } = context;

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

			if (!result) {
				throw new ORPCError("NOT_FOUND", {
					message: "Headshot request not found",
				});
			}

			return result;
		}),

	create: protectedProcedure
		.input(createHeadshotRequestSchema)
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
				...input,
			});

			return { id };
		}),

	edit: protectedProcedure
		.input(editHeadshotRequestSchema)
		.handler(async ({ context, input }) => {
			const { session, db } = context;

			await ratelimitWithKey(
				session.user.id,
				20,
				"10 m",
				"ratelimit:headshot:editHeadshotRequest",
			);

			await db
				.update(headshotRequest)
				.set(input)
				.where(eq(headshotRequest.id, input.id));

			return { success: true };
		}),
};
