import { AffiliateSection } from "@/components/landing/affiliate-section";
import { CallToActionSection } from "@/components/landing/cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { LandingPageFooter } from "@/components/landing/footer";
import { GuaranteeSection } from "@/components/landing/guarantee-section";
import { LandingPageHeader } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ImageShowcaseContainer } from "@/components/landing/image-showcase-container";
import { PricingTable } from "@/components/landing/pricing-table";

export default function Home() {
	return (
		<div className="flex w-full flex-col overflow-x-hidden">
			<LandingPageHeader />

			<main className="flex-1">
				<HeroSection />

				<section id="showcase" className="pt-10 md:pt-14">
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

				<HowItWorksSection />

				<section className="mt-16 lg:mt-24">
					<GuaranteeSection />
				</section>

				<section id="pricing" className="mt-16 lg:mt-24">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto mb-12 max-w-3xl text-center">
							<h2 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
								Choose Your Perfect Plan
							</h2>
							<p className="mt-4 text-lg text-muted-foreground md:text-xl">
								Affordable AI headshots, ready in minutes.
							</p>
						</div>
						<PricingTable />

						<div className="mt-16 lg:mt-24">
							<AffiliateSection />
						</div>
					</div>
				</section>

				<FaqSection />

				<CallToActionSection />
			</main>

			<LandingPageFooter />
		</div>
	);
}
