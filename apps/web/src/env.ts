import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url().optional(), // placeholder to fix build on vercel
	},
	client: {
		NEXT_PUBLIC_SERVER_URL: z.string().url(),
		NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
		NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH: z.string(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
		NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH:
			process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH,
	},
});
