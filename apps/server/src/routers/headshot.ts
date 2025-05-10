import { eq } from "drizzle-orm";

import {
	createHeadshotRequestSchema,
	editHeadshotRequestSchema,
} from "@lookcrafted/constants";

import { headshotRequest } from "../db/schema";
import { protectedProcedure, ratelimitWithKey } from "../lib/orpc";

export const headshotRouter = {
	createHeadshotRequest: protectedProcedure
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

	editHeadshotRequest: protectedProcedure
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
