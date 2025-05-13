"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateTeamPage() {
	const [teamName, setTeamName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate API call
		setTimeout(() => {
			setIsSubmitting(false);
			// Redirect would happen here after actual API call
		}, 1000);
	};

	return (
		<>
			<div className="mb-6">
				<Button variant="ghost" size="sm" asChild className="mb-6">
					<Link href="/app/teams" className="flex items-center text-gray-600">
						<ArrowLeftIcon className="mr-2 h-4 w-4" />
						Back to Teams
					</Link>
				</Button>

				<h1 className="font-bold text-3xl">Create a New Team</h1>
				<p className="mt-2 text-gray-600">
					Teams allow you to collaborate with colleagues and manage headshots
					together.
				</p>
			</div>

			<div className="mx-auto max-w-lg rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="teamName">Team Name</Label>
						<Input
							id="teamName"
							value={teamName}
							onChange={(e) => setTeamName(e.target.value)}
							placeholder="E.g., Marketing Team"
							required
						/>
						<p className="text-gray-500 text-sm">
							This will be displayed to all team members.
						</p>
					</div>

					<Button
						type="submit"
						className="w-full"
						disabled={!teamName || isSubmitting}
					>
						{isSubmitting ? "Creating..." : "Create Team"}
					</Button>
				</form>
			</div>
		</>
	);
}
