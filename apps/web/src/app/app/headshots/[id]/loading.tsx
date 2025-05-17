import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GALLERY_SKELETON_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
	id: `loading-skeleton-gallery-${i}`,
}));

const REFERENCE_SKELETON_ITEMS = Array.from({ length: 4 }).map((_, i) => ({
	id: `loading-skeleton-reference-${i}`,
}));

export default function HeadshotDetailLoading() {
	return (
		<>
			<div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
				<div className="flex items-start space-x-4">
					<Button
						variant="outline"
						size="icon"
						className="mt-1 flex-shrink-0"
						asChild
					>
						<Link href="/app">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<Skeleton className="mb-2 h-8 w-72" />
						<Skeleton className="h-4 w-60" />
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-8 w-24 sm:w-24" />
					<Skeleton className="h-8 w-32 sm:w-32" />
				</div>
			</div>

			<div className="my-6 h-px w-full bg-gray-200" />

			<div className="mb-6">
				<Skeleton className="h-10 w-60" />
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{GALLERY_SKELETON_ITEMS.map((item) => (
					<Card key={item.id} className="overflow-hidden p-0">
						<div className="relative aspect-[3/4] h-auto w-full">
							<Skeleton className="absolute inset-0 h-full w-full" />
							<div className="absolute bottom-3 left-3">
								<Skeleton className="h-8 w-28" />
							</div>
							<div className="absolute top-3 right-3">
								<Skeleton className="h-8 w-8 rounded-full" />
							</div>
						</div>
					</Card>
				))}
			</div>

			<div className="mt-12">
				<Skeleton className="mb-4 h-7 w-40" />
				<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
					{REFERENCE_SKELETON_ITEMS.map((item) => (
						<Card key={item.id} className="overflow-hidden p-0">
							<div className="relative aspect-[3/4] h-auto w-full">
								<Skeleton className="absolute inset-0 h-full w-full" />
							</div>
						</Card>
					))}
				</div>
			</div>
		</>
	);
}
