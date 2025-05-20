"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
	EyeIcon,
	KeyIcon,
	Laptop,
	Smartphone,
	Tablet,
	UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import Google from "@/components/icons/google";
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
import { default as SettingsSkeleton } from "./loading";

export default function SettingsPage() {
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();

	const { data: session, isPending } = authClient.useSession();
	const [activeSection, setActiveSection] = useState("profile");

	const avatarRef = useRef<HTMLDivElement>(null);
	const passwordRef = useRef<HTMLDivElement>(null);
	const appearanceRef = useRef<HTMLDivElement>(null);

	const sectionRefs = {
		profile: avatarRef,
		appearance: appearanceRef,
		security: passwordRef,
	};

	const [formState, setFormState] = useState({
		name: "",
		email: "",
	});

	const [passwordForm, setPasswordForm] = useState({
		currentPassword: "",
		newPassword: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isChangingPassword, setIsChangingPassword] = useState(false);

	useEffect(() => {
		if (session?.user) {
			setFormState((prev) => ({
				...prev,
				name: session.user.name || "",
				email: session.user.email || "",
			}));
		}
	}, [session]);

	const { data: linkedProviders = [], isLoading: isLoadingProviders } =
		useQuery({
			queryKey: ["linked-providers"],
			queryFn: async () => {
				const linkedProviders = await authClient.listAccounts();

				if (linkedProviders.error) {
					throw new Error(linkedProviders.error.message);
				}

				return linkedProviders.data.map((account) => account.provider);
			},
		});

	const linkAccountMutation = useMutation({
		mutationFn: async (provider: string) => {
			await authClient.linkSocial({
				provider: provider as "google" | "github" | "apple" | "facebook",
				callbackURL: "/app/settings",
			});
		},
		onSuccess: () => {
			toast.success("Account linked successfully");
		},
		onError: (error) => {
			toast.error("Failed to link account");
			console.error(error);
		},
	});

	const unlinkAccountMutation = useMutation({
		mutationFn: async (provider: string) => {
			await authClient.unlinkAccount({
				providerId: provider,
			});
		},
		onSuccess: () => {
			toast.success("Account unlinked successfully");
		},
		onError: (error) => {
			toast.error("Failed to unlink account");
			console.error(error);
		},
	});

	const handleNavigationClick = (sectionId: string) => {
		setActiveSection(sectionId);
		const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
		ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const handleProfileSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await authClient.updateUser({
				name: formState.name,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Profile updated successfully");
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

	const handlePasswordChange = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsChangingPassword(true);

		try {
			await authClient.changePassword({
				currentPassword: passwordForm.currentPassword,
				newPassword: passwordForm.newPassword,
				revokeOtherSessions: true,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Password changed successfully");
						setPasswordForm({
							currentPassword: "",
							newPassword: "",
						});
					},
					onError: (error) => {
						toast.error("Failed to change password");
						console.error(error);
					},
				},
			});
		} catch (error) {
			toast.error("Failed to change password");
			console.error(error);
		} finally {
			setIsChangingPassword(false);
		}
	};

	const handleProviderAction = (provider: string) => {
		const isLinked = linkedProviders.includes(provider);
		if (isLinked) {
			unlinkAccountMutation.mutate(provider);
		} else {
			linkAccountMutation.mutate(provider);
		}
	};

	const {
		data: sessions = [],
		isLoading: isLoadingSessions,
		refetch: refetchSessions,
	} = useQuery({
		queryKey: ["sessions"],
		queryFn: async () => {
			const sessions = await authClient.listSessions();

			if (sessions.error) {
				throw new Error(sessions.error.message);
			}

			const mobileRegex =
				/Mobile|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
			const tabletRegex = /Tablet|iPad|Nexus 7|Nexus 10|KFAPWI/i;

			return sessions.data
				.filter((session) => session.expiresAt > new Date())
				.map((s) => ({
					...s,
					device: s.userAgent
						? mobileRegex.test(s.userAgent)
							? "Mobile"
							: tabletRegex.test(s.userAgent)
								? "Tablet"
								: "Desktop"
						: "Unknown",
				}))
				.sort((a, b) => (a.id === session?.session.id ? -1 : 1));
		},
	});

	const { mutate: revokeSession } = useMutation({
		mutationFn: async (sessionToken: string) => {
			await authClient.revokeSession({
				token: sessionToken,
			});
		},
		onSuccess: () => {
			toast.success("Session revoked successfully");
			refetchSessions();
		},
		onError: (error) => {
			toast.error("Failed to revoke session");
		},
	});

	const { mutate: revokeOtherSessions } = useMutation({
		mutationFn: async () => {
			await authClient.revokeSessions();
		},
		onSuccess: () => {
			toast.success("Other sessions revoked successfully");
			refetchSessions();
		},
		onError: (error) => {
			toast.error("Failed to revoke other sessions");
		},
	});

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

	return (
		<>
			<div className="mb-8 space-y-1">
				<h1 className="font-bold text-3xl text-gray-900">Settings</h1>
				<p className="text-gray-600">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0 lg:space-x-12">
				<aside className="md:sticky md:top-20 md:h-fit md:w-1/4 lg:w-1/5">
					<div className="rounded-lg border bg-white p-4 shadow-sm">
						<div className="mb-2 px-2 font-semibold text-gray-500 text-sm">
							Settings
						</div>
						<nav className="space-y-1">
							<button
								type="button"
								onClick={() => handleNavigationClick("profile")}
								className={cn(
									"flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
									activeSection === "profile"
										? "bg-gray-100 font-medium text-gray-900"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
								)}
							>
								<UserRound
									className={cn(
										"mr-2.5 h-5 w-5",
										activeSection === "profile"
											? "text-gray-900"
											: "text-gray-400",
									)}
								/>
								Profile
							</button>
							{resolvedTheme && (
								<button
									type="button"
									onClick={() => handleNavigationClick("appearance")}
									className={cn(
										"flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
										activeSection === "appearance"
											? "bg-gray-100 font-medium text-gray-900"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
									)}
								>
									<EyeIcon
										className={cn(
											"mr-2.5 h-5 w-5",
											activeSection === "appearance"
												? "text-gray-900"
												: "text-gray-400",
										)}
									/>
									Appearance
								</button>
							)}
							<button
								type="button"
								onClick={() => handleNavigationClick("security")}
								className={cn(
									"flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
									activeSection === "security"
										? "bg-gray-100 font-medium text-gray-900"
										: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
								)}
							>
								<KeyIcon
									className={cn(
										"mr-2.5 h-5 w-5",
										activeSection === "security"
											? "text-gray-900"
											: "text-gray-400",
									)}
								/>
								Security
							</button>
						</nav>
					</div>
				</aside>

				<div className="flex-1">
					<div className="overflow-hidden rounded-lg border bg-white shadow-sm">
						<div className="space-y-10 p-6">
							<div ref={avatarRef}>
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-xl">Avatar</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col items-center px-0 pt-2 pb-6">
									<div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
										{session.user.image ? (
											<img
												src={session.user.image}
												alt={session.user.name || "User avatar"}
												className="h-full w-full object-cover"
											/>
										) : (
											<div className="flex h-full w-full items-center justify-center bg-gray-200 font-medium text-2xl text-gray-600">
												{formState.name.charAt(0) || "?"}
											</div>
										)}
									</div>
								</CardContent>
							</div>

							<div>
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-xl">Name</CardTitle>
									<CardDescription>
										Please enter your full name, or a display name.
									</CardDescription>
								</CardHeader>
								<form onSubmit={handleProfileSubmit}>
									<CardContent className="px-0">
										<Input
											id="name"
											value={formState.name}
											onChange={(e) =>
												setFormState({ ...formState, name: e.target.value })
											}
											placeholder="Your name"
											className="w-full"
										/>
										<p className="mt-2 text-gray-500 text-sm">
											Please use 32 characters at maximum.
										</p>
									</CardContent>
									<CardFooter className="justify-end px-0 py-4">
										<Button
											type="submit"
											className="bg-gray-500 px-8 hover:bg-gray-600"
											disabled={isSubmitting}
										>
											{isSubmitting ? "Saving..." : "Save"}
										</Button>
									</CardFooter>
								</form>
							</div>

							<div>
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-xl">Email</CardTitle>
									<CardDescription>
										Enter the email address you want to use to log in.
									</CardDescription>
								</CardHeader>
								<CardContent className="px-0">
									<Input
										id="email"
										value={formState.email}
										disabled
										className="w-full bg-gray-50"
									/>
									<p className="mt-2 text-gray-500 text-sm">
										Please use a valid email address.
									</p>
								</CardContent>
								<CardFooter className="justify-end px-0 py-4">
									<Button
										type="button"
										className="bg-gray-500 px-8 hover:bg-gray-600"
										disabled
									>
										Save
									</Button>
								</CardFooter>
							</div>

							{resolvedTheme && (
								<div ref={appearanceRef}>
									<CardHeader className="px-0 pt-0 pb-4">
										<CardTitle className="text-xl">Appearance</CardTitle>
										<CardDescription>
											Customize how the application looks.
										</CardDescription>
									</CardHeader>
									<CardContent className="px-0">
										<div className="space-y-2">
											<Label htmlFor="theme">Theme</Label>
											<Select
												value={resolvedTheme}
												onValueChange={(value) => setTheme(value)}
												disabled
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
								</div>
							)}

							<div ref={passwordRef}>
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-xl">Change Password</CardTitle>
									<CardDescription>
										Enter your current password and a new password.
									</CardDescription>
								</CardHeader>
								<form onSubmit={handlePasswordChange}>
									<CardContent className="space-y-4 px-0">
										<div>
											<Label htmlFor="currentPassword">Current Password</Label>
											<Input
												id="currentPassword"
												type="password"
												placeholder="Current Password"
												value={passwordForm.currentPassword}
												onChange={(e) =>
													setPasswordForm({
														...passwordForm,
														currentPassword: e.target.value,
													})
												}
												className="mt-1 w-full"
											/>
										</div>

										<div>
											<Label htmlFor="newPassword">New Password</Label>
											<Input
												id="newPassword"
												type="password"
												placeholder="New Password"
												value={passwordForm.newPassword}
												onChange={(e) =>
													setPasswordForm({
														...passwordForm,
														newPassword: e.target.value,
													})
												}
												className="mt-1 w-full"
											/>
										</div>
										<p className="text-gray-500 text-sm">
											Please use 8 characters at minimum.
										</p>
									</CardContent>
									<CardFooter className="justify-end px-0 py-4">
										<Button
											type="submit"
											className="bg-gray-500 px-8 hover:bg-gray-600"
											disabled={
												isChangingPassword ||
												!passwordForm.currentPassword ||
												!passwordForm.newPassword
											}
										>
											{isChangingPassword ? "Saving..." : "Save"}
										</Button>
									</CardFooter>
								</form>
							</div>

							<div>
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-xl">Providers</CardTitle>
									<CardDescription>
										Connect your account with a third-party service.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-3 px-0">
									<div className="flex items-center justify-between rounded-md border p-3">
										<div className="flex items-center gap-3">
											<Google className="size-4" />
											<span>Google</span>
										</div>
										<Button
											variant="outline"
											className={
												linkedProviders.includes("google")
													? "bg-gray-100 text-gray-900 hover:bg-gray-200"
													: "bg-black text-white hover:bg-gray-800"
											}
											onClick={() => handleProviderAction("google")}
											disabled={
												linkAccountMutation.isPending ||
												unlinkAccountMutation.isPending
											}
										>
											{isLoadingProviders
												? "Loading..."
												: linkedProviders.includes("google")
													? "Unlink"
													: "Link"}
										</Button>
									</div>
								</CardContent>
							</div>

							<div>
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-xl">Sessions</CardTitle>
									<CardDescription>
										Manage your active sessions and revoke access.
									</CardDescription>
								</CardHeader>
								<CardContent className="px-0 pb-6">
									{isLoadingSessions ? (
										<div className="space-y-3">
											{[1, 2].map((i) => (
												<Skeleton key={i} className="h-10 w-full" />
											))}
										</div>
									) : (
										<div className="space-y-4">
											{sessions.map((s) => (
												<div
													key={s.id}
													className="flex items-center justify-between rounded-md border p-3"
												>
													<div className="flex items-center gap-3">
														{s.device === "Mobile" ? (
															<Smartphone className="size-4" />
														) : s.device === "Tablet" ? (
															<Tablet className="size-4" />
														) : (
															<Laptop className="size-4" />
														)}
														<div>
															<div className="flex items-center gap-2">
																<span>
																	{s.id === session.session.id
																		? "Current Session"
																		: "Other Session"}
																</span>
																{s.id === session.session.id && (
																	<span className="rounded bg-green-100 px-2 py-0.5 text-green-800 text-xs">
																		Active
																	</span>
																)}
															</div>
															<p className="text-muted-foreground text-xs">
																Last active:{" "}
																{new Date(s.expiresAt).toLocaleDateString()}
															</p>
														</div>
													</div>
													<Button
														variant="outline"
														onClick={() =>
															s.id === session.session.id
																? handleSignOut()
																: revokeSession(s.token)
														}
														className="text-red-600 hover:bg-red-50 hover:text-red-700"
													>
														{s.id === session.session.id
															? "Sign Out"
															: "Revoke"}
													</Button>
												</div>
											))}

											{sessions.length > 1 && (
												<div className="mt-4 flex justify-end">
													<Button
														variant="outline"
														onClick={() => revokeOtherSessions()}
														className="text-red-600 hover:bg-red-50 hover:text-red-700"
													>
														Revoke All Other Sessions
													</Button>
												</div>
											)}
										</div>
									)}
								</CardContent>
							</div>

							<div>
								<CardHeader className="px-0 pt-0 pb-4">
									<CardTitle className="text-red-600 text-xl">
										Delete Account
									</CardTitle>
									<CardDescription>
										Permanently remove your account and all of its contents.
										This action is not reversible, so please continue with
										caution.
									</CardDescription>
								</CardHeader>
								<CardContent className="flex justify-end px-0 pb-6">
									<Button variant="destructive" disabled className="px-8">
										Delete Account
									</Button>
								</CardContent>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
