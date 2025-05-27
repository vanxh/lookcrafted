import { schemaTask, wait } from "@trigger.dev/sdk/v3";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../db";
import { headshotRequest } from "../db/schema";
import { sendHeadshotAbandonmentEmail } from "../lib/email";

export const headshotAbandonmentWorkflow = schemaTask({
	id: "headshot-abandonment-workflow",
	schema: z.object({
		headshotRequestId: z.string(),
		userId: z.string(),
	}),
	retry: {
		maxAttempts: 1,
	},
	run: async (payload) => {
		const { headshotRequestId, userId } = payload;

		await wait.for({ hours: 6 });

		let request = await db.query.headshotRequest.findFirst({
			where: eq(headshotRequest.id, headshotRequestId),
			columns: {
				id: true,
				status: true,
			},
		});

		if (!request) {
			console.log(
				`Headshot request ${headshotRequestId} not found, stopping workflow`,
			);
			return;
		}

		if (request.status === "unpaid") {
			const user = await db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, userId),
				columns: {
					email: true,
					name: true,
				},
			});

			if (user?.email) {
				await sendHeadshotAbandonmentEmail({
					to: user.email,
					name: user.name || undefined,
					discount: 15,
					headshotRequestId,
				});
				console.log(
					`Sent 15% off email to ${user.email} for headshot ${headshotRequestId}`,
				);
			}
		} else {
			console.log(
				`Headshot request ${headshotRequestId} is no longer unpaid (${request.status}), stopping workflow`,
			);
			return;
		}

		await wait.for({ hours: 12 });

		request = await db.query.headshotRequest.findFirst({
			where: eq(headshotRequest.id, headshotRequestId),
			columns: {
				id: true,
				status: true,
			},
		});

		if (!request) {
			console.log(
				`Headshot request ${headshotRequestId} not found, stopping workflow`,
			);
			return;
		}

		if (request.status === "unpaid") {
			const user = await db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, userId),
				columns: {
					email: true,
					name: true,
				},
			});

			if (user?.email) {
				await sendHeadshotAbandonmentEmail({
					to: user.email,
					name: user.name || undefined,
					discount: 30,
					headshotRequestId,
				});
				console.log(
					`Sent 30% off email to ${user.email} for headshot ${headshotRequestId}`,
				);
			}
		} else {
			console.log(
				`Headshot request ${headshotRequestId} is no longer unpaid (${request.status}), stopping workflow`,
			);
			return;
		}

		await wait.for({ hours: 24 });

		for (let day = 1; day <= 3; day++) {
			request = await db.query.headshotRequest.findFirst({
				where: eq(headshotRequest.id, headshotRequestId),
				columns: {
					id: true,
					status: true,
				},
			});

			if (!request) {
				console.log(
					`Headshot request ${headshotRequestId} not found, stopping workflow`,
				);
				return;
			}

			if (request.status === "unpaid") {
				const user = await db.query.user.findFirst({
					where: (user, { eq }) => eq(user.id, userId),
					columns: {
						email: true,
						name: true,
					},
				});

				if (user?.email) {
					await sendHeadshotAbandonmentEmail({
						to: user.email,
						name: user.name || undefined,
						discount: 50,
						headshotRequestId,
					});
					console.log(
						`Sent 50% off email (day ${day}) to ${user.email} for headshot ${headshotRequestId}`,
					);
				}
			} else {
				console.log(
					`Headshot request ${headshotRequestId} is no longer unpaid (${request.status}), stopping workflow`,
				);
				return;
			}

			if (day < 3) {
				await wait.for({ hours: 24 });
			}
		}

		console.log(
			`Abandonment workflow completed for headshot ${headshotRequestId}`,
		);
	},
});
