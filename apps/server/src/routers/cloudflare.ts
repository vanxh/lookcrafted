import { z } from "zod";

import { deleteImage, getSignedUrl } from "../lib/cloudflare";
import { protectedProcedure, ratelimitWithKey } from "../lib/orpc";

export const cloudflareRouter = {
	getSignedUploadUrl: protectedProcedure.handler(async ({ context }) => {
		const { session } = context;

		await ratelimitWithKey(
			`cloudflare:getSignedUploadUrl:${session.user.id}`,
			50,
			"10 m",
		);

		const { signedUrl, imageId } = await getSignedUrl(session.user.id, {
			type: "headshot_request_upload",
		});

		return {
			signedUrl,
			imageId,
		};
	}),

	deleteImage: protectedProcedure
		.input(
			z.object({
				imageId: z.string(),
			}),
		)
		.handler(async ({ input }) => {
			await deleteImage(input.imageId);

			return {
				success: true,
			};
		}),
};
