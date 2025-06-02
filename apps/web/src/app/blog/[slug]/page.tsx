import {
	ArrowLeft,
	ArrowRight,
	BookOpen,
	CalendarDays,
	Clock,
} from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { ShareButton } from "@/components/blog/share-button";
import { LandingPageFooter } from "@/components/landing/footer";
import { LandingPageHeader } from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { getAllPostSlugs, getPostData, getRelatedPosts } from "@/lib/blog";

interface BlogPostPageProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata> {
	const post = getPostData(params.slug);

	if (!post) {
		return {
			title: "Post Not Found - LookCrafted Blog",
		};
	}

	return {
		title: `${post.title} - LookCrafted Blog`,
		description: post.excerpt,
		keywords: [
			"AI headshots",
			"professional photography",
			post.category.toLowerCase(),
			"LookCrafted",
			"headshot tips",
		],
		openGraph: {
			title: post.title,
			description: post.excerpt,
			url: `https://lookcrafted.com/blog/${post.slug}`,
			siteName: "LookCrafted",
			type: "article",
			images: [
				{
					url: post.image,
					width: 800,
					height: 400,
					alt: post.title,
				},
			],
			publishedTime: post.publishedAt,
			authors: [post.author],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: [post.image],
		},
	};
}

export async function generateStaticParams() {
	const slugs = getAllPostSlugs();
	return slugs.map((slug) => ({
		slug: slug,
	}));
}

const components = {
	h1: (props: React.ComponentProps<"h1">) => (
		<h1
			{...props}
			className="mb-8 font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl"
		/>
	),
	h2: (props: React.ComponentProps<"h2">) => (
		<h2
			{...props}
			className="mt-12 mb-6 font-bold text-2xl tracking-tighter sm:text-3xl md:text-4xl"
		/>
	),
	h3: (props: React.ComponentProps<"h3">) => (
		<h3
			{...props}
			className="mt-8 mb-4 font-bold text-xl tracking-tight sm:text-2xl"
		/>
	),
	h4: (props: React.ComponentProps<"h4">) => (
		<h4 {...props} className="mt-6 mb-3 font-semibold text-lg tracking-tight" />
	),
	p: (props: React.ComponentProps<"p">) => (
		<p
			{...props}
			className="mb-6 text-muted-foreground leading-relaxed md:text-lg"
		/>
	),
	ul: (props: React.ComponentProps<"ul">) => (
		<ul {...props} className="mb-6 ml-6 list-disc space-y-3" />
	),
	ol: (props: React.ComponentProps<"ol">) => (
		<ol {...props} className="mb-6 ml-6 list-decimal space-y-3" />
	),
	li: (props: React.ComponentProps<"li">) => (
		<li
			{...props}
			className="text-muted-foreground leading-relaxed md:text-lg"
		/>
	),
	table: (props: React.ComponentProps<"table">) => (
		<div className="mb-8 overflow-hidden rounded-lg border border-border">
			<table {...props} className="w-full border-collapse bg-background" />
		</div>
	),
	thead: (props: React.ComponentProps<"thead">) => (
		<thead {...props} className="bg-muted/50" />
	),
	tbody: (props: React.ComponentProps<"tbody">) => (
		<tbody {...props} className="divide-y divide-border" />
	),
	tr: (props: React.ComponentProps<"tr">) => (
		<tr {...props} className="transition-colors hover:bg-muted/50" />
	),
	th: (props: React.ComponentProps<"th">) => (
		<th
			{...props}
			className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider"
		/>
	),
	td: (props: React.ComponentProps<"td">) => (
		<td {...props} className="px-6 py-4 text-muted-foreground" />
	),
	a: ({ href, children, ...props }: React.ComponentProps<"a">) => {
		if (href?.startsWith("/")) {
			return (
				<Link
					href={href}
					{...props}
					className="font-medium text-primary underline-offset-4 hover:underline"
				>
					{children}
				</Link>
			);
		}
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
				className="font-medium text-primary underline-offset-4 hover:underline"
			>
				{children}
			</a>
		);
	},
	blockquote: (props: React.ComponentProps<"blockquote">) => (
		<blockquote
			{...props}
			className="mb-8 border-primary/20 border-l-4 bg-muted/30 py-4 pl-6 text-muted-foreground italic"
		/>
	),
	hr: (props: React.ComponentProps<"hr">) => (
		<hr {...props} className="my-12 border-border" />
	),
	pre: (props: React.ComponentProps<"pre">) => (
		<pre
			{...props}
			className="mb-8 overflow-x-auto rounded-lg bg-muted p-6 text-sm"
		/>
	),
	code: (props: React.ComponentProps<"code">) => (
		<code {...props} className="rounded bg-muted px-2 py-1 font-mono text-sm" />
	),
	strong: (props: React.ComponentProps<"strong">) => (
		<strong {...props} className="font-bold text-foreground" />
	),
	em: (props: React.ComponentProps<"em">) => (
		<em {...props} className="text-muted-foreground italic" />
	),
	Button,
	Link,
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
	const post = getPostData(params.slug);

	if (!post) {
		notFound();
	}

	const relatedPosts = getRelatedPosts(post.slug, post.category, 3);

	return (
		<div className="flex w-full flex-col overflow-x-hidden">
			<LandingPageHeader />

			<main className="flex-1">
				<section className="border-b bg-muted/30">
					<div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
						<Link
							href="/blog"
							className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Blog
						</Link>

						<div className="mx-auto max-w-4xl">
							<div className="mb-6 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
								<span className="rounded-full bg-primary/10 px-4 py-2 font-medium text-primary">
									{post.category}
								</span>
								<div className="flex items-center gap-2">
									<CalendarDays className="h-4 w-4" />
									{new Date(post.publishedAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</div>
								<div className="flex items-center gap-2">
									<Clock className="h-4 w-4" />
									{post.readTime}
								</div>
							</div>

							<h1 className="mb-6 font-bold text-4xl tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
								{post.title}
							</h1>

							<p className="mb-8 text-muted-foreground text-xl leading-relaxed md:text-2xl">
								{post.excerpt}
							</p>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<div className="size-14 overflow-hidden rounded-full">
										<Image
											src={`/${post.author.toLowerCase().replace(/\s+/g, "-")}.webp`}
											alt={post.author}
											width={56}
											height={56}
											className="h-full w-full object-cover"
										/>
									</div>
									<div>
										<div className="font-semibold text-lg">{post.author}</div>
										<div className="text-muted-foreground text-sm">Author</div>
									</div>
								</div>
								<ShareButton post={post} />
							</div>
						</div>
					</div>
				</section>

				<section className="pt-10 md:pt-14">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto max-w-4xl">
							<div className="mb-12 aspect-[16/9] overflow-hidden rounded-2xl border md:rounded-3xl">
								<Image
									src={post.image}
									alt={post.title}
									width={1200}
									height={675}
									className="h-full w-full object-cover"
									priority
								/>
							</div>

							<article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
								<MDXRemote
									source={post.content}
									components={components}
									options={{
										mdxOptions: {
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
									}}
								/>
							</article>

							<div className="mt-12 mb-8 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 text-center text-primary-foreground md:p-16">
								<h3 className="mb-6 font-bold text-3xl tracking-tighter">
									Transform Your Professional Image Today
								</h3>
								<p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
									Join thousands of professionals who've upgraded their
									headshots with LookCrafted's AI technology.
								</p>
								<Button
									size="lg"
									variant="secondary"
									asChild
									className="px-8 py-4 text-lg"
								>
									<Link href="/app">
										<BookOpen className="mr-2 h-5 w-5" />
										Create Your Headshots
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>

				{relatedPosts.length > 0 && (
					<section className="mt-16 border-t bg-muted/30 py-16 md:py-20 lg:mt-24">
						<div className="container mx-auto px-4 md:px-6">
							<div className="mb-12 text-center">
								<h2 className="mb-4 font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
									Related Articles
								</h2>
								<p className="text-lg text-muted-foreground md:text-xl">
									More insights on {post.category.toLowerCase()}
								</p>
							</div>
							<div className="mx-auto max-w-7xl">
								<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
									{relatedPosts.map((relatedPost) => (
										<article
											key={relatedPost.slug}
											className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg md:rounded-3xl"
										>
											<Link href={`/blog/${relatedPost.slug}`}>
												<div className="aspect-[16/10] overflow-hidden">
													<Image
														src={relatedPost.image}
														alt={relatedPost.title}
														width={500}
														height={312}
														className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
													/>
												</div>
												<div className="p-6">
													<div className="mb-3 flex items-center gap-3 text-muted-foreground text-sm">
														<span className="rounded-full bg-muted px-3 py-1 font-medium">
															{relatedPost.category}
														</span>
														<div className="flex items-center gap-1">
															<Clock className="h-4 w-4" />
															{relatedPost.readTime}
														</div>
													</div>
													<h3 className="mb-3 font-bold text-xl leading-tight tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
														{relatedPost.title}
													</h3>
													<p className="mb-4 text-muted-foreground leading-relaxed">
														{relatedPost.excerpt}
													</p>
													<div className="flex items-center justify-between">
														<span className="text-muted-foreground text-sm">
															By {relatedPost.author}
														</span>
														<ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
													</div>
												</div>
											</Link>
										</article>
									))}
								</div>
							</div>
						</div>
					</section>
				)}
			</main>

			<LandingPageFooter />
		</div>
	);
}
