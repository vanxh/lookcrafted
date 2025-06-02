import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	author: string;
	publishedAt: string;
	readTime: string;
	category: string;
	image: string;
	featured: boolean;
	content: string;
}

export interface BlogPostMetadata {
	slug: string;
	title: string;
	excerpt: string;
	author: string;
	publishedAt: string;
	readTime: string;
	category: string;
	image: string;
	featured: boolean;
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getAllPostSlugs(): string[] {
	try {
		if (!fs.existsSync(postsDirectory)) {
			return [];
		}
		const fileNames = fs.readdirSync(postsDirectory);
		return fileNames
			.filter((name) => name.endsWith(".mdx"))
			.map((name) => name.replace(/\.mdx$/, ""));
	} catch (error) {
		console.error("Error reading posts directory:", error);
		return [];
	}
}

export function getPostData(slug: string): BlogPost | null {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.mdx`);

		if (!fs.existsSync(fullPath)) {
			return null;
		}

		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data, content } = matter(fileContents);

		return {
			slug,
			title: data.title || "",
			excerpt: data.excerpt || "",
			author: data.author || "",
			publishedAt: data.publishedAt || "",
			readTime: data.readTime || "",
			category: data.category || "",
			image: data.image || "",
			featured: data.featured || false,
			content,
		};
	} catch (error) {
		console.error(`Error reading post ${slug}:`, error);
		return null;
	}
}

export function getAllPosts(): BlogPostMetadata[] {
	const slugs = getAllPostSlugs();
	const posts = slugs
		.map((slug) => {
			const post = getPostData(slug);
			if (!post) return null;

			const { content, ...metadata } = post;
			return metadata;
		})
		.filter((post): post is BlogPostMetadata => post !== null)
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
		);

	return posts;
}

export function getFeaturedPost(): BlogPostMetadata | null {
	const posts = getAllPosts();
	return posts.find((post) => post.featured) || null;
}

export function getPostsByCategory(category: string): BlogPostMetadata[] {
	const posts = getAllPosts();
	if (category === "All") return posts;
	return posts.filter((post) => post.category === category);
}

export function getRelatedPosts(
	currentSlug: string,
	category: string,
	limit = 3,
): BlogPostMetadata[] {
	const posts = getAllPosts();
	return posts
		.filter((post) => post.slug !== currentSlug && post.category === category)
		.slice(0, limit);
}

export function getAllCategories(): string[] {
	const posts = getAllPosts();
	const categories = new Set(posts.map((post) => post.category));
	return ["All", ...Array.from(categories)];
}
