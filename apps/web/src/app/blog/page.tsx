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
								<span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-2 font-medium text-primary-foreground text-sm shadow-sm">
									✨ Featured Article
								</span>
							</div>
							<div className="group overflow-hidden rounded-2xl border bg-card shadow-lg transition-all duration-300 hover:shadow-xl md:rounded-3xl">
								<div className="md:flex">
									<div className="relative md:w-1/2">
										<div className="absolute inset-0 z-10 bg-gradient-to-r from-black/20 to-transparent" />
										<Image
											src={featuredPost.image}
											alt={featuredPost.title}
											width={600}
											height={400}
											className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-full"
										/>
									</div>
									<div className="p-8 md:w-1/2 md:p-12">
										<div className="mb-4 flex flex-wrap items-center gap-3 text-muted-foreground text-sm">
											<span className="rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary">
												{featuredPost.category}
											</span>
											<div className="flex items-center gap-1.5">
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
											<div className="flex items-center gap-1.5">
												<Clock className="h-4 w-4" />
												{featuredPost.readTime}
											</div>
										</div>
										<h2 className="mb-4 font-bold text-2xl tracking-tight transition-colors group-hover:text-primary lg:text-3xl">
											{featuredPost.title}
										</h2>
										<p className="mb-6 text-muted-foreground leading-relaxed">
											{featuredPost.excerpt}
										</p>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<div className="h-8 w-8 overflow-hidden rounded-full">
													<Image
														src={`/${featuredPost.author.toLowerCase().replace(/\s+/g, "-")}.webp`}
														alt={featuredPost.author}
														width={32}
														height={32}
														className="h-full w-full object-cover"
													/>
												</div>
												<span className="font-medium text-sm">
													By {featuredPost.author}
												</span>
											</div>
											<Button asChild className="group/btn">
												<Link href={`/blog/${featuredPost.slug}`}>
													Read Article
													<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
												</Link>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}

				<section className="py-16 md:py-20">
					<div className="container mx-auto px-4 md:px-6">
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{regularPosts.map((post) => (
								<article
									key={post.slug}
									className="group hover:-translate-y-1 relative overflow-hidden rounded-2xl border bg-card/50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-primary/5 hover:shadow-xl md:rounded-3xl"
								>
									<Link href={`/blog/${post.slug}`} className="block">
										<div className="relative aspect-[16/10] overflow-hidden">
											<div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
											<Image
												src={post.image}
												alt={post.title}
												width={500}
												height={312}
												className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>
											<div className="absolute top-4 left-4 z-20">
												<span className="inline-block rounded-full bg-white/90 px-3 py-1.5 font-medium text-gray-900 text-xs shadow-sm backdrop-blur-sm">
													{post.category}
												</span>
											</div>
										</div>
										<div className="p-6 md:p-8">
											<div className="mb-3 flex items-center gap-3 text-muted-foreground text-xs">
												<div className="flex items-center gap-1.5">
													<Clock className="h-3.5 w-3.5" />
													{post.readTime}
												</div>
												<span className="text-muted-foreground/60">•</span>
												<span>
													{new Date(post.publishedAt).toLocaleDateString(
														"en-US",
														{
															month: "short",
															day: "numeric",
															year: "numeric",
														},
													)}
												</span>
											</div>
											<h3 className="mb-3 font-bold text-xl leading-tight tracking-tight transition-colors duration-200 group-hover:text-primary sm:text-2xl">
												{post.title}
											</h3>
											<p className="mb-6 line-clamp-3 text-muted-foreground leading-relaxed">
												{post.excerpt}
											</p>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-3">
													<div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-white/10">
														<Image
															src={`/${post.author.toLowerCase().replace(/\s+/g, "-")}.webp`}
															alt={post.author}
															width={32}
															height={32}
															className="h-full w-full object-cover"
														/>
													</div>
													<span className="font-medium text-muted-foreground text-sm">
														{post.author}
													</span>
												</div>
												<div className="flex translate-x-2 items-center gap-2 font-medium text-primary text-sm opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
													<span>Read more</span>
													<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
												</div>
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
