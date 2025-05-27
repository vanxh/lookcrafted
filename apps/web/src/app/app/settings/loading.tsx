import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-900">
			<div className="px-6 py-4">
				<div className="mx-auto max-w-6xl">
					<div className="mb-6 space-y-2">
						<Skeleton className="h-9 w-48 bg-gray-200 dark:bg-gray-700" />
						<Skeleton className="h-5 w-64 bg-gray-200 dark:bg-gray-700" />
					</div>

					<div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0 lg:space-x-12">
						<aside className="md:w-1/4 lg:w-1/5">
							<div className="rounded-2xl border border-gray-200/60 bg-white p-4 shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
								<Skeleton className="mb-2 h-4 w-20 bg-gray-200 dark:bg-gray-700" />
								<div className="space-y-1">
									{[1, 2, 3].map((i) => (
										<Skeleton
											key={i}
											className="h-10 w-full rounded-xl bg-gray-200 dark:bg-gray-700"
										/>
									))}
								</div>
							</div>
						</aside>

						<div className="flex-1">
							<div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm dark:border-gray-700/60 dark:bg-gray-800">
								<div className="space-y-10 p-6">
									{[1, 2, 3, 4, 5, 6].map((i) => (
										<div key={i} className="space-y-4">
											<div className="space-y-2">
												<Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
												<Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
											</div>
											{i === 1 && (
												<div className="flex justify-center py-4">
													<Skeleton className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
												</div>
											)}
											<div className="space-y-3">
												<Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
												{i === 4 && (
													<Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
												)}
											</div>
											{i !== 6 && (
												<div className="flex justify-end pt-2">
													<Skeleton className="h-10 w-20 rounded-lg bg-gray-200 dark:bg-gray-700" />
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
