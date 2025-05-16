import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]),
		DATABASE_URL: z.string().url(),
		CORS_ORIGIN: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		RESEND_API_KEY: z.string(),
		RESEND_FROM_EMAIL: z.string().email().optional(),
		FRONTEND_URL: z.string().url(),
		CLOUDFLARE_ACCOUNT_ID: z.string(),
		CLOUDFLARE_ACCOUNT_HASH: z.string(),
		CLOUDFLARE_API_TOKEN: z.string(),
		UPSTASH_REDIS_REST_URL: z.string().url(),
		UPSTASH_REDIS_REST_TOKEN: z.string(),
		POLAR_ACCESS_TOKEN: z.string(),
		POLAR_SERVER: z.enum(["production", "sandbox"]),
		POLAR_WEBHOOK_SECRET: z.string(),
		POLAR_STARTER_PRODUCT_ID: z.string(),
		POLAR_BASIC_PRODUCT_ID: z.string(),
		POLAR_PREMIUM_PRODUCT_ID: z.string(),
		FALAI_WEBHOOK_URL: z.string().url(),
		FALAI_API_KEY: z.string(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation: true,
});
