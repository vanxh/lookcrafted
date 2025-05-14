import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
	id: `loading-skeleton-${i}`,
}));

export default function Loading() {
	return (
		<>
			<div className="space-y-2">
				<Skeleton className="h-9 w-64" />
				<Skeleton className="h-5 w-full max-w-md" />
			</div>

			<div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
				<div className="mx-auto max-w-2xl text-center">
					<Skeleton className="mx-auto h-7 w-80" />
					<Skeleton className="mx-auto mt-3 h-20 w-full" />
				</div>

				<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
					<Skeleton className="h-10 w-56" />
					<div className="flex items-center justify-center">
						<Skeleton className="h-5 w-8" />
					</div>
					<Skeleton className="h-10 w-56" />
				</div>

				<div className="mx-auto mt-12 max-w-2xl text-center">
					<Skeleton className="h-10 w-full" />
				</div>
			</div>

			<div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{SKELETON_ITEMS.map((item) => (
					<div
						key={item.id}
						className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
					>
						<div className="flex aspect-[3/4] items-center justify-center bg-gray-50 p-4">
							<div className="w-full text-center">
								<Skeleton className="mx-auto mb-2 h-16 w-16 rounded-full" />
								<Skeleton className="mx-auto mb-2 h-5 w-32" />
								<Skeleton className="mx-auto h-4 w-20" />
							</div>
						</div>
						<div className="flex items-center justify-between p-4">
							<div className="w-full">
								<Skeleton className="h-4 w-full" />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
