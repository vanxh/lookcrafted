import {
	Award,
	CheckCircle,
	CheckCircle2,
	Clock,
	DollarSign,
	Eye,
	Star,
	Target,
	Zap,
} from "lucide-react";
import Link from "next/link";

import LinkedIn from "@/components/icons/linkedin";
import { AffiliateSection } from "@/components/landing/affiliate-section";
import { CallToActionSection } from "@/components/landing/cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { LandingPageFooter } from "@/components/landing/footer";
import { GuaranteeSection } from "@/components/landing/guarantee-section";
import { LandingPageHeader } from "@/components/landing/header";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ImageShowcaseContainer } from "@/components/landing/image-showcase-container";
import { PricingTable } from "@/components/landing/pricing-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LinkedInHeadshotsPage() {
	return (
		<div className="flex w-full flex-col overflow-x-hidden">
			<LandingPageHeader />

			<main className="flex-1">
				<section className="relative isolate w-full overflow-hidden px-4 py-12 md:px-6 md:py-16 lg:pt-20 lg:pb-12 xl:pt-24 xl:pb-16">
					<div
						aria-hidden="true"
						className="-z-10 custom-hero-background absolute inset-0 overflow-hidden"
					/>
					<div className="container mx-auto">
						<div className="mx-auto max-w-4xl text-center">
							<div className="mb-6 flex justify-center">
								<Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
									<LinkedIn className="mr-2 h-4 w-4" />✨ LinkedIn Optimized •
									Trusted by 10,000+ Professionals
								</Badge>
							</div>
							<h1 className="font-bold text-3xl sm:text-5xl xl:text-6xl/none">
								Get Noticed by Recruiters with{" "}
								<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
									<strong>AI LinkedIn Headshots</strong>
								</span>
							</h1>
							<p className="mx-auto mt-6 max-w-[700px] text-muted-foreground leading-relaxed md:text-xl">
								Transform your career prospects in 30 minutes. Our AI creates
								studio-quality LinkedIn headshots that get you 14x more profile
								views and 3x more interview requests.
							</p>
							<div className="mt-8 flex w-full flex-col items-center gap-2 min-[400px]:flex-row min-[400px]:justify-center">
								<Button
									size="lg"
									className="w-full bg-blue-600 transition-transform duration-150 ease-in-out hover:bg-blue-700 hover:brightness-110 min-[400px]:w-auto"
									asChild
								>
									<Link href="/create">Create My Professional Headshots →</Link>
								</Button>
								<span className="hidden font-medium text-muted-foreground text-sm min-[400px]:block">
									OR
								</span>
								<Button
									size="lg"
									variant="outline"
									className="w-full min-[400px]:w-auto"
									asChild
								>
									<Link href="#showcase">See Examples</Link>
								</Button>
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
												<strong>50+ LinkedIn-optimized</strong> headshots
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle2
												className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-blue-500"
												aria-hidden="true"
											/>
											<span>
												Professional <strong>styles & backgrounds</strong>
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle2
												className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-blue-500"
												aria-hidden="true"
											/>
											<span>
												<strong>Ready in 30 minutes</strong> or less
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle2
												className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-blue-500"
												aria-hidden="true"
											/>
											<span>
												<strong>Money-back guarantee</strong>
											</span>
										</li>
									</ul>
								</div>
								<div className="flex-shrink-0 text-left md:w-5/12">
									<h2 className="mb-3 text-left font-semibold text-lg">
										Perfect For:
									</h2>
									<ul className="space-y-2 text-muted-foreground">
										<li className="flex items-start">
											<CheckCircle2
												className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-orange-500"
												aria-hidden="true"
											/>
											<span>
												<strong>Job seekers</strong> and career changers
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle2
												className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-orange-500"
												aria-hidden="true"
											/>
											<span>
												<strong>Entrepreneurs</strong> and business owners
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle2
												className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-orange-500"
												aria-hidden="true"
											/>
											<span>
												<strong>Sales professionals</strong> and consultants
											</span>
										</li>
										<li className="flex items-start">
											<CheckCircle2
												className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-orange-500"
												aria-hidden="true"
											/>
											<span>
												<strong>Anyone</strong> building their personal brand
											</span>
										</li>
									</ul>
								</div>
							</div>
							<div className="mt-8 flex items-center justify-center gap-1 text-yellow-500">
								<Star className="h-5 w-5 fill-current" />
								<Star className="h-5 w-5 fill-current" />
								<Star className="h-5 w-5 fill-current" />
								<Star className="h-5 w-5 fill-current" />
								<Star className="h-5 w-5 fill-current" />
								<span className="ml-2 text-muted-foreground text-sm">
									4.9/5 from 12,000+ reviews
								</span>
							</div>
						</div>
					</div>
				</section>

				<section className="border-b bg-gradient-to-br from-slate-50 to-slate-100 py-8 dark:from-slate-900 dark:to-slate-800">
					<div className="container mx-auto px-4 md:px-6">
						<div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
							<div className="text-center">
								<div className="font-bold text-2xl text-blue-600">10,000+</div>
								<div className="text-muted-foreground text-sm">
									Professionals
								</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-2xl text-green-600">98%</div>
								<div className="text-muted-foreground text-sm">
									Satisfaction Rate
								</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-2xl text-purple-600">14x</div>
								<div className="text-muted-foreground text-sm">
									More Profile Views
								</div>
							</div>
							<div className="text-center">
								<div className="font-bold text-2xl text-orange-600">3x</div>
								<div className="text-muted-foreground text-sm">
									More Interviews
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-16 md:py-20">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto mb-16 max-w-3xl text-center">
							<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								Your LinkedIn Photo is Your Career's{" "}
								<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
									First Impression
								</span>
							</h2>
							<p className="mt-4 text-lg text-muted-foreground leading-relaxed md:text-xl">
								In today's digital-first world, your LinkedIn profile photo
								determines whether recruiters click on your profile or scroll
								past. Make every view count.
							</p>
						</div>
						<div className="grid gap-8 md:grid-cols-3">
							<div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center dark:from-blue-900/20 dark:to-blue-800/20">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
									<Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									14x More Profile Views
								</h3>
								<p className="text-muted-foreground">
									LinkedIn profiles with professional photos receive 14 times
									more profile views and 36 times more messages from recruiters
									and potential connections.
								</p>
							</div>
							<div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-8 text-center dark:from-green-900/20 dark:to-green-800/20">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
									<Target className="h-8 w-8 text-green-600 dark:text-green-400" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									3x Higher Interview Rate
								</h3>
								<p className="text-muted-foreground">
									Professionals with quality headshots are 3x more likely to be
									contacted by recruiters and have a 40% higher interview
									success rate.
								</p>
							</div>
							<div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-8 text-center dark:from-purple-900/20 dark:to-purple-800/20">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
									<Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									58% More Credible
								</h3>
								<p className="text-muted-foreground">
									Professional headshots increase perceived competence by 58%
									and establish instant credibility in your industry and
									network.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 py-16 md:py-20 dark:from-red-900/10 dark:via-orange-900/10 dark:to-yellow-900/10">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto mb-16 max-w-3xl text-center">
							<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								Stop Losing Opportunities to{" "}
								<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
									Bad Photos
								</span>
							</h2>
							<p className="mt-4 text-lg text-muted-foreground leading-relaxed md:text-xl">
								Every day you wait is another day of missed connections,
								overlooked applications, and lost career opportunities. Here's
								what you're competing against:
							</p>
						</div>
						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
								<h3 className="mb-4 font-semibold text-red-600 text-xl">
									❌ What Hurts Your LinkedIn Presence
								</h3>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
										<span>
											Blurry, low-quality selfies that scream "unprofessional"
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
										<span>
											Casual photos that don't match your industry standards
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
										<span>
											Outdated photos that don't represent who you are today
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
										<span>No photo at all (reduces profile views by 90%)</span>
									</li>
								</ul>
							</div>
							<div className="rounded-lg bg-gradient-to-br from-green-50 to-blue-50 p-8 shadow-lg dark:from-green-900/20 dark:to-blue-900/20">
								<h3 className="mb-4 font-semibold text-green-600 text-xl">
									✅ What Gets You Hired
								</h3>
								<ul className="space-y-3 text-muted-foreground">
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
										<span>
											Studio-quality lighting that makes you look confident
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
										<span>
											Professional attire that matches your career level
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
										<span>
											Perfect framing and composition for LinkedIn's format
										</span>
									</li>
									<li className="flex items-start gap-3">
										<div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-500" />
										<span>
											Multiple styles to choose from for different opportunities
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-20 dark:from-slate-900 dark:to-slate-800">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto mb-16 max-w-3xl text-center">
							<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								Why AI Beats{" "}
								<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
									Traditional Photography
								</span>
							</h2>
							<p className="mt-4 text-lg text-muted-foreground leading-relaxed md:text-xl">
								Get professional results without the hassle, cost, and time of
								traditional photo shoots.
							</p>
						</div>
						<div className="grid gap-8 md:grid-cols-3">
							<div className="rounded-lg bg-white p-6 text-center shadow-lg transition-transform hover:scale-105 dark:bg-gray-800">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
									<DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
								</div>
								<h3 className="mb-2 font-semibold text-lg">Save $500-800</h3>
								<p className="text-muted-foreground text-sm">
									Professional photographer sessions cost $300-800 plus travel
									time. Get the same quality for under $50.
								</p>
							</div>
							<div className="rounded-lg bg-white p-6 text-center shadow-lg transition-transform hover:scale-105 dark:bg-gray-800">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
									<Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
								</div>
								<h3 className="mb-2 font-semibold text-lg">
									Ready in 30 Minutes
								</h3>
								<p className="text-muted-foreground text-sm">
									No scheduling, no travel, no waiting weeks for edits. Upload
									photos and get results instantly.
								</p>
							</div>
							<div className="rounded-lg bg-white p-6 text-center shadow-lg transition-transform hover:scale-105 dark:bg-gray-800">
								<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
									<Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
								</div>
								<h3 className="mb-2 font-semibold text-lg">50+ Variations</h3>
								<p className="text-muted-foreground text-sm">
									Get dozens of professional looks and styles to choose from,
									not just one or two shots from a photographer.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="showcase" className="pt-10 md:pt-14">
					<div className="container mx-auto mb-12 px-4 text-center md:px-6">
						<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
							Real Results from{" "}
							<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
								Real Professionals
							</span>
						</h2>
						<p className="mx-auto mt-4 max-w-[700px] text-muted-foreground leading-relaxed md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							See how LookCrafted transforms everyday photos into
							LinkedIn-optimized headshots that help professionals land their
							dream jobs.
						</p>
					</div>
					<ImageShowcaseContainer />
				</section>

				<HowItWorksSection />

				<section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 py-16 text-white md:mt-20 md:py-20">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto max-w-4xl text-center">
							<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								Join 10,000+ Professionals Who{" "}
								<span className="text-yellow-300">
									Transformed Their Careers
								</span>
							</h2>
							<p className="mt-4 text-blue-100 text-lg leading-relaxed md:text-xl">
								See what our customers say about their LinkedIn transformation
								and career breakthroughs.
							</p>
							<div className="mt-12 grid gap-8 md:grid-cols-3">
								<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-105">
									<div className="mb-4 flex justify-center">
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
									</div>
									<p className="mb-4 text-sm italic leading-relaxed">
										"Got 3 interview requests within a week of updating my
										LinkedIn photo. The quality is incredible - looks like I
										spent thousands on a professional shoot."
									</p>
									<p className="font-semibold text-sm">
										Sarah Chen, Marketing Director at Microsoft
									</p>
								</div>
								<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-105">
									<div className="mb-4 flex justify-center">
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
									</div>
									<p className="mb-4 text-sm italic leading-relaxed">
										"My profile views increased by 400% after updating my
										headshot. Recruiters started reaching out immediately. Best
										career investment I've made."
									</p>
									<p className="font-semibold text-sm">
										Michael Rodriguez, Senior Software Engineer
									</p>
								</div>
								<div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm transition-transform hover:scale-105">
									<div className="mb-4 flex justify-center">
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
										<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
									</div>
									<p className="mb-4 text-sm italic leading-relaxed">
										"Landed my dream job at Goldman Sachs. The hiring manager
										mentioned my professional photo made a great first
										impression. Worth every penny!"
									</p>
									<p className="font-semibold text-sm">
										Jessica Park, Investment Banking Analyst
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-20 dark:from-slate-900 dark:to-slate-800">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto mb-16 max-w-3xl text-center">
							<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								LinkedIn Headshot{" "}
								<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
									Best Practices
								</span>{" "}
								(Built Into Our AI)
							</h2>
							<p className="mt-4 text-lg text-muted-foreground leading-relaxed md:text-xl">
								Our AI automatically applies these professional standards to
								ensure your headshots meet LinkedIn's recommendations and exceed
								industry expectations.
							</p>
						</div>
						<div className="grid gap-6 md:grid-cols-2">
							<div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-3 font-semibold text-lg">
									Professional Appearance
								</h3>
								<ul className="space-y-2 text-muted-foreground">
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>
											Business or business-casual attire that matches your
											industry
										</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>
											Clean, well-groomed appearance with professional styling
										</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>
											Confident, approachable expression that builds trust
										</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>Direct eye contact that creates connection</span>
									</li>
								</ul>
							</div>
							<div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
								<h3 className="mb-3 font-semibold text-lg">
									Technical Excellence
								</h3>
								<ul className="space-y-2 text-muted-foreground">
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>
											High resolution (400x400px minimum) for crisp display
										</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>
											Professional studio lighting that flatters your features
										</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>Clean, neutral background that doesn't distract</span>
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
										<span>
											Perfect framing (head and shoulders) for LinkedIn format
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<GuaranteeSection />

				<section id="pricing" className="mt-16 lg:mt-24">
					<div className="container mx-auto px-4 md:px-6">
						<div className="mx-auto mb-12 max-w-3xl text-center">
							<h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
								Invest in Your{" "}
								<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
									Career Today
								</span>
							</h2>
							<p className="mt-4 text-lg text-muted-foreground leading-relaxed md:text-xl">
								Professional headshots that pay for themselves with better
								career opportunities. Start getting noticed by recruiters today.
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
