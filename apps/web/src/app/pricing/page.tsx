import { AffiliateSection } from "@/components/landing/affiliate-section";
import { FaqSection } from "@/components/landing/faq-section";
import { LandingPageFooter } from "@/components/landing/footer";
import { LandingPageHeader } from "@/components/landing/header";
import { PricingTable } from "@/components/landing/pricing-table";

export default function PricingPage() {
	return (
		<div className="flex w-full flex-col overflow-x-hidden">
			<LandingPageHeader />

			<main className="flex-1 py-12 md:py-16 lg:py-20">
				<section className="container mx-auto px-4 md:px-6">
					<div className="mx-auto mb-12 max-w-3xl text-center">
						<h1 className="font-bold text-4xl tracking-tighter sm:text-5xl md:text-6xl">
							Studio-Quality Headshots, Smarter Price
						</h1>
						<p className="mt-4 text-lg text-muted-foreground md:text-xl">
							Skip the $250+ studio session. Get professional AI headshots
							affordably.
						</p>
					</div>

					<PricingTable />

					<div className="mt-16 lg:mt-24">
						<AffiliateSection />
					</div>
				</section>

				<FaqSection />
			</main>

			<LandingPageFooter />
		</div>
	);
}
