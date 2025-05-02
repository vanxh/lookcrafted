import { LandingPageHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { ImageShowcaseContainer } from "@/components/landing/image-showcase-container";

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col overflow-x-hidden">
			<LandingPageHeader />

			<main className="flex-1">
				<HeroSection />

				<section className="py-12 md:py-16 lg:py-20">
					<div className="container mx-auto mb-12 px-4 text-center md:px-6">
						<h2 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
							From Selfie to Professional Headshot
						</h2>
						<p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							See how LookCrafted transforms your everyday photos into stunning,
							studio-quality headshots perfect for any professional need.
						</p>
					</div>
					<ImageShowcaseContainer />
				</section>
			</main>
		</div>
	);
}
