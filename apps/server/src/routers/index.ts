import { publicProcedure } from "../lib/orpc";
import { cloudflareRouter } from "./cloudflare";
import { headshotRouter } from "./headshot";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),

	cloudflare: cloudflareRouter,
	headshot: headshotRouter,
};

export type AppRouter = typeof appRouter;
