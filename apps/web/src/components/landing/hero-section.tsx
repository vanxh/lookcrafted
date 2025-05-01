"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Download, UploadCloud, Wand2 } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
	return (
		<section className="w-full px-4 py-16 md:px-6 md:py-24 lg:pt-24 lg:pb-16 xl:pt-32 xl:pb-24">
			<div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 xl:gap-20">
				<div className="hidden flex-col items-center gap-4 lg:flex">
					<div className="flex justify-center gap-2">
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src="/example.webp"
								alt="Selfie 1"
								fill
								className="object-cover"
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src="/example.webp"
								alt="Selfie 2"
								fill
								className="object-cover"
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src="/example.webp"
								alt="Selfie 3"
								fill
								className="object-cover"
							/>
						</div>
					</div>
					<div className="relative flex aspect-[3/4] w-full max-w-sm items-center justify-center overflow-hidden rounded-lg bg-muted">
						<Image
							src="/example.webp"
							alt="Example headshot 1"
							fill
							className="object-cover"
						/>
					</div>
				</div>

				<div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
							✨ Transform Your Selfies into Stunning Headshots with AI
						</div>
						<h1 className="font-bold text-3xl sm:text-5xl xl:text-6xl/none">
							Studio-Quality{" "}
							<span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
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
					<div className="flex w-full flex-col items-center gap-2 min-[400px]:flex-row min-[400px]:justify-center">
						<Button
							size="lg"
							className="w-full bg-orange-500 transition-transform duration-150 ease-in-out hover:bg-orange-600 hover:brightness-110 min-[400px]:w-auto"
						>
							Craft My Headshots Now →
						</Button>
						<span className="hidden font-medium text-muted-foreground text-sm min-[400px]:block">
							OR
						</span>
						<Button
							variant="outline"
							size="lg"
							className="w-full min-[400px]:w-auto"
						>
							Headshots for Teams
						</Button>
					</div>
				</div>

				<div className="hidden flex-col items-center gap-4 lg:flex">
					<div className="flex justify-center gap-2">
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src="/example.webp"
								alt="Selfie 4"
								fill
								className="object-cover"
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src="/example.webp"
								alt="Selfie 5"
								fill
								className="object-cover"
							/>
						</div>
						<div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-md bg-muted">
							<Image
								src="/example.webp"
								alt="Selfie 6"
								fill
								className="object-cover"
							/>
						</div>
					</div>
					<div className="relative flex aspect-[3/4] w-full max-w-sm items-center justify-center overflow-hidden rounded-lg bg-muted">
						<Image
							src="/example.webp"
							alt="Example headshot 2"
							fill
							className="object-cover"
						/>
					</div>
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.5 }}
				className="container relative mx-auto mt-12 max-w-4xl rounded-lg border bg-card p-6 shadow-md md:mt-16 md:p-8"
			>
				<div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-8 md:gap-12">
					<div className="flex items-center gap-4">
						<UploadCloud className="h-6 w-6 flex-shrink-0 text-foreground" />
						<div>
							<h3 className="font-semibold text-sm">
								<span className="font-bold">Step 1:</span>
								<br />
								Upload selfies
							</h3>
						</div>
					</div>
					<ArrowRight className="hidden h-6 w-6 place-self-center text-muted-foreground/40 sm:block" />
					<div className="flex items-center gap-4">
						<Wand2 className="h-6 w-6 flex-shrink-0 text-foreground" />
						<div>
							<h3 className="font-semibold text-sm">
								<span className="font-bold">Step 2:</span>
								<br />
								Our AI goes to work
							</h3>
						</div>
					</div>
					<ArrowRight className="hidden h-6 w-6 place-self-center text-muted-foreground/40 sm:block" />
					<div className="flex items-center gap-4">
						<Download className="h-6 w-6 flex-shrink-0 text-foreground" />
						<div>
							<h3 className="font-semibold text-sm">
								<span className="font-bold">Step 3:</span>
								<br />
								Download headshots
							</h3>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
