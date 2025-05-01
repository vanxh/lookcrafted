import { LandingPageHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { ImageShowcase } from "@/components/landing/image-showcase";

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col overflow-x-hidden">
			<LandingPageHeader />

			<main className="flex-1">
				<HeroSection />
				<ImageShowcase />
			</main>
		</div>
	);
}
