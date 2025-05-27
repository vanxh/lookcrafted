import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
	id: `loading-skeleton-${i}`,
}));

export default function Loading() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div className="px-6 py-6">
				<div className="mx-auto max-w-4xl text-center">
					<Skeleton className="mx-auto mb-4 h-5 w-64 bg-gray-200 dark:bg-gray-700" />
					<Skeleton className="mx-auto mb-4 h-12 w-96 bg-gray-200 dark:bg-gray-700" />
					<Skeleton className="mx-auto h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-700" />
				</div>
			</div>

			<div className="px-6 pb-12">
				<div className="mx-auto max-w-6xl">
					<div className="mb-12 grid gap-6 md:grid-cols-2">
						<div className="rounded-2xl border border-gray-200/60 bg-white p-8 shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
							<Skeleton className="mb-4 h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
							<Skeleton className="mb-2 h-6 w-48 bg-gray-200 dark:bg-gray-700" />
							<Skeleton className="mb-6 h-16 w-full bg-gray-200 dark:bg-gray-700" />
							<Skeleton className="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
						</div>

						<div className="rounded-2xl border border-gray-200/60 bg-white p-8 shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
							<Skeleton className="mb-4 h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
							<Skeleton className="mb-2 h-6 w-48 bg-gray-200 dark:bg-gray-700" />
							<Skeleton className="mb-6 h-16 w-full bg-gray-200 dark:bg-gray-700" />
							<Skeleton className="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
						</div>
					</div>

					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<Skeleton className="h-8 w-48 bg-gray-200 dark:bg-gray-700" />
							<Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
						</div>

						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{SKELETON_ITEMS.map((item) => (
								<div
									key={item.id}
									className="rounded-2xl border border-gray-200/60 bg-white shadow-sm dark:border-gray-700/60 dark:bg-gray-800"
								>
									<div className="relative">
										<div className="absolute top-4 right-4 z-10">
											<Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
										</div>

										<div className="p-6">
											<div className="mb-6 flex justify-center">
												<Skeleton className="h-24 w-24 rounded-2xl bg-gray-200 dark:bg-gray-700" />
											</div>

											<div className="space-y-3 text-center">
												<Skeleton className="mx-auto h-6 w-32 bg-gray-200 dark:bg-gray-700" />
												<Skeleton className="mx-auto h-4 w-24 bg-gray-200 dark:bg-gray-700" />
												<Skeleton className="mx-auto h-3 w-20 bg-gray-200 dark:bg-gray-700" />
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
