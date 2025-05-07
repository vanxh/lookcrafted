import { publicProcedure } from "../lib/orpc";
import { cloudflareRouter } from "./cloudflare";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),

	cloudflare: cloudflareRouter,
};

export type AppRouter = typeof appRouter;
