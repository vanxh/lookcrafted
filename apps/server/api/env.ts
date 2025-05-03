import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		CORS_ORIGIN: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		RESEND_API_KEY: z.string(),
		RESEND_FROM_EMAIL: z.string().email().optional(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
