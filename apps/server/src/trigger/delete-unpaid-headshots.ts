import { schedules } from "@trigger.dev/sdk/v3";
import { inArray, ne } from "drizzle-orm";

import { db } from "../db";
import { headshotRequest } from "../db/schema";
import { deleteImage } from "../lib/cloudflare";

export const deleteUnpaidHeadshots = schedules.task({
	id: "delete-unpaid-headshots",
	cron: "0 0 * * *", // every day
	maxDuration: 5 * 60,
	run: async (payload, { ctx }) => {
		const headshots = await db.query.headshotRequest.findMany({
			where: (headshotRequest, { eq, and, lt }) =>
				and(
					eq(headshotRequest.status, "unpaid"),
					lt(
						headshotRequest.createdAt,
						new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
					),
					ne(headshotRequest.doNotDelete, true),
				),
			with: {
				uploads: {
					columns: {
						imageUrl: true,
					},
				},
			},
		});

		console.log(
			`Deleting ${headshots.length} unpaid headshots older than 7 days`,
		);

		const start = performance.now();

		await db.delete(headshotRequest).where(
			inArray(
				headshotRequest.id,
				headshots.map((h) => h.id),
			),
		);

		for (const headshot of headshots) {
			if (headshot.uploads.length > 0) {
				for (const upload of headshot.uploads) {
					const imageId = upload.imageUrl.split("/")[4];
					await deleteImage(imageId).catch((e) => {
						console.error(`Error deleting image ${imageId}: ${e}`);
					});
				}
			}
		}

		const end = performance.now();

		console.log(
			`Successfully deleted ${headshots.length} unpaid headshots in ${
				end - start
			}ms`,
		);
	},
});
