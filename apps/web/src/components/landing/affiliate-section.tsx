import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	Clock,
	CreditCard,
	Sparkles,
	TrendingUp,
	Users2,
} from "lucide-react";
import Link from "next/link";

interface AffiliateMetric {
	icon: React.ReactNode;
	value: string;
	label: string;
}

interface AffiliateSectionProps {
	title?: string;
	description?: string;
	commissionRate?: string;
	cookieDuration?: string;
	payoutTime?: string;
	primaryButtonText?: string;
	secondaryButtonText?: string;
	href?: string;
}

export function AffiliateSection({
	title = "Join Our Affiliate Program",
	description = "Earn generous commissions by referring customers to LookCrafted. Perfect for content creators, career coaches, and professionals.",
	commissionRate = "30%",
	cookieDuration = "30 Days",
	payoutTime = "30 Days",
	primaryButtonText = "Become an Affiliate",
	secondaryButtonText = "Learn More",
	href = "/affiliate",
}: AffiliateSectionProps) {
	const metrics: AffiliateMetric[] = [
		{
			icon: <TrendingUp className="h-5 w-5" />,
			value: commissionRate,
			label: "Commission Rate",
		},
		{
			icon: <Clock className="h-5 w-5" />,
			value: cookieDuration,
			label: "Cookie Duration",
		},
		{
			icon: <CreditCard className="h-5 w-5" />,
			value: payoutTime,
			label: "Payout Time",
		},
	];

	return (
		<section className="mx-auto max-w-5xl">
			<div className="relative overflow-hidden rounded-3xl border bg-white p-10 shadow-xl dark:border-gray-800 dark:bg-gray-900">
				<div className="-right-20 -top-20 absolute h-40 w-40 rounded-full bg-blue-100 opacity-30 blur-3xl dark:bg-blue-900/30" />
				<div className="-bottom-16 -left-16 absolute h-32 w-32 rounded-full bg-blue-50 opacity-40 blur-2xl dark:bg-blue-800/20" />

				<div className="relative">
					<div className="mb-12 text-center">
						<div className="group mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<Users2 className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
						</div>
						<div className="mb-4 flex items-center justify-center gap-2">
							<Sparkles className="h-4 w-4 text-blue-600" />
							<span className="font-semibold text-blue-600 text-xs uppercase tracking-wider opacity-80">
								Partnership Program
							</span>
							<Sparkles className="h-4 w-4 text-blue-600" />
						</div>
						<h3 className="mb-4 font-bold text-3xl text-gray-900 dark:text-white">
							{title}
						</h3>
						<p className="mx-auto max-w-2xl text-gray-600 text-lg leading-relaxed dark:text-gray-300">
							{description}
						</p>
					</div>

					<div className="mb-12 grid gap-6 sm:grid-cols-3">
						{metrics.map((metric, index) => (
							<div
								key={metric.label}
								className="group relative"
								style={{ animationDelay: `${index * 100}ms` }}
							>
								<div className="hover:-translate-y-1 relative overflow-hidden rounded-2xl border bg-gray-50 p-6 text-center transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
									<div className="mb-4 flex justify-center">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/50 dark:text-blue-400">
											{metric.icon}
										</div>
									</div>
									<div className="mb-2 font-bold text-3xl text-blue-600">
										{metric.value}
									</div>
									<div className="font-medium text-gray-600 text-sm dark:text-gray-400">
										{metric.label}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Button
							size="lg"
							className="bg-blue-600 text-white hover:bg-blue-700"
						>
							<Link
								href={href}
								className="flex items-center gap-3 font-semibold"
							>
								{primaryButtonText}
								<ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
							</Link>
						</Button>
						<Button variant="outline" size="lg">
							<Link href={href}>{secondaryButtonText}</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
