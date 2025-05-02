"use client";

import { Globe, Menu } from "lucide-react";
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
	{ href: "/pricing", label: "Pricing" },
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
		<header className="sticky top-0 z-[51] border-b bg-background">
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				<NavigationMenu className="hidden lg:flex" viewport={false}>
					<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuLink
								className={cn(
									navigationMenuTriggerStyle(),
									"!font-semibold flex items-center gap-2 bg-transparent text-lg hover:bg-transparent focus:bg-transparent md:text-base",
								)}
								asChild
							>
								<Link href="/">
									<span className="font-bold">LookCrafted</span>
								</Link>
							</NavigationMenuLink>
						</NavigationMenuItem>

						{navLinks.map((link) =>
							link.subItems ? (
								<NavigationMenuItem key={link.id}>
									<NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-1 md:w-[400px] lg:w-[200px]">
											{link.subItems.map((subItem) => (
												<li key={subItem.href}>
													<NavigationMenuLink asChild>
														<Link
															href={subItem.href}
															className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
														>
															<div className="font-medium text-sm leading-none">
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
									<NavigationMenuLink
										asChild
										className={navigationMenuTriggerStyle()}
									>
										<Link href={link.href}>{link.label}</Link>
									</NavigationMenuLink>
								</NavigationMenuItem>
							) : null,
						)}
					</NavigationMenuList>
				</NavigationMenu>

				<Link
					href="/"
					className="flex items-center gap-2 font-semibold text-lg md:text-base lg:hidden"
				>
					<span className="font-bold">LookCrafted</span>
				</Link>

				<div className="flex items-center gap-2 md:gap-4">
					<Button variant="outline" className="hidden sm:flex">
						<Globe className="mr-2 h-4 w-4" />
						EN
					</Button>
					<Button variant="ghost" asChild className="hidden lg:flex">
						<Link href="/login">Log in</Link>
					</Button>
					<Button
						className="hidden bg-orange-500 text-white hover:bg-orange-600 lg:flex"
						asChild
					>
						<Link href="/get-started">Create your headshots</Link>
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="rounded-full lg:hidden"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="absolute top-full right-0 left-0 z-50 w-full border-b bg-background p-4 shadow-lg lg:hidden">
					<nav className="grid gap-2 font-medium text-base">
						{navLinks.map((link) => (
							<Button
								key={link.id || link.href}
								variant="ghost"
								className="w-full justify-start"
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
						<Button variant="ghost" className="w-full justify-start" asChild>
							<Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
								Log in
							</Link>
						</Button>
						<Button
							className="w-full bg-orange-500 text-white hover:bg-orange-600"
							asChild
						>
							<Link
								href="/get-started"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Create your headshots
							</Link>
						</Button>
					</nav>
				</div>
			)}
		</header>
	);
}
