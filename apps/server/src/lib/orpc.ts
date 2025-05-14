import { os, ORPCError } from "@orpc/server";
import type { Duration } from "@upstash/ratelimit";

import { db } from "../db";
import type { Context } from "./context";
import { ratelimit } from "./ratelimit";

export const ratelimitWithKey = async (
	key: string,
	tokens: number,
	window: Duration,
	prefix = "ratelimit",
) => {
	try {
		const { success } = await ratelimit(tokens, window, prefix).limit(key);

		if (!success) {
			throw new ORPCError("RATE_LIMIT_EXCEEDED", {
				message: "You have exceeded the rate limit. Please try again later.",
			});
		}
	} catch {
		// DO NOTHING
	}
};

export const o = os.$context<Context>();

export const publicProcedure = o.use(async ({ context, next }) => {
	return next({
		context: {
			...context,
			db,
		},
	});
});

const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	await ratelimitWithKey(context.session.user.id, 60, "1 m");

	return next({
		context: {
			...context,
			session: {
				...context.session,
				user: context.session?.user,
			},
		},
	});
});

export const protectedProcedure = publicProcedure.use(requireAuth);
