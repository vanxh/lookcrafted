"use client";

import { CogIcon, CreditCardIcon, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
	const { data: session } = authClient.useSession();
	const [name, setName] = useState(session?.user?.name || "");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			// Success notification would happen here
		}, 1000);
	};

	return (
		<>
			<div className="space-y-1">
				<h1 className="font-bold text-3xl">Settings</h1>
				<p className="text-gray-600">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
				<div className="space-y-1">
					<div className="overflow-hidden rounded-lg border border-gray-200">
						<div className="bg-gray-50 p-4 font-medium">Settings</div>
						<div className="divide-y divide-gray-200">
							<a
								href="#profile"
								className="flex items-center px-4 py-3 text-sm hover:bg-gray-50"
							>
								<UserRound className="mr-3 h-4 w-4 text-gray-500" />
								Profile
							</a>
							<a
								href="#billing"
								className="flex items-center px-4 py-3 text-sm hover:bg-gray-50"
							>
								<CreditCardIcon className="mr-3 h-4 w-4 text-gray-500" />
								Billing
							</a>
							<a
								href="#preferences"
								className="flex items-center px-4 py-3 text-sm hover:bg-gray-50"
							>
								<CogIcon className="mr-3 h-4 w-4 text-gray-500" />
								Preferences
							</a>
						</div>
					</div>
				</div>

				<div>
					<div
						id="profile"
						className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
					>
						<h2 className="mb-4 font-semibold text-xl">Profile</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Your name"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									value={session?.user?.email || ""}
									disabled
									className="bg-gray-50"
								/>
								<p className="text-gray-500 text-sm">
									Your email cannot be changed.
								</p>
							</div>

							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Saving..." : "Save Changes"}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
