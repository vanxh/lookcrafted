"use client";

import { useQuery } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import {
	ArrowRight,
	Clock,
	PlusIcon,
	Sparkles,
	UserRound,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { capitalizeFirstLetter, formatAgeGroup } from "@lookcrafted/constants";

import { Button } from "@/components/ui/button";
import { orpc } from "@/utils/orpc";
import Loading from "./loading";

export default function AppPage() {
	const { data: headshots, isLoading } = useQuery(
		orpc.headshot.getAll.queryOptions({
			input: {
				includeImages: true,
				includeUploads: true,
			},
		}),
	);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="min-h-screen">
			<div className="px-6 py-6">
				<div className="mx-auto max-w-4xl text-center">
					<div className="mb-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold text-sm text-transparent">
						<Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
						AI-Powered Professional Headshots
					</div>
					<h1 className="mb-4 font-bold text-4xl text-gray-900 leading-tight md:text-5xl dark:text-white">
						Your AI Headshot
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							{" "}
							Gallery
						</span>
					</h1>
					<p className="mx-auto max-w-2xl text-gray-600 text-lg dark:text-gray-300">
						Studio-quality professional portraits generated with cutting-edge AI
						technology. Your headshots are stored securely for 90 days.
					</p>
				</div>
			</div>

			<div className="px-6 pb-12">
				<div className="mx-auto max-w-6xl">
					<div className="mb-12 grid gap-6 md:grid-cols-2">
						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-8 text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:shadow-2xl">
							<div className="relative">
								<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
									<PlusIcon className="h-6 w-6" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Generate My Headshots
								</h3>
								<p className="mb-6 text-blue-100">
									Create professional AI headshots in minutes. Upload your
									photos and let our AI do the magic.
								</p>
								<Button
									className="bg-white font-semibold text-blue-600 transition-transform hover:bg-blue-50"
									asChild
								>
									<Link
										href="/create-headshot"
										className="flex items-center gap-2"
									>
										Get Started
										<ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>

						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 p-8 text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:shadow-2xl">
							<div className="relative">
								<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
									<Users className="h-6 w-6" />
								</div>
								<h3 className="mb-2 font-semibold text-xl">
									Set Up Team Workspace
								</h3>
								<p className="mb-6 text-purple-100">
									Manage headshots for your entire organization. Perfect for
									companies and teams.
								</p>
								<Button
									className="bg-white font-semibold text-purple-600 transition-transform hover:bg-purple-50"
									asChild
								>
									<Link href="/app/teams" className="flex items-center gap-2">
										Setup Team
										<ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>
					</div>

					{headshots?.length && headshots.length > 0 ? (
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h2 className="font-semibold text-2xl text-gray-900 dark:text-white">
									Your Headshots
								</h2>
								<div className="text-gray-500 text-sm dark:text-gray-400">
									{headshots.length}{" "}
									{headshots.length === 1 ? "headshot" : "headshots"}
								</div>
							</div>

							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
								{headshots?.map((headshot) => (
									<Link
										key={headshot.id}
										href={
											headshot.status === "unpaid"
												? `/create-headshot?id=${headshot.id}&step=12`
												: `/app/headshots/${headshot.id}`
										}
										className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-blue-200 hover:shadow-xl dark:border-gray-700/60 dark:bg-gray-800 dark:hover:border-blue-400 dark:hover:shadow-2xl"
									>
										<div className="absolute top-4 right-4 z-10">
											<span
												className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium text-xs ${
													headshot.status === "completed"
														? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
														: headshot.status === "unpaid"
															? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
															: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
												}`}
											>
												{capitalizeFirstLetter(headshot.status)}
											</span>
										</div>

										<div className="p-6">
											<div className="mb-6 flex justify-center">
												<div className="relative">
													{headshot.images && headshot.images.length > 0 ? (
														<div className="relative h-24 w-24 overflow-hidden rounded-2xl shadow-lg ring-4 ring-white transition-shadow group-hover:shadow-xl dark:ring-gray-800">
															<Image
																src={(
																	headshot.images.find(
																		(img) => img.isFavorite,
																	) || headshot.images[0]
																).imageUrl.replace("public", "portrait")}
																alt={`${capitalizeFirstLetter(headshot.gender)} ${formatAgeGroup(headshot.ageGroup)} headshot`}
																fill
																className="object-cover"
																sizes="96px"
															/>
														</div>
													) : (
														<div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg ring-4 ring-white transition-shadow group-hover:shadow-xl dark:from-blue-900/30 dark:to-purple-900/30 dark:ring-gray-800">
															<UserRound className="h-12 w-12 text-blue-600 dark:text-blue-400" />
														</div>
													)}
													{headshot.status === "completed" && (
														<div className="-bottom-1 -right-1 absolute flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shadow-sm ring-2 ring-white dark:ring-gray-800">
															<div className="h-2.5 w-2.5 rounded-full bg-white" />
														</div>
													)}
												</div>
											</div>

											<div className="space-y-3 text-center">
												<h3 className="font-semibold text-gray-900 text-lg dark:text-white">
													{capitalizeFirstLetter(headshot.gender)}{" "}
													{formatAgeGroup(headshot.ageGroup)}
												</h3>

												<div className="flex items-center justify-center gap-1 text-gray-500 text-sm dark:text-gray-400">
													<Clock className="h-3.5 w-3.5" />
													<span>
														{formatDistance(
															new Date(headshot.createdAt),
															new Date(),
															{
																addSuffix: true,
															},
														)}
													</span>
												</div>

												{headshot.status === "completed" &&
													headshot.images &&
													headshot.images.length > 0 && (
														<div className="text-gray-500 text-xs dark:text-gray-400">
															{headshot.images.length}{" "}
															{headshot.images.length === 1
																? "image"
																: "images"}
															{headshot.images.filter((img) => img.isFavorite)
																.length > 0 && (
																<span className="ml-1">
																	•{" "}
																	{
																		headshot.images.filter(
																			(img) => img.isFavorite,
																		).length
																	}{" "}
																	favorited
																</span>
															)}
														</div>
													)}
											</div>
										</div>

										<div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-blue-400/10" />
									</Link>
								))}
							</div>
						</div>
					) : (
						<div className="py-12 text-center">
							<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
								<UserRound className="h-8 w-8 text-gray-400 dark:text-gray-500" />
							</div>
							<h3 className="mb-2 font-medium text-gray-900 text-lg dark:text-white">
								No headshots yet
							</h3>
							<p className="mb-6 text-gray-500 dark:text-gray-400">
								Get started by generating your first AI headshot
							</p>
							<Button asChild>
								<Link href="/create-headshot">Create Your First Headshot</Link>
							</Button>
						</div>
					)}

					<div className="mt-16 text-center">
						<div className="inline-flex items-center gap-2 text-gray-500 text-sm dark:text-gray-400">
							<span>Need help?</span>
							<Link
								href="/contact"
								className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
							>
								Contact Support
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
