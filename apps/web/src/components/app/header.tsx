"use client";

import { CogIcon, HomeIcon, Menu, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import UserMenu from "@/components/user-menu";
import { cn } from "@/lib/utils";

const appLinks = [
	{
		name: "Dashboard",
		href: "/app",
		icon: HomeIcon,
		description: "View your headshots and create new ones",
	},
	{
		name: "Teams",
		href: "/app/teams",
		icon: UsersIcon,
		description: "Manage your teams and invitations",
	},
	{
		name: "Settings",
		href: "/app/settings",
		icon: CogIcon,
		description: "Configure your account settings",
	},
];

export function AppHeader() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 w-full border-gray-200 border-b bg-white dark:border-gray-800 dark:bg-gray-950">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center">
					<Link href="/" className="flex items-center gap-2">
						<Image
							src="/logo.png"
							alt="LookCrafted"
							width={38}
							height={38}
							className="rounded-md"
						/>
						<span className="font-semibold text-xl dark:text-white">
							LookCrafted
						</span>
					</Link>

					<nav className="ml-8 hidden space-x-4 md:flex">
						{appLinks.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"flex items-center rounded-md px-3 py-2 font-medium text-sm transition-colors",
										isActive
											? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
											: "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
									)}
									aria-current={isActive ? "page" : undefined}
								>
									<Icon className="mr-2 h-4 w-4" />
									{item.name}
								</Link>
							);
						})}
					</nav>
				</div>

				<div className="flex items-center gap-2">
					<UserMenu />

					<Button
						variant="ghost"
						size="icon"
						className="rounded-full md:hidden dark:text-gray-200 dark:hover:bg-gray-800"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="absolute top-full right-0 left-0 z-50 w-full border-b bg-white p-4 shadow-lg md:hidden dark:border-gray-800 dark:bg-gray-950 dark:shadow-black/20">
					<nav className="grid gap-2 font-medium text-base">
						{appLinks.map((item) => {
							const Icon = item.icon;
							const isActive = pathname === item.href;

							return (
								<Button
									key={item.name}
									variant="ghost"
									className={cn(
										"w-full justify-start dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
										isActive &&
											"bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
									)}
									asChild
								>
									<Link
										href={item.href}
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<Icon className="mr-2 h-4 w-4" />
										{item.name}
									</Link>
								</Button>
							);
						})}
					</nav>
				</div>
			)}
		</header>
	);
}
