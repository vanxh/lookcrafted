import { eq } from "drizzle-orm";

import {
	createHeadshotRequestSchema,
	editHeadshotRequestSchema,
} from "@lookcrafted/constants";

import { headshotRequest } from "../db/schema";
import { protectedProcedure } from "../lib/orpc";

export const headshotRouter = {
	createHeadshotRequest: protectedProcedure
		.input(createHeadshotRequestSchema)
		.handler(async ({ context, input }) => {
			const { session, db } = context;

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

			await db
				.update(headshotRequest)
				.set(input)
				.where(eq(headshotRequest.id, input.id));

			return { success: true };
		}),
};
