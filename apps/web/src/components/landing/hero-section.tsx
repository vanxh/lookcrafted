"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Download, ScanFace, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import Example1Before2 from "@/public/example-1-before-2.webp";
import Example1Before3 from "@/public/example-1-before-3.webp";
import Example1Before1 from "@/public/example-1-before.webp";
import Example1After from "@/public/example-1.webp";
import Example2Before2 from "@/public/example-2-before-2.webp";
import Example2Before3 from "@/public/example-2-before-3.webp";
import Example2Before1 from "@/public/example-2-before.webp";
import Example2After from "@/public/example-2.webp";
import GitHub from "../icons/github";

export function HeroSection() {
	return (
		<section className="relative isolate w-full overflow-hidden px-4 py-12 md:px-6 md:py-16 lg:pt-20 lg:pb-12 xl:pt-24 xl:pb-16">
			<div
				aria-hidden="true"
				className="-z-10 custom-hero-background absolute inset-0 overflow-hidden"
			/>

			<div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 xl:gap-20">
				<div className="hidden flex-col items-center gap-4 lg:flex">
					<div className="flex justify-center gap-2">
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src={Example1Before1}
								alt="Selfie 1"
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src={Example1Before2}
								alt="Selfie 2"
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src={Example1Before3}
								alt="Selfie 3"
								fill
								className="object-cover"
								priority
							/>
						</div>
					</div>
					<div className="relative flex aspect-[3/4] w-full max-w-sm items-center justify-center overflow-hidden rounded-lg bg-muted">
						<Image
							src={Example1After}
							alt="Example headshot 1"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>

				<div className="mx-auto flex max-w-2xl flex-col items-center justify-start space-y-6">
					<div className="flex justify-center">
						<Link
							href="https://github.com/vanxh/lookcrafted"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-medium text-sm text-white shadow-[0_4px_0_0_#333,0_6px_12px_0_rgba(0,0,0,0.3)] transition-all duration-150 hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#333,0_4px_8px_0_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-[0_1px_0_0_#333,0_2px_4px_0_rgba(0,0,0,0.2)]"
						>
							<GitHub />
							<span>Star on GitHub</span>
						</Link>
					</div>

					<div className="space-y-2 text-center">
						<div className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
							✨ Transform Your Selfies into Stunning Headshots with AI
						</div>
						<h1 className="font-bold text-3xl sm:text-5xl xl:text-6xl/none">
							Studio-Quality{" "}
							<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
								<strong>AI Headshots</strong>
							</span>
							<br />
							in Minutes, Not Days.
						</h1>
						<p className="mx-auto max-w-[600px] text-muted-foreground leading-relaxed md:text-xl">
							Upload your photos and let LookCrafted AI craft the perfect
							professional image. Choose from 100+ styles, backgrounds, and
							formats to hint at versatility. Get unique, realistic headshots
							delivered fast.
						</p>
					</div>

					<div className="flex justify-center">
						<a
							href="https://www.producthunt.com/products/lookcrafted?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-lookcrafted"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=981552&theme=light&t=1750627191853"
								alt="LookCrafted - Studio&#0045;Quality&#0032;AI&#0032;Headshots&#0032;in&#0032;Minutes&#0044;&#0032;Not&#0032;Days&#0046; | Product Hunt"
								style={{ width: "250px", height: "54px" }}
								width="250"
								height="54"
							/>
						</a>
					</div>

					<div className="flex w-full flex-col items-center gap-2 min-[400px]:flex-row min-[400px]:justify-center">
						<Button
							size="lg"
							className="w-full bg-blue-600 transition-transform duration-150 ease-in-out hover:bg-blue-700 hover:brightness-110 min-[400px]:w-auto"
						>
							<Link href="/app">Craft My Headshots Now →</Link>
						</Button>
						<span className="hidden font-medium text-muted-foreground text-sm min-[400px]:block">
							OR
						</span>
						<Button
							variant="outline"
							size="lg"
							className="w-full min-[400px]:w-auto"
						>
							<Link href="/app">Headshots for Teams</Link>
						</Button>
					</div>

					<div className="mt-6 flex w-full items-center justify-center gap-8 sm:flex-row sm:items-start lg:hidden">
						<div className="flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-[45%]">
							<div className="flex w-full justify-center gap-2">
								<div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
									<Image
										src={Example1Before1}
										alt="Selfie 1"
										fill
										className="object-cover"
										priority
									/>
								</div>
								<div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
									<Image
										src={Example1Before2}
										alt="Selfie 2"
										fill
										className="object-cover"
										priority
									/>
								</div>
							</div>

							<div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted shadow-md">
								<Image
									src={Example1After}
									alt="Example headshot 1"
									fill
									className="object-cover"
									priority
								/>
							</div>
						</div>

						<div className="flex w-full max-w-xs flex-col items-center gap-3 sm:max-w-[45%]">
							<div className="flex w-full justify-center gap-2">
								<div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
									<Image
										src={Example2Before1}
										alt="Selfie 3"
										fill
										className="object-cover"
										priority
									/>
								</div>
								<div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
									<Image
										src={Example2Before2}
										alt="Selfie 4"
										fill
										className="object-cover"
										priority
									/>
								</div>
							</div>

							<div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted shadow-md">
								<Image
									src={Example2After}
									alt="Example headshot 2"
									fill
									className="object-cover"
									priority
								/>
							</div>
						</div>
					</div>

					<div className="mt-8 flex w-full flex-col justify-between gap-8 md:flex-row md:gap-6 lg:gap-8">
						<div className="flex-shrink-0 text-left md:w-5/12">
							<h2 className="mb-3 text-left font-semibold text-lg">
								What You Get:
							</h2>
							<ul className="space-y-2 text-muted-foreground">
								<li className="flex items-start">
									<CheckCircle2
										className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-blue-500"
										aria-hidden="true"
									/>
									<span>
										<strong>100+ unique headshots</strong> generated by AI
									</span>
								</li>
								<li className="flex items-start">
									<CheckCircle2
										className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-blue-500"
										aria-hidden="true"
									/>
									<span>
										Wide variety of <strong>styles & backgrounds</strong>
									</span>
								</li>
								<li className="flex items-start">
									<CheckCircle2
										className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-blue-500"
										aria-hidden="true"
									/>
									<span>
										<strong>High-resolution</strong>, professional quality
										images
									</span>
								</li>
								<li className="flex items-start">
									<CheckCircle2
										className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-blue-500"
										aria-hidden="true"
									/>
									<span>
										Ready in <strong>minutes, not days</strong>
									</span>
								</li>
							</ul>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5 }}
							className="relative w-full flex-shrink-0 rounded-lg border bg-card p-4 shadow-md md:w-7/12 md:p-6"
						>
							<div className="flex flex-col gap-3 divide-y divide-border">
								<div className="flex items-center gap-4 pt-1 pb-3 first:pt-0 last:pb-0">
									<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
										<ScanFace className="h-5 w-5" />
									</div>
									<div>
										<h3 className="font-semibold text-sm">
											<span className="font-bold">Step 1:</span> Upload selfies
										</h3>
									</div>
								</div>
								<div className="flex items-center gap-4 pt-3 pb-3 first:pt-0 last:pb-0">
									<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
										<Wand2 className="h-5 w-5" />
									</div>
									<div>
										<h3 className="font-semibold text-sm">
											<span className="font-bold">Step 2:</span> Our AI goes to
											work
										</h3>
									</div>
								</div>
								<div className="flex items-center gap-4 pt-3 pb-1 first:pt-0 last:pb-0">
									<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
										<Download className="h-5 w-5" />
									</div>
									<div>
										<h3 className="font-semibold text-sm">
											<span className="font-bold">Step 3:</span> Download
											headshots
										</h3>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>

				<div className="hidden flex-col items-center gap-4 lg:flex">
					<div className="flex justify-center gap-2">
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src={Example2Before1}
								alt="Selfie 4"
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src={Example2Before2}
								alt="Selfie 5"
								fill
								className="object-cover"
								priority
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src={Example2Before3}
								alt="Selfie 6"
								fill
								className="object-cover"
								priority
							/>
						</div>
					</div>
					<div className="relative flex aspect-[3/4] w-full max-w-sm items-center justify-center overflow-hidden rounded-lg bg-muted">
						<Image
							src={Example2After}
							alt="Example headshot 2"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
