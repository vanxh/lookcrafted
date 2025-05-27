import { HelpCircle, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";

function UserMenuContent() {
	const router = useRouter();
	const { data: session } = authClient.useSession();

	if (!session) {
		return (
			<Button variant="outline" asChild>
				<Link href="/login">Sign In</Link>
			</Button>
		);
	}

	const initials =
		session.user.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase() || "U";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
					<Avatar>
						<AvatarImage
							src={session.user.image || ""}
							alt={session.user.name || "User"}
						/>
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-64 rounded-2xl border border-gray-200/50 bg-white/95 p-4 shadow-xl backdrop-blur-sm"
			>
				<div className="mb-4 flex items-center space-x-3">
					<Avatar className="h-12 w-12 ring-2 ring-blue-500/20">
						<AvatarImage
							src={session.user.image || ""}
							alt={session.user.name || "User"}
						/>
						<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-sm text-white">
							{initials}
						</AvatarFallback>
					</Avatar>

					<div className="min-w-0 flex-1">
						<h3 className="truncate font-semibold text-base text-gray-900">
							{session.user.name || "User"}
						</h3>
						<p className="truncate text-gray-500 text-sm">
							{session.user.email}
						</p>
					</div>
				</div>

				<div className="space-y-1">
					<DropdownMenuItem
						asChild
						className="rounded-lg p-2.5 transition-colors hover:bg-gray-50"
					>
						<Link href="/app" className="flex cursor-pointer items-center">
							<div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
								<LayoutDashboard className="h-4 w-4 text-gray-600" />
							</div>
							<span className="font-medium text-gray-700 text-sm">
								Dashboard
							</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem
						asChild
						className="rounded-lg p-2.5 transition-colors hover:bg-gray-50"
					>
						<Link
							href="/app/settings"
							className="flex cursor-pointer items-center"
						>
							<div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
								<Settings className="h-4 w-4 text-gray-600" />
							</div>
							<span className="font-medium text-gray-700 text-sm">
								Settings
							</span>
						</Link>
					</DropdownMenuItem>
				</div>

				<DropdownMenuSeparator className="my-3 bg-gray-200" />

				<div className="space-y-1">
					<DropdownMenuItem
						asChild
						className="rounded-lg p-2.5 transition-colors hover:bg-gray-50"
					>
						<Link href="/contact" className="flex cursor-pointer items-center">
							<div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
								<HelpCircle className="h-4 w-4 text-gray-600" />
							</div>
							<span className="font-medium text-gray-700 text-sm">Support</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem
						className="cursor-pointer rounded-lg p-2.5 text-red-600 transition-colors hover:bg-red-50 focus:text-red-600"
						onClick={() => {
							authClient.signOut({
								fetchOptions: {
									onSuccess: () => {
										router.push("/");
									},
								},
							});
						}}
					>
						<div className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-red-100">
							<LogOut className="h-4 w-4 text-red-600" />
						</div>
						<span className="font-medium text-sm">Sign out</span>
					</DropdownMenuItem>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function UserMenuFallback() {
	return <Skeleton className="h-10 w-10 rounded-full" />;
}

export default function UserMenu() {
	return (
		<Suspense fallback={<UserMenuFallback />}>
			<UserMenuContent />
		</Suspense>
	);
}
