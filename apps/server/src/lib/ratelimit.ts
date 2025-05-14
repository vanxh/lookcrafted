import { type Duration, Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/cloudflare";

import { env } from "../env";

export const ratelimit = (tokens: number, window: Duration, prefix?: string) =>
	new Ratelimit({
		redis: new Redis({
			url: env.UPSTASH_REDIS_REST_URL,
			token: env.UPSTASH_REDIS_REST_TOKEN,
		}),
		limiter: Ratelimit.slidingWindow(tokens, window),
		analytics: true,
		prefix,
	});
