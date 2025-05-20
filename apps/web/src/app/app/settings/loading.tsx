import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<Skeleton className="h-10 w-48" />
				<Skeleton className="h-4 w-64" />
			</div>

			<div className="flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
				<div className="md:w-1/4 lg:w-1/5">
					<div className="rounded-lg border bg-white p-4 shadow-sm">
						<Skeleton className="mb-2 h-4 w-20" />
						<div className="space-y-1">
							{[1, 2, 3].map((i) => (
								<Skeleton key={i} className="h-10 w-full" />
							))}
						</div>
					</div>
				</div>

				<div className="flex-1">
					<div className="space-y-6">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="space-y-4 rounded-lg border bg-white p-6 shadow-sm"
							>
								<div className="space-y-2">
									<Skeleton className="h-6 w-32" />
									<Skeleton className="h-4 w-48" />
								</div>
								<div className="py-2">
									<Skeleton className="h-10 w-full" />
								</div>
								{i !== 4 && (
									<div className="flex justify-end pt-2">
										<Skeleton className="h-10 w-20" />
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
