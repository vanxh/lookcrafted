import { Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CallToActionSection() {
	return (
		<section className="mt-10 bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-20 lg:py-24 dark:from-slate-900 dark:to-slate-800">
			<div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6">
				<Sparkles className="mx-auto mb-4 h-10 w-10 text-blue-600" />
				<h2 className="mb-5 font-bold text-3xl text-gray-900 sm:text-5xl xl:text-6xl/none dark:text-white">
					Ready to{" "}
					<span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
						<strong>Transform Your Image?</strong>
					</span>
				</h2>
				<p className="mx-auto mt-2 mb-10 max-w-xl text-muted-foreground leading-relaxed md:text-xl">
					Join thousands creating stunning, professional headshots with
					LookCrafted AI. It's quick, simple, and delivers amazing results.
				</p>
				<Button
					size="lg"
					className="mx-auto w-full max-w-xs rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-transform duration-150 ease-in-out hover:bg-blue-700 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:focus:ring-blue-600 dark:focus:ring-offset-slate-900 dark:hover:bg-blue-600"
					asChild
				>
					<Link href="/app">Create Your Headshots Now</Link>
				</Button>
			</div>
		</section>
	);
}
