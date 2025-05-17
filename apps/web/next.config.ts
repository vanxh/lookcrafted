import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://us.i.posthog.com/:path*",
			},
			{
				source: "/ingest/decide",
				destination: "https://us.i.posthog.com/decide",
			},
		];
	},
	images: {
		remotePatterns: [
			{
				hostname: "imagedelivery.net",
			},
		],
	},
	skipTrailingSlashRedirect: true,
	experimental: {
		nodeMiddleware: true,
	},
};

export default nextConfig;
