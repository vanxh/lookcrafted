import { Award, MessageSquare, Shield } from "lucide-react";

export function GuaranteeSection() {
	return (
		<section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 text-white md:py-20">
			<div className="container mx-auto px-4 md:px-6">
				<div className="mx-auto max-w-3xl text-center">
					<Shield className="mx-auto mb-6 h-16 w-16" />
					<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
						Risk-Free Guarantee
					</h2>
					<p className="mt-4 text-green-100 text-lg leading-relaxed md:text-xl">
						We're so confident you'll love your new headshots that we offer a
						100% money-back guarantee. If you're not completely satisfied, we'll
						refund every penny within 30 days.
					</p>
					<div className="mt-8 grid gap-6 md:grid-cols-3">
						<div className="text-center">
							<MessageSquare className="mx-auto mb-2 h-8 w-8" />
							<div className="font-semibold">24/7 Support</div>
							<div className="text-green-100 text-sm">Always here to help</div>
						</div>
						<div className="text-center">
							<Shield className="mx-auto mb-2 h-8 w-8" />
							<div className="font-semibold">Secure & Private</div>
							<div className="text-green-100 text-sm">Your photos are safe</div>
						</div>
						<div className="text-center">
							<Award className="mx-auto mb-2 h-8 w-8" />
							<div className="font-semibold">Quality Guaranteed</div>
							<div className="text-green-100 text-sm">Professional results</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
