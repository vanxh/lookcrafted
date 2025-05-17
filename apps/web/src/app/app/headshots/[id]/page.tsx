"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import {
	ArrowLeft,
	Download,
	Heart,
	Loader2,
	RefreshCw,
	Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { usePostHog } from "posthog-js/react";
import { use } from "react";

import { capitalizeFirstLetter, formatAgeGroup } from "@lookcrafted/constants";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orpc } from "@/utils/orpc";
import Loading from "./loading";

export default function HeadshotDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);

	const [activeTab, setActiveTab] = useQueryState(
		"tab",
		parseAsStringEnum(["all", "favorites"]).withDefault("all"),
	);

	const posthog = usePostHog();
	const queryClient = useQueryClient();

	const { data: headshot, isLoading } = useQuery(
		orpc.headshot.getOne.queryOptions({
			input: {
				id,
				includeUploads: true,
				includeImages: true,
			},
		}),
	);

	const toggleFavoriteMutation = useMutation(
		orpc.headshot.favoriteImage.mutationOptions({
			onMutate: async ({ imageId, isFavorite }) => {
				await queryClient.setQueryData(
					orpc.headshot.getOne.queryOptions({
						input: {
							id,
							includeUploads: true,
							includeImages: true,
						},
					}).queryKey,
					(old: typeof headshot) => {
						return {
							...old,
							images: old?.images.map((image) => {
								if (image.id === imageId) {
									return {
										...image,
										isFavorite,
									};
								}
								return image;
							}),
						};
					},
				);
			},
		}),
	);

	const toggleFavorite = (imageId: string, currentFavoriteStatus: boolean) => {
		toggleFavoriteMutation.mutate({
			imageId,
			isFavorite: !currentFavoriteStatus,
		});
	};

	if (isLoading) {
		return <Loading />;
	}

	if (!headshot) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<h2 className="font-semibold text-2xl text-gray-900">
					Headshot not found
				</h2>
				<p className="mt-2 text-gray-600">
					The headshot you're looking for might have been deleted or doesn't
					exist.
				</p>
				<Button className="mt-4" asChild>
					<Link href="/app">Back to Gallery</Link>
				</Button>
			</div>
		);
	}

	const headshotImages = headshot.images || [];
	const favoriteImages = headshotImages.filter((image) => image.isFavorite);
	const isCompleted = headshot.status === "completed";

	const downloadImage = async (imageUrl: string, filename: string) => {
		try {
			posthog.capture("download_image", {
				headshotId: headshot.id,
				imageId: imageUrl,
				filename,
			});

			const response = await fetch(imageUrl);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = filename || "headshot.jpg";
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error("Error downloading image:", error);
		}
	};

	const downloadAllImages = async () => {
		try {
			posthog.capture("download_all_images", {
				headshotId: headshot.id,
			});

			const JSZip = (await import("jszip")).default;
			const zip = new JSZip();

			const fetchPromises = headshotImages.map(async (image, index) => {
				try {
					const response = await fetch(image.imageUrl);
					const blob = await response.blob();
					zip.file(`headshot_${index + 1}.jpg`, blob);
				} catch (error) {
					console.error(`Error adding image ${index} to zip:`, error);
				}
			});

			await Promise.all(fetchPromises);

			const content = await zip.generateAsync({ type: "blob" });
			const url = window.URL.createObjectURL(content);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${capitalizeFirstLetter(headshot.gender)}_${formatAgeGroup(headshot.ageGroup)}_Headshots.zip`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error("Error creating zip file:", error);
		}
	};

	const getStatusDescription = () => {
		switch (headshot.status) {
			case "unpaid":
				return "Your headshots are waiting for payment. Complete the payment to start the generation process.";
			case "pending":
				return "Your headshots are in queue and will begin processing soon. This typically takes 5-10 minutes to start.";
			case "training":
				return "AI is learning from your reference photos. This training process typically takes 10-20 minutes.";
			case "training-completed":
				return "Training has been completed. Your headshots will begin generating shortly.";
			case "generating":
				return "Your professional headshots are now being generated. This final step typically takes 5-10 minutes.";
			case "failed":
				return "There was an issue generating your headshots. Our team has been notified and will look into this.";
			default:
				return `Your headshots are currently being ${headshot.status.replace(/-/g, " ")}. This process typically takes 15-30 minutes.`;
		}
	};

	const getStatusTitle = () => {
		switch (headshot.status) {
			case "unpaid":
				return "Payment Required";
			case "failed":
				return "Generation Failed";
			default:
				return "Headshot Generation in Progress";
		}
	};

	const renderStatusActions = () => {
		switch (headshot.status) {
			case "unpaid":
				return (
					<Button variant="default" className="mr-2" asChild>
						<Link href={`/create-headshot?id=${id}&step=12`}>
							Complete Payment
						</Link>
					</Button>
				);
			case "failed":
				return (
					<Button variant="outline" className="mr-2" asChild>
						<Link href="/contact">Contact Support</Link>
					</Button>
				);
			default:
				return (
					<Button variant="outline" className="mr-2">
						<RefreshCw className="mr-2 h-4 w-4" />
						Refresh Status
					</Button>
				);
		}
	};

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
						<h1 className="line-clamp-2 font-bold text-gray-900 text-xl sm:text-2xl">
							{capitalizeFirstLetter(headshot.gender)}{" "}
							{formatAgeGroup(headshot.ageGroup)} Headshots
						</h1>
						<div className="flex flex-wrap items-center text-gray-500 text-sm">
							<span className="mr-2">
								Created{" "}
								{formatDistance(new Date(headshot.createdAt), new Date(), {
									addSuffix: true,
								})}
							</span>
							<span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-xs">
								{capitalizeFirstLetter(headshot.status)}
							</span>
							{headshot.status === "completed" && headshot.completedAt && (
								<span className="ml-2">
									• Completed{" "}
									{formatDistance(new Date(headshot.completedAt), new Date(), {
										addSuffix: true,
									})}
								</span>
							)}
						</div>
					</div>
				</div>

				{isCompleted && (
					<div className="flex flex-wrap gap-2">
						<Button
							size="sm"
							variant="outline"
							className="w-full sm:w-auto"
							disabled
						>
							<Share2 className="mr-2 h-4 w-4" />
							Share
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="w-full sm:w-auto"
							onClick={downloadAllImages}
						>
							<Download className="mr-2 h-4 w-4" />
							Download All
						</Button>
					</div>
				)}
			</div>

			<Separator className="my-6" />

			{isCompleted && headshotImages.length > 0 ? (
				<>
					<Tabs
						defaultValue="all"
						className="mb-6"
						value={activeTab}
						onValueChange={(value) =>
							setActiveTab(value as "all" | "favorites")
						}
					>
						<TabsList>
							<TabsTrigger value="all">
								All Images ({headshotImages.length})
							</TabsTrigger>
							<TabsTrigger value="favorites">
								Favorites ({favoriteImages.length})
							</TabsTrigger>
						</TabsList>
					</Tabs>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{(activeTab === "all" ? headshotImages : favoriteImages).map(
							(image) => (
								<Card key={image.id} className="overflow-hidden p-0">
									<div className="relative aspect-[3/4] h-auto w-full">
										<Image
											src={image.imageUrl}
											alt="Headshot"
											fill
											className="object-cover"
										/>
										<div className="absolute bottom-3 left-3 flex space-x-2">
											<Button
												variant="secondary"
												size="icon"
												onClick={() =>
													downloadImage(
														image.imageUrl,
														`headshot_${image.id}.jpg`,
													)
												}
											>
												<Download className="size-4" />
											</Button>
										</div>
										<div className="absolute top-3 right-3 flex space-x-2">
											<Button
												size="icon"
												variant="secondary"
												className="h-8 w-8 rounded-full bg-white/90 shadow-sm hover:bg-white"
												onClick={() =>
													toggleFavorite(image.id, !!image.isFavorite)
												}
											>
												<Heart
													className={`h-4 w-4 ${
														image.isFavorite
															? "fill-red-500 text-red-500"
															: "text-gray-600"
													}`}
												/>
											</Button>
										</div>
									</div>
								</Card>
							),
						)}
					</div>
				</>
			) : (
				<Card className="border-dashed">
					<CardHeader>
						<CardTitle>{getStatusTitle()}</CardTitle>
						<CardDescription>{getStatusDescription()}</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center py-6">
						<div className="flex flex-col items-center">
							<Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
							<p className="mt-4 text-gray-500 text-sm">
								Please check back soon
							</p>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center pb-6">
						{renderStatusActions()}
						<Button variant="outline" asChild>
							<Link href="/app">Back to Gallery</Link>
						</Button>
					</CardFooter>
				</Card>
			)}

			{headshot.uploads && headshot.uploads.length > 0 && (
				<div className="mt-12">
					<h2 className="mb-4 font-semibold text-xl">Reference Images</h2>
					<div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
						{headshot.uploads.map((upload) => (
							<Card key={upload.id} className="overflow-hidden p-0">
								<div className="relative aspect-[3/4] h-auto w-full">
									<Image
										src={upload.imageUrl}
										alt="Reference image"
										fill
										className="object-cover"
									/>
								</div>
							</Card>
						))}
					</div>
				</div>
			)}
		</>
	);
}
