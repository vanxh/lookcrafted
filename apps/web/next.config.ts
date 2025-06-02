import withMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
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
			{
				hostname: "images.unsplash.com",
			},
		],
	},
	skipTrailingSlashRedirect: true,
	experimental: {},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			encoding: false,
		};
		return config;
	},
};

const withMDXConfig = withMDX({
	options: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: "wrap",
					properties: {
						className: ["anchor"],
					},
				},
			],
		],
	},
});

export default withMDXConfig(nextConfig);
