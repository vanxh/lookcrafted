"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { orpc } from "@/utils/orpc";

export function LandingPageFooter() {
	const { status: queryStatus } = useQuery(orpc.healthCheck.queryOptions());

	const getStatusIndicator = () => {
		let color = "bg-gray-400";
		let text = "Checking...";
		let ping = false;

		if (queryStatus === "success") {
			color = "bg-green-500";
			text = "Online";
			ping = true;
		} else if (queryStatus === "error") {
			color = "bg-red-500";
			text = "Offline";
		} else if (queryStatus === "pending") {
			color = "bg-gray-400";
			text = "Checking...";
		}

		return (
			<div className="flex items-center gap-2">
				<span className="text-muted-foreground text-xs">Server Status:</span>
				<span className="relative flex h-3 w-3">
					{ping && (
						<span
							className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`}
						/>
					)}
					<span
						className={`relative inline-flex h-3 w-3 rounded-full ${color}`}
					/>
				</span>
				<span className="text-muted-foreground text-xs">{text}</span>
			</div>
		);
	};

	return (
		<footer className="border-t bg-background py-6">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:items-center md:px-6">
				<div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
					<p className="text-muted-foreground text-sm">
						© {new Date().getFullYear()} LookCrafted. All rights reserved.
					</p>
					{getStatusIndicator()}
				</div>
				<nav className="flex gap-4 sm:gap-6">
					<Link
						href="/terms"
						className="text-muted-foreground text-sm transition-colors hover:text-foreground"
						prefetch={false}
					>
						Terms of Service
					</Link>
					<Link
						href="/privacy"
						className="text-muted-foreground text-sm transition-colors hover:text-foreground"
						prefetch={false}
					>
						Privacy Policy
					</Link>
				</nav>
			</div>
		</footer>
	);
}
