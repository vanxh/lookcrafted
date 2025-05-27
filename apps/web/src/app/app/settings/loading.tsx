import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div className="px-4 py-4 sm:px-6">
				<div className="mx-auto max-w-6xl">
					<div className="mb-4 space-y-2 sm:mb-6">
						<Skeleton className="h-7 w-32 bg-gray-200 sm:h-9 sm:w-48 dark:bg-gray-700" />
						<Skeleton className="h-4 w-48 bg-gray-200 sm:h-5 sm:w-64 dark:bg-gray-700" />
					</div>

					<div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0 lg:space-x-8 xl:space-x-12">
						<aside className="md:w-1/4 lg:w-1/5">
							<div className="rounded-2xl border border-gray-200/60 bg-white p-3 shadow-sm sm:p-4 dark:border-gray-700/60 dark:bg-gray-800">
								<Skeleton className="mb-2 h-3 w-16 bg-gray-200 sm:h-4 sm:w-20 dark:bg-gray-700" />
								<div className="space-y-1">
									{[1, 2, 3].map((i) => (
										<Skeleton
											key={i}
											className="h-9 w-full rounded-xl bg-gray-200 sm:h-10 dark:bg-gray-700"
										/>
									))}
								</div>
							</div>
						</aside>

						<div className="flex-1">
							<div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
								<div className="space-y-8 p-4 sm:space-y-10 sm:p-6">
									{[1, 2, 3, 4, 5, 6].map((i) => (
										<div key={i} className="space-y-3 sm:space-y-4">
											<div className="space-y-1 sm:space-y-2">
												<Skeleton className="h-5 w-24 bg-gray-200 sm:h-6 sm:w-32 dark:bg-gray-700" />
												<Skeleton className="h-3 w-36 bg-gray-200 sm:h-4 sm:w-48 dark:bg-gray-700" />
											</div>
											{i === 1 && (
												<div className="flex justify-center py-2 sm:py-4">
													<Skeleton className="h-20 w-20 rounded-full bg-gray-200 sm:h-24 sm:w-24 dark:bg-gray-700" />
												</div>
											)}
											<div className="space-y-2 sm:space-y-3">
												<Skeleton className="h-9 w-full bg-gray-200 sm:h-10 dark:bg-gray-700" />
												{i === 4 && (
													<Skeleton className="h-9 w-full bg-gray-200 sm:h-10 dark:bg-gray-700" />
												)}
											</div>
											{i !== 6 && (
												<div className="flex justify-end pt-1 sm:pt-2">
													<Skeleton className="h-8 w-16 rounded-lg bg-gray-200 sm:h-10 sm:w-20 dark:bg-gray-700" />
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
