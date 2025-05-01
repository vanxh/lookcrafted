import { LandingPageHeader } from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<LandingPageHeader />

			<main className="flex-1">
				<section className="w-full border-b px-4 py-12 md:px-6 md:py-24 lg:py-32 xl:py-40">
					<div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 xl:gap-20">
						<div className="hidden flex-col items-center justify-center gap-2 lg:flex">
							<div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted">
								<Image
									src="/example.webp"
									alt="Example headshot 1"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative h-60 w-full overflow-hidden rounded-lg bg-muted">
								<Image
									src="/example.webp"
									alt="Example headshot 2"
									fill
									className="object-cover"
								/>
							</div>
						</div>

						<div className="mx-auto flex max-w-2xl flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
									✨ Transform Your Selfies into Stunning Headshots with AI
								</div>
								<h1 className="font-bold text-3xl tracking-tighter sm:text-5xl xl:text-6xl/none">
									Studio-Quality AI Headshots
									<br />
									in Minutes, Not Days.
								</h1>
								<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
									Upload your photos and let LookCrafted AI craft the perfect
									professional image. Choose from diverse styles & backgrounds.
									Get 100+ unique, realistic headshots delivered fast.
								</p>
							</div>
							<div className="flex w-full flex-col items-center gap-2 min-[400px]:flex-row min-[400px]:justify-center">
								<Button
									size="lg"
									className="w-full bg-orange-500 hover:bg-orange-600 min-[400px]:w-auto"
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

						<div className="hidden flex-col items-center justify-center gap-2 lg:flex">
							<div className="relative h-60 w-full overflow-hidden rounded-lg bg-muted">
								<Image
									src="/example.webp"
									alt="Example headshot 3"
									fill
									className="object-cover"
								/>
							</div>
							<div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted">
								<Image
									src="/example.webp"
									alt="Example headshot 4"
									fill
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
