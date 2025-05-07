import { os, ORPCError } from "@orpc/server";

import { db } from "../db";
import type { Context } from "./context";

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
