import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
	id: `loading-skeleton-${i}`,
}));

export default function Loading() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div className="px-4 py-4 sm:px-6">
				<div className="mx-auto max-w-4xl text-center">
					<Skeleton className="mx-auto mb-3 h-4 w-48 bg-gray-200 sm:mb-4 sm:h-5 sm:w-64 dark:bg-gray-700" />
					<Skeleton className="mx-auto mb-3 h-8 w-72 bg-gray-200 sm:mb-4 sm:h-12 sm:w-96 dark:bg-gray-700" />
					<Skeleton className="mx-auto h-5 w-full max-w-lg bg-gray-200 sm:h-6 sm:max-w-2xl dark:bg-gray-700" />
				</div>
			</div>

			<div className="px-4 pb-8 sm:px-6 sm:pb-12">
				<div className="mx-auto max-w-6xl">
					<div className="mb-8 grid gap-4 sm:gap-6 md:grid-cols-2">
						<div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-700/60 dark:bg-gray-800">
							<Skeleton className="mb-3 h-10 w-10 rounded-xl bg-gray-200 sm:mb-4 sm:h-12 sm:w-12 dark:bg-gray-700" />
							<Skeleton className="mb-2 h-5 w-36 bg-gray-200 sm:h-6 sm:w-48 dark:bg-gray-700" />
							<Skeleton className="mb-4 h-12 w-full bg-gray-200 sm:mb-6 sm:h-16 dark:bg-gray-700" />
							<Skeleton className="h-9 w-24 rounded-lg bg-gray-200 sm:h-10 sm:w-32 dark:bg-gray-700" />
						</div>

						<div className="rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-700/60 dark:bg-gray-800">
							<Skeleton className="mb-3 h-10 w-10 rounded-xl bg-gray-200 sm:mb-4 sm:h-12 sm:w-12 dark:bg-gray-700" />
							<Skeleton className="mb-2 h-5 w-36 bg-gray-200 sm:h-6 sm:w-48 dark:bg-gray-700" />
							<Skeleton className="mb-4 h-12 w-full bg-gray-200 sm:mb-6 sm:h-16 dark:bg-gray-700" />
							<Skeleton className="h-9 w-24 rounded-lg bg-gray-200 sm:h-10 sm:w-32 dark:bg-gray-700" />
						</div>
					</div>

					<div className="space-y-4 sm:space-y-6">
						<div className="flex items-center justify-between">
							<Skeleton className="h-6 w-36 bg-gray-200 sm:h-8 sm:w-48 dark:bg-gray-700" />
							<Skeleton className="h-4 w-16 bg-gray-200 sm:h-5 sm:w-24 dark:bg-gray-700" />
						</div>

						<div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
							{SKELETON_ITEMS.map((item) => (
								<div
									key={item.id}
									className="rounded-2xl border border-gray-200/60 bg-white shadow-sm dark:border-gray-700/60 dark:bg-gray-800"
								>
									<div className="relative">
										<div className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4">
											<Skeleton className="h-5 w-12 rounded-full bg-gray-200 sm:h-6 sm:w-16 dark:bg-gray-700" />
										</div>

										<div className="p-4 sm:p-6">
											<div className="mb-4 flex justify-center sm:mb-6">
												<Skeleton className="h-20 w-20 rounded-2xl bg-gray-200 sm:h-24 sm:w-24 dark:bg-gray-700" />
											</div>

											<div className="space-y-2 text-center sm:space-y-3">
												<Skeleton className="mx-auto h-5 w-24 bg-gray-200 sm:h-6 sm:w-32 dark:bg-gray-700" />
												<Skeleton className="mx-auto h-3 w-16 bg-gray-200 sm:h-4 sm:w-24 dark:bg-gray-700" />
												<Skeleton className="mx-auto h-3 w-12 bg-gray-200 sm:w-20 dark:bg-gray-700" />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
