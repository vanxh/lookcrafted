import { logger, schedules } from "@trigger.dev/sdk/v3";
import { inArray } from "drizzle-orm";

import { db } from "../db";
import { headshotRequest } from "../db/schema";

export const deleteUnpaidHeadshots = schedules.task({
	id: "delete-unpaid-headshots",
	cron: "0 0 * * *", // every day
	maxDuration: 5 * 60,
	run: async (payload, { ctx }) => {
		const headshots = await db.query.headshotRequest.findMany({
			where: (headshotRequest, { eq, and, lt }) =>
				and(
					eq(headshotRequest.status, "pending"),
					lt(
						headshotRequest.createdAt,
						new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
					),
				),
		});

		logger.log(
			`Deleting ${headshots.length} unpaid headshots older than 7 days`,
		);

		const start = performance.now();
		await db.delete(headshotRequest).where(
			inArray(
				headshotRequest.id,
				headshots.map((h) => h.id),
			),
		);
		const end = performance.now();

		logger.log(
			`Successfully deleted ${headshots.length} unpaid headshots in ${
				end - start
			}ms`,
		);
	},
});
