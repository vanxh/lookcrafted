import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import Example1After from "@/public/example-1.webp";
import {
	default as Example2After,
	default as Example5After,
} from "@/public/example-2.webp";
import {
	default as Example3After,
	default as Example6After,
} from "@/public/example-3.webp";
import Example4After from "@/public/example-4.webp";

const exampleImages = [
	{ src: Example1After, alt: "Example AI Headshot 1" },
	{ src: Example2After, alt: "Example AI Headshot 2" },
	{ src: Example3After, alt: "Example AI Headshot 3" },
	{ src: Example4After, alt: "Example AI Headshot 4" },
	{ src: Example5After, alt: "Example AI Headshot 5" },
	{ src: Example6After, alt: "Example AI Headshot 6" },
];

export function LoginBranding() {
	return (
		<div className="flex h-full flex-col bg-zinc-100 p-8 text-zinc-900 lg:p-10 xl:p-12 dark:bg-zinc-900 dark:text-white">
			<div className="flex-grow">
				<div className="mb-12">
					<h1 className="mb-4 font-bold text-3xl md:text-4xl lg:text-5xl">
						Professional Headshots,
						<br />
						Effortlessly Generated.
					</h1>
					<ul className="space-y-2 text-zinc-800 dark:text-zinc-300">
						<li className="flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
							Studio-quality results in minutes
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
							100+ unique styles & backgrounds
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
							Perfect for LinkedIn, resumes & more
						</li>
					</ul>
				</div>

				<div className="mt-8 grid grid-cols-3 gap-4">
					{exampleImages.map((image) => (
						<Image
							key={image.alt}
							src={image.src}
							alt={image.alt}
							width={300}
							height={400}
							className="min-h-full rounded-lg object-cover shadow-lg"
						/>
					))}
				</div>
			</div>

			<footer className="mt-auto pt-8 text-center text-sm text-zinc-600 dark:text-zinc-500">
				© {new Date().getFullYear()} LookCrafted. All rights reserved.
			</footer>
		</div>
	);
}
