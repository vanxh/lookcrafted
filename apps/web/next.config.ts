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
			{
				source: "/api/auth/:path*",
				destination: "https://api.lookcrafted.com/api/auth/:path*",
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
};

export default nextConfig;
