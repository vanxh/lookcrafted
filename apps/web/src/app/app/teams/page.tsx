"use client";

import { PlusIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function TeamsPage() {
	return (
		<>
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h1 className="font-bold text-3xl">Teams</h1>
					<p className="text-gray-600">Manage your teams and invitations</p>
				</div>
				<Button asChild>
					<Link href="/app/teams/create">
						<PlusIcon className="mr-2 h-4 w-4" />
						Create Team
					</Link>
				</Button>
			</div>

			<div className="mt-10 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
					<div className="rounded-full bg-gray-100 p-4">
						<UsersIcon className="h-8 w-8 text-gray-500" />
					</div>
					<h2 className="font-medium text-xl">No teams yet</h2>
					<p className="max-w-md text-gray-600">
						Create a team to collaborate with your colleagues and manage
						headshots together.
					</p>
					<Button className="mt-4" asChild>
						<Link href="/app/teams/create">
							<PlusIcon className="mr-2 h-4 w-4" />
							Create Your First Team
						</Link>
					</Button>
				</div>
			</div>
		</>
	);
}
