import type { MetadataRoute } from "next";

import { getAllPostSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
	const blogSlugs = getAllPostSlugs();
	const blogUrls = blogSlugs.map((slug) => ({
		url: `https://lookcrafted.com/blog/${slug}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	return [
		{
			url: "https://lookcrafted.com",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://lookcrafted.com/linkedin-headshots",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://lookcrafted.com/resume-headshots",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: "https://lookcrafted.com/blog",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		...blogUrls,
		{
			url: "https://lookcrafted.com/pricing",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/privacy",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/terms",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/contact",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/app",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/app/settings",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/app/teams",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/app/teams/create",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: "https://lookcrafted.com/create-headshot",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
	];
}
