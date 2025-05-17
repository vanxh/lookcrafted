import { schemaTask } from "@trigger.dev/sdk/v3";
import { z } from "zod";

import { db } from "../db";
import { sendWelcomeEmail } from "../lib/email";

export const onboarding = schemaTask({
	id: "onboarding",
	maxDuration: 5 * 60,
	schema: z.object({
		userId: z.string(),
	}),
	run: async (payload, { ctx }) => {
		const user = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, payload.userId),
			columns: {
				id: true,
				email: true,
				name: true,
			},
		});

		if (!user) {
			console.error("User not found", { userId: payload.userId });
			throw new Error("User not found");
		}

		console.log(`Starting onboarding for ${user.id}`, {
			userId: user.id,
			email: user.email,
			name: user.name,
		});

		await sendWelcomeEmail({
			to: user.email,
			name: user.name,
		});

		console.log("Welcome email sent", { userId: user.id });

		// TODO
	},
});
