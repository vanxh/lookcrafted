import { schemaTask, tasks } from "@trigger.dev/sdk/v3";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../db";
import { headshotRequest } from "../db/schema";
import type { generateHeadshot } from "./generate-headshot";

export const headshotPaid = schemaTask({
	id: "headshot-paid",
	schema: z.object({
		headshotRequestId: z.string(),
		plan: z.enum(["starter", "basic", "premium"]),
		userId: z.string(),
	}),
	retry: {
		maxAttempts: 0,
	},
	maxDuration: 10 * 60,
	run: async (payload) => {
		const user = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, payload.userId),
		});

		if (!user) {
			throw new Error("User not found");
		}

		const plan = {
			starter: {
				editingCredits: 0,
				trainingSteps: 1000,
				headshots: 50,
			},
			basic: {
				editingCredits: 10,
				trainingSteps: 1500,
				headshots: 100,
			},
			premium: {
				editingCredits: 20,
				trainingSteps: 2000,
				headshots: 200,
				upscale: true,
			},
		}[payload.plan];

		if (!plan) {
			throw new Error("Plan not found");
		}

		const request = await db.query.headshotRequest.findFirst({
			where: (headshotRequest, { eq }) =>
				eq(headshotRequest.id, payload.headshotRequestId),
			columns: {
				id: true,
			},
		});

		if (!request) {
			throw new Error("Headshot request not found");
		}

		await db
			.update(headshotRequest)
			.set({
				editingCredits: plan.editingCredits,
				headshotCount: plan.headshots,
				trainingSteps: plan.trainingSteps,
				status: "pending",
				upscaleImages: plan.upscale,
			})
			.where(eq(headshotRequest.id, request.id));

		await tasks.trigger<typeof generateHeadshot>("generate-headshot", {
			headshotRequestId: request.id,
		});
	},
});
