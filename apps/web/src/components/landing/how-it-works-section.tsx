import Image from "next/image";

import step1 from "@/public/step-1.webp";
import step2 from "@/public/step-2.webp";
import step3 from "@/public/step-3.webp";

export function HowItWorksSection() {
	const steps = [
		{
			id: "upload",
			number: "01",
			title: "Upload Your Selfies",
			description:
				"Gather 8-15 clear photos. Variety in angles, expressions, and backgrounds helps our AI create diverse, high-quality headshots.",
			imageUrl: step1,
			imageAlt:
				"A grid of diverse selfie uploads illustrating the first step of the headshot generation process.",
		},
		{
			id: "ai-crafts",
			number: "02",
			title: "AI Crafts Your Headshots",
			description:
				"Our advanced AI analyzes your features and generates a wide range of professional headshot styles. Sit back and relax!",
			imageUrl: step2,
			imageAlt:
				"An abstract visual representing AI processing or style selection for headshots.",
		},
		{
			id: "download",
			number: "03",
			title: "Download & Shine",
			description:
				"In minutes, your new headshots are ready! Download your favorites, share them, and elevate your professional image instantly.",
			imageUrl: step3,
			imageAlt:
				"A gallery display of professionally generated AI headshots ready for download.",
		},
	];

	return (
		<section className="mt-16 bg-white lg:mt-24 dark:bg-slate-950">
			<div className="container mx-auto px-4 md:px-6">
				<div className="mb-12 text-center md:mb-16 lg:mb-20">
					<h2 className="font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl md:text-5xl dark:text-white">
						Get Your AI Headshots in 3 Simple Steps
					</h2>
					<p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground md:mt-4 md:text-xl">
						Transforming your look has never been easier. Here's how LookCrafted
						works:
					</p>
				</div>

				<div className="space-y-16">
					{steps.map((step, index) => (
						<div
							key={step.id}
							className={`flex flex-col items-center gap-8 md:gap-12 lg:gap-16 ${index === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
						>
							<div className="w-full flex-shrink-0 md:w-1/2 lg:w-5/12">
								<div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
									<Image
										src={step.imageUrl}
										alt={step.imageAlt}
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 50vw"
										priority
									/>
								</div>
							</div>
							<div className="w-full md:w-1/2 lg:w-7/12">
								<div
									className={`${index === 1 ? "md:pr-8 lg:pr-12" : "md:pl-8 lg:pl-12"}`}
								>
									<p className="mb-2 font-bold text-3xl text-blue-600 md:text-4xl dark:text-blue-500">
										{step.number}.
									</p>
									<h3 className="mb-3 font-bold text-2xl text-gray-900 md:text-3xl dark:text-white">
										{step.title}
									</h3>
									<p className="text-base text-muted-foreground leading-relaxed lg:text-lg">
										{step.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
