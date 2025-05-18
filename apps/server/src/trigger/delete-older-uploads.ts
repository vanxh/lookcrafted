import { schedules } from "@trigger.dev/sdk/v3";
import { ne } from "drizzle-orm";

import { db } from "../db";
import { deleteImage } from "../lib/cloudflare";

export const deleteOlderUploads = schedules.task({
	id: "delete-older-uploads",
	cron: "0 0 * * *", // every day
	maxDuration: 5 * 60,
	run: async (payload, { ctx }) => {
		const headshots = await db.query.headshotRequest.findMany({
			where: (headshotRequest, { eq, and, lt, or }) =>
				and(
					or(
						eq(headshotRequest.status, "training-completed"),
						eq(headshotRequest.status, "generating"),
						eq(headshotRequest.status, "completed"),
						eq(headshotRequest.status, "failed"),
					),
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

		const uploads = headshots.flatMap((h) => h.uploads.map((u) => u.imageUrl));

		console.log(`Deleting ${uploads.length} uploads older than 7 days`);

		const start = performance.now();

		for (const upload of uploads) {
			const imageId = upload.split("/")[4];
			await deleteImage(imageId).catch((e) => {
				console.error(`Error deleting image ${imageId}: ${e}`);
			});
		}

		const end = performance.now();

		console.log(
			`Successfully deleted ${uploads.length} uploads in ${end - start}ms`,
		);
	},
});
