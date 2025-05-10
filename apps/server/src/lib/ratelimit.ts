import { type Duration, Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/cloudflare";

export const ratelimit = (tokens: number, window: Duration) =>
	new Ratelimit({
		redis: Redis.fromEnv(),
		limiter: Ratelimit.slidingWindow(tokens, window),
		analytics: true,
	});
