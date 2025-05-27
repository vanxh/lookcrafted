"use client";

import { Crown, PlusIcon, Shield, Users, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TeamsPage() {
	return (
		<div className="min-h-screen">
			<div className="px-6 py-4">
				<div className="mx-auto max-w-6xl">
					{/* Header */}
					<div className="mb-6 flex items-center justify-between">
						<div className="space-y-2">
							<h1 className="font-bold text-3xl text-gray-900 dark:text-white">
								Teams
							</h1>
							<p className="text-gray-600 dark:text-gray-300">
								Manage your teams and collaborate on headshots
							</p>
						</div>
						<Button
							disabled
							className="cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
						>
							<PlusIcon className="mr-2 h-4 w-4" />
							Create Team
						</Button>
					</div>

					{/* Coming Soon Banner */}
					<div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
								<Crown className="h-6 w-6" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">
									Team Features Coming Soon
								</h3>
								<p className="text-blue-100">
									Advanced collaboration tools are currently in development
								</p>
							</div>
						</div>
					</div>

					{/* Feature Preview Cards */}
					<div className="mb-12 grid gap-6 md:grid-cols-3">
						<div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
							<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
								<Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
							</div>
							<h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
								Team Collaboration
							</h3>
							<p className="text-gray-600 text-sm dark:text-gray-300">
								Invite team members and manage headshots together in shared
								workspaces.
							</p>
						</div>

						<div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
							<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
								<Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
							</div>
							<h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
								Role Management
							</h3>
							<p className="text-gray-600 text-sm dark:text-gray-300">
								Assign different roles and permissions to control access and
								editing rights.
							</p>
						</div>

						<div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
							<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
								<UsersIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
							</div>
							<h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-white">
								Bulk Operations
							</h3>
							<p className="text-gray-600 text-sm dark:text-gray-300">
								Generate and manage multiple headshots efficiently for your
								entire team.
							</p>
						</div>
					</div>

					{/* Main Empty State */}
					<div className="rounded-2xl border border-gray-200/60 bg-white p-12 text-center shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
						<div className="mx-auto max-w-md">
							<div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
								<UsersIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
							</div>
							<h2 className="mb-3 font-semibold text-2xl text-gray-900 dark:text-white">
								No teams yet
							</h2>
							<p className="mb-8 text-gray-600 leading-relaxed dark:text-gray-300">
								Team features are currently in development. Soon you'll be able
								to create teams, invite colleagues, and collaborate on headshots
								together.
							</p>
							<div className="space-y-4">
								<Button
									disabled
									className="cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
								>
									<PlusIcon className="mr-2 h-4 w-4" />
									Create Your First Team
								</Button>
								<p className="text-gray-500 text-sm dark:text-gray-400">
									Want to be notified when teams are available?{" "}
									<a
										href="/contact"
										className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
									>
										Contact us
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
