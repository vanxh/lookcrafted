"use client";

import { Globe, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navLinks = [
	{ href: "#showcase", label: "Examples" },
	{ href: "#pricing", label: "Pricing" },
	{
		id: "headshots",
		label: "Headshots",
		subItems: [
			{ href: "/headshots/personal", label: "Personal" },
			{ href: "/headshots/teams", label: "For Teams" },
			{ href: "/headshots/examples", label: "Examples" },
		],
	},
];

export function LandingPageHeader() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 w-full border-gray-200 border-b bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 dark:shadow-gray-900/10">
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

					<NavigationMenu className="ml-8 hidden lg:flex" viewport={false}>
						<NavigationMenuList className="space-x-1">
							{navLinks.map((link) =>
								link.subItems ? (
									<NavigationMenuItem key={link.id}>
										<NavigationMenuTrigger className="bg-transparent font-medium text-sm dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
											{link.label}
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid gap-1 p-2 md:w-[300px] lg:w-[220px]">
												{link.subItems.map((subItem) => (
													<li key={subItem.href}>
														<NavigationMenuLink asChild>
															<Link
																href="#pricing"
																className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-800 dark:focus:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100"
															>
																<div className="text-nowrap font-medium text-sm leading-none dark:text-gray-300">
																	{subItem.label}
																</div>
															</Link>
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								) : link.href ? (
									<NavigationMenuItem key={link.href}>
										<Link
											href={link.href}
											className={cn(
												navigationMenuTriggerStyle(),
												"bg-transparent font-medium text-gray-700 text-sm hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
											)}
										>
											{link.label}
										</Link>
									</NavigationMenuItem>
								) : null,
							)}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="sm"
						className="hidden h-9 rounded-full px-4 sm:flex dark:border-gray-700 dark:text-gray-300"
					>
						<Globe className="mr-2 h-4 w-4" />
						EN
					</Button>

					<Button
						className="hidden h-9 rounded-full bg-blue-600 px-5 text-white hover:bg-blue-700 lg:flex dark:bg-blue-700 dark:hover:bg-blue-600"
						asChild
					>
						<Link href="/app">Create your headshots</Link>
					</Button>

					<Button
						variant="ghost"
						size="icon"
						className="rounded-full lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="absolute top-full right-0 left-0 z-50 w-full border-b bg-white p-4 shadow-lg lg:hidden dark:border-gray-800 dark:bg-gray-950 dark:shadow-black/20">
					<nav className="grid gap-2 font-medium text-base">
						{navLinks.map((link) => (
							<Button
								key={link.id || link.href}
								variant="ghost"
								className="w-full justify-start dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
								asChild
							>
								<Link
									href={link.href ?? link.subItems?.[0]?.href ?? "#"}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.label}
								</Link>
							</Button>
						))}
						<hr className="my-2" />
						<Button
							className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
							asChild
						>
							<Link href="/app" onClick={() => setIsMobileMenuOpen(false)}>
								Create your headshots
							</Link>
						</Button>
					</nav>
				</div>
			)}
		</header>
	);
}
