import { z } from "zod";

import { publicProcedure } from "../lib/orpc";
import { cloudflareRouter } from "./cloudflare";
import { headshotRouter } from "./headshot";

export const appRouter = {
	healthCheck: publicProcedure
		.route({ method: "GET", path: "/health" })
		.output(z.string())
		.handler(() => {
			return "OK";
		}),

	cloudflare: cloudflareRouter,
	headshot: headshotRouter,
};

export type AppRouter = typeof appRouter;
