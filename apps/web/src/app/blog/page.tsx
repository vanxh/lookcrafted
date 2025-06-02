import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LandingPageFooter } from "@/components/landing/footer";
import { LandingPageHeader } from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { getAllCategories, getAllPosts, getFeaturedPost } from "@/lib/blog";

export const metadata: Metadata = {
	title: "Blog - LookCrafted | AI Headshot Tips & Photography Insights",
	description:
		"Discover the latest tips on professional headshots, AI photography, LinkedIn profiles, and career advice from the LookCrafted team.",
	keywords: [
		"AI headshot tips",
		"professional photography",
		"LinkedIn headshots",
		"career advice",
		"headshot photography",
		"AI photography blog",
		"professional photos",
		"remote work headshots",
	],
	openGraph: {
		title: "Blog - LookCrafted | AI Headshot Tips & Photography Insights",
		description:
			"Discover the latest tips on professional headshots, AI photography, LinkedIn profiles, and career advice.",
		url: "https://lookcrafted.com/blog",
		siteName: "LookCrafted",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog - LookCrafted | AI Headshot Tips & Photography Insights",
		description:
			"Discover the latest tips on professional headshots, AI photography, LinkedIn profiles, and career advice.",
	},
};

export default function BlogPage() {
	const allPosts = getAllPosts();
	const featuredPost = getFeaturedPost();
	const regularPosts = allPosts;
	const categories = getAllCategories();

	return (
		<div className="flex w-full flex-col overflow-x-hidden">
			<LandingPageHeader />

			<main className="flex-1">
				<section className="bg-muted/30 py-16 md:py-20">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto max-w-3xl text-center">
							<h1 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								LookCrafted Blog
							</h1>
							<p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
								Expert insights on professional headshots, AI photography, and
								career advancement
							</p>
						</div>
					</div>
				</section>

				{featuredPost && (
					<section className="pt-10 md:pt-14">
						<div className="container mx-auto px-4 md:px-6">
							<div className="mb-8">
								<span className="inline-block rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm">
									Featured Article
								</span>
							</div>
							<div className="overflow-hidden rounded-2xl border bg-card shadow-sm md:rounded-3xl">
								<div className="md:flex">
									<div className="md:w-1/2">
										<Image
											src={featuredPost.image}
											alt={featuredPost.title}
											width={600}
											height={400}
											className="h-64 w-full object-cover md:h-full"
										/>
									</div>
									<div className="p-8 md:w-1/2 md:p-12">
										<div className="mb-4 flex items-center gap-4 text-muted-foreground text-sm">
											<span className="rounded-full bg-muted px-3 py-1 font-medium">
												{featuredPost.category}
											</span>
											<div className="flex items-center gap-2">
												<CalendarDays className="h-4 w-4" />
												{new Date(featuredPost.publishedAt).toLocaleDateString(
													"en-US",
													{
														month: "long",
														day: "numeric",
														year: "numeric",
													},
												)}
											</div>
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4" />
												{featuredPost.readTime}
											</div>
										</div>
										<h2 className="mb-4 font-bold text-2xl tracking-tight lg:text-3xl">
											{featuredPost.title}
										</h2>
										<p className="mb-6 text-muted-foreground leading-relaxed">
											{featuredPost.excerpt}
										</p>
										<div className="flex items-center justify-between">
											<span className="font-medium text-sm">
												By {featuredPost.author}
											</span>
											<Button asChild>
												<Link href={`/blog/${featuredPost.slug}`}>
													Read Article
													<ArrowRight className="ml-2 h-4 w-4" />
												</Link>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}

				<section className="mt-16 border-b bg-muted/30 py-8 lg:mt-24">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-wrap justify-center gap-3">
							{categories.map((category) => (
								<Button
									key={category}
									variant={category === "All" ? "default" : "outline"}
									size="sm"
									className="rounded-full"
								>
									{category}
								</Button>
							))}
						</div>
					</div>
				</section>

				<section className="py-16 md:py-20">
					<div className="container mx-auto px-4 md:px-6">
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{regularPosts.map((post) => (
								<article
									key={post.slug}
									className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-lg md:rounded-3xl"
								>
									<Link href={`/blog/${post.slug}`}>
										<div className="aspect-[16/10] overflow-hidden">
											<Image
												src={post.image}
												alt={post.title}
												width={500}
												height={312}
												className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</div>
										<div className="p-6">
											<div className="mb-3 flex items-center gap-3 text-muted-foreground text-sm">
												<span className="rounded-full bg-muted px-3 py-1 font-medium">
													{post.category}
												</span>
												<div className="flex items-center gap-1">
													<Clock className="h-4 w-4" />
													{post.readTime}
												</div>
											</div>
											<h3 className="mb-3 font-bold text-xl leading-tight tracking-tight transition-colors group-hover:text-primary">
												{post.title}
											</h3>
											<p className="mb-4 text-muted-foreground leading-relaxed">
												{post.excerpt}
											</p>
											<div className="flex items-center justify-between">
												<span className="text-muted-foreground text-sm">
													By {post.author}
												</span>
												<span className="text-muted-foreground text-sm">
													{new Date(post.publishedAt).toLocaleDateString(
														"en-US",
														{
															month: "short",
															day: "numeric",
														},
													)}
												</span>
											</div>
										</div>
									</Link>
								</article>
							))}
						</div>
					</div>
				</section>
			</main>

			<LandingPageFooter />
		</div>
	);
}
