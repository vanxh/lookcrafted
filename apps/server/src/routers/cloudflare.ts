import { z } from "zod";

import { deleteImage, getSignedUrl } from "../lib/cloudflare";
import { protectedProcedure, ratelimitWithKey } from "../lib/orpc";

export const cloudflareRouter = {
	getSignedUploadUrl: protectedProcedure
		.route({ method: "POST", path: "/cloudflare/images/upload" })
		.input(z.object({}).optional())
		.output(
			z.object({
				signedUrl: z.string(),
				imageId: z.string(),
			}),
		)
		.handler(async ({ context, input }) => {
			const { session } = context;

			await ratelimitWithKey(
				session.user.id,
				50,
				"10 m",
				"ratelimit:cloudflare:getSignedUploadUrl",
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
		.route({ method: "DELETE", path: "/cloudflare/images/{imageId}" })
		.input(
			z.object({
				imageId: z.string(),
			}),
		)
		.output(z.object({ success: z.boolean() }))
		.handler(async ({ input }) => {
			await deleteImage(input.imageId);

			return {
				success: true,
			};
		}),
};
