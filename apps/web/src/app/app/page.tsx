"use client";

import { PlusIcon, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function AppPage() {
	const { data: session } = authClient.useSession();
	const [headshots, setHeadshots] = useState<string[]>([]);

	return (
		<>
			<div className="space-y-2">
				<h1 className="font-bold text-3xl text-gray-900">
					AI Headshot Gallery
				</h1>
				<p className="text-gray-600">
					Your AI-generated headshots are stored for 90 days. Download them to
					keep them permanently.
				</p>
			</div>

			<div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="font-semibold text-2xl">
						Get Started with AI Headshots
					</h2>
					<p className="mt-3 text-gray-700">
						Generate studio-quality professional portraits using our AI
						technology. Create your own headshots or set up a team workspace for
						your organization.
					</p>
				</div>

				<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
					<Button
						className="flex items-center gap-2 rounded-md bg-gray-900 px-6 py-2.5 text-white hover:bg-gray-800"
						asChild
					>
						<Link href="/create-headshot">
							<PlusIcon className="h-5 w-5" />
							Generate My Headshots
						</Link>
					</Button>

					<div className="flex items-center justify-center">
						<span className="text-gray-500">OR</span>
					</div>

					<Button
						variant="outline"
						className="flex items-center gap-2 rounded-md border-gray-300 px-6 py-2.5"
						asChild
					>
						<Link href="/app/teams/create">
							<UserRound className="h-5 w-5" />
							Set Up Team
						</Link>
					</Button>
				</div>

				<div className="mx-auto mt-12 max-w-2xl text-center text-gray-500 text-sm">
					<p>
						Looking for previously generated images? Try refreshing the page or
						clearing your browser cache. Contact our support team if you're
						experiencing any issues.
					</p>
				</div>
			</div>

			{headshots.length > 0 ? (
				<div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{headshots.map((headshot, index) => (
						<div
							key={`headshot-${index}-${headshot.split("/").pop()}`}
							className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
						>
							<div className="relative aspect-[3/4]">
								<Image
									src={headshot}
									alt="AI Headshot"
									fill
									style={{ objectFit: "cover" }}
									className="rounded-t-lg"
								/>
							</div>
							<div className="flex items-center justify-between p-4">
								<div>
									<h3 className="font-medium">Portrait {index + 1}</h3>
									<div className="flex items-center text-gray-500 text-sm">
										<span>Generated recently</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : null}
		</>
	);
}
