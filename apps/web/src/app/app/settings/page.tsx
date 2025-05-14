"use client";

import { EyeIcon, KeyIcon, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const settingsTabs = [
	{
		id: "profile",
		label: "Profile",
		icon: UserRound,
	},
	{
		id: "appearance",
		label: "Appearance",
		icon: EyeIcon,
	},
	{
		id: "security",
		label: "Security",
		icon: KeyIcon,
	},
];

export default function SettingsPage() {
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();

	const { data: session, isPending, refetch } = authClient.useSession();
	const [activeTab, setActiveTab] = useState("profile");

	const [formState, setFormState] = useState({
		name: "",
		email: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (session?.user) {
			setFormState((prev) => ({
				...prev,
				name: session.user.name || "",
				email: session.user.email || "",
			}));
		}
	}, [session]);

	const handleProfileSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await authClient.updateUser({
				name: formState.name,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Profile updated successfully");
						refetch();
					},
					onError: (error) => {
						toast.error("Failed to update profile");
						console.error(error);
					},
				},
			});
		} catch (error) {
			toast.error("Failed to update profile");
			console.error(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleSignOut = async () => {
		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						router.push("/");
					},
				},
			});
		} catch (error) {
			toast.error("Failed to sign out");
		}
	};

	if (isPending) {
		return <SettingsSkeleton />;
	}

	if (!session) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4 py-12">
				<h1 className="font-bold text-2xl">Not Authenticated</h1>
				<p className="text-gray-600">
					You need to be signed in to access settings.
				</p>
				<Button onClick={() => router.push("/login")}>Sign In</Button>
			</div>
		);
	}

	const renderTabContent = () => {
		switch (activeTab) {
			case "profile":
				return (
					<>
						<CardHeader className="px-8 pt-8 pb-4">
							<CardTitle className="text-xl">Profile Information</CardTitle>
							<CardDescription>
								Update your personal information.
							</CardDescription>
						</CardHeader>
						<form onSubmit={handleProfileSubmit}>
							<CardContent className="space-y-5 px-8">
								<div className="space-y-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={formState.name}
										onChange={(e) =>
											setFormState({ ...formState, name: e.target.value })
										}
										placeholder="Your name"
										className="max-w-md"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										value={formState.email}
										disabled
										className="max-w-md bg-gray-50"
									/>
									<p className="mt-1 text-gray-500 text-sm">
										Your email address cannot be changed.
									</p>
								</div>
							</CardContent>
							<CardFooter className="px-8 py-6">
								<Button
									type="submit"
									className="bg-gray-900 hover:bg-gray-800"
									disabled={isSubmitting}
								>
									{isSubmitting ? "Saving..." : "Save Changes"}
								</Button>
							</CardFooter>
						</form>
					</>
				);
			case "appearance":
				return (
					<>
						<CardHeader className="px-8 pt-8 pb-4">
							<CardTitle className="text-xl">Appearance</CardTitle>
							<CardDescription>
								Customize how the application looks and behaves.
							</CardDescription>
						</CardHeader>
						<form>
							<CardContent className="space-y-6 px-8">
								<div className="space-y-2">
									<Label htmlFor="theme">Theme</Label>
									<Select
										value={resolvedTheme}
										onValueChange={(value) => setTheme(value)}
									>
										<SelectTrigger className="max-w-md">
											<SelectValue placeholder="Select a theme" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">Light</SelectItem>
											<SelectItem value="dark">Dark</SelectItem>
											<SelectItem value="system">System</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
							<CardFooter className="py-3" />
						</form>
					</>
				);
			case "security":
				return (
					<>
						<CardHeader className="px-8 pt-8 pb-4">
							<CardTitle className="text-xl">Security Settings</CardTitle>
							<CardDescription>
								Manage your account security preferences and authentication
								methods.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-16 px-8 py-6">
							<div>
								<h3 className="font-medium text-xl">Sign Out Everywhere</h3>
								<p className="mt-2 mb-6 text-base text-gray-500">
									Sign out from all devices where you're currently logged in.
								</p>
								<Button
									variant="outline"
									onClick={handleSignOut}
									className="border-gray-200 bg-white hover:bg-gray-50"
								>
									Sign Out Everywhere
								</Button>
							</div>

							<div>
								<h3 className="font-medium text-destructive text-xl">
									Delete Account
								</h3>
								<p className="mt-2 mb-6 text-base text-gray-500">
									Permanently delete your account and all associated data.
								</p>
								<Button
									variant="destructive"
									disabled
									className="bg-red-200 text-red-500 hover:bg-red-300"
								>
									Delete Account
								</Button>
							</div>
						</CardContent>
					</>
				);

			default:
				return null;
		}
	};

	return (
		<>
			<div className="mb-8 space-y-1">
				<h1 className="font-bold text-3xl text-gray-900">Settings</h1>
				<p className="text-gray-600">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0 lg:space-x-12">
				<aside className="md:w-1/4 lg:w-1/5">
					<div className="rounded-lg border bg-white p-4 shadow-sm">
						<div className="mb-2 px-2 font-semibold text-gray-500 text-sm">
							Settings
						</div>
						<nav className="space-y-1">
							{settingsTabs.map((tab) => {
								const Icon = tab.icon;
								const isActive = activeTab === tab.id;

								return (
									<button
										key={tab.id}
										type="button"
										onClick={() => setActiveTab(tab.id)}
										className={cn(
											"flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
											isActive
												? "bg-gray-100 font-medium text-gray-900"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
										)}
									>
										<Icon
											className={cn(
												"mr-2.5 h-5 w-5",
												isActive ? "text-gray-900" : "text-gray-400",
											)}
										/>
										{tab.label}
									</button>
								);
							})}
						</nav>
					</div>
				</aside>

				<div className="flex-1">
					<div className="overflow-hidden rounded-lg border bg-white shadow-sm">
						{renderTabContent()}
					</div>
				</div>
			</div>
		</>
	);
}

function SettingsSkeleton() {
	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<Skeleton className="h-10 w-48" />
				<Skeleton className="h-4 w-64" />
			</div>

			<div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
				<div className="md:w-1/4 lg:w-1/5">
					<div className="rounded-lg border bg-white p-4 shadow-sm">
						<Skeleton className="mb-2 h-4 w-20" />
						<div className="space-y-1">
							{[1, 2, 3].map((i) => (
								<Skeleton key={i} className="h-10 w-full" />
							))}
						</div>
					</div>
				</div>

				<div className="flex-1">
					<div className="space-y-6 rounded-lg border bg-white p-8 shadow-sm">
						<div className="space-y-2">
							<Skeleton className="h-6 w-48" />
							<Skeleton className="h-4 w-96" />
						</div>
						<div className="space-y-2 pt-4">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-10 w-full max-w-md" />
						</div>
						<div className="space-y-2 pt-4">
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-10 w-full max-w-md" />
							<Skeleton className="mt-1 h-4 w-64" />
						</div>
						<div className="border-gray-100 border-t pt-6">
							<Skeleton className="h-10 w-32" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
