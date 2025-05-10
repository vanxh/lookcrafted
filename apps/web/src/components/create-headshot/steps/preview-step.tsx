"use client";

import { env } from "@/env";
import {
	Calendar,
	Layers,
	Palette,
	Scissors,
	User,
	UserRound,
	Wind,
} from "lucide-react";
import Image from "next/image";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

import { StepLayout } from "../step-layout";

export function PreviewStep() {
	const [state] = useQueryStates({
		gender: parseAsString.withDefault(""),
		ageGroup: parseAsString.withDefault(""),
		hairColor: parseAsString.withDefault(""),
		hairLength: parseAsString.withDefault(""),
		hairTexture: parseAsString.withDefault(""),
		ethnicity: parseAsString.withDefault(""),
		bodyType: parseAsString.withDefault(""),
		backgrounds: parseAsArrayOf(parseAsString).withDefault([]),
		outfits: parseAsArrayOf(parseAsString).withDefault([]),
		uploadedImageIds: parseAsArrayOf(parseAsString).withDefault([]),
	});

	const formatAgeGroup = (value: string) => {
		if (value === "65_plus") return "65+";
		return value.replace("_", "-");
	};

	const renderUserDetails = () => {
		return (
			<div className="space-y-3">
				<h3 className="mb-2 font-medium text-lg">Personal Details</h3>

				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<CompactDetailCard
						icon={UserRound}
						title="Gender"
						value={state.gender.charAt(0).toUpperCase() + state.gender.slice(1)}
					/>
					<CompactDetailCard
						icon={Calendar}
						title="Age Group"
						value={state.ageGroup ? formatAgeGroup(state.ageGroup) : ""}
					/>
					<CompactDetailCard
						icon={User}
						title="Ethnicity"
						value={state.ethnicity}
					/>
					<CompactDetailCard
						icon={User}
						title="Body Type"
						value={state.bodyType}
					/>
				</div>

				<h3 className="mt-4 mb-2 font-medium text-lg">Hair Details</h3>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					{state.hairColor && state.hairColor !== "Bald" ? (
						<>
							<CompactDetailCard
								icon={Palette}
								title="Hair Color"
								value={state.hairColor}
							/>
							<CompactDetailCard
								icon={Scissors}
								title="Hair Length"
								value={state.hairLength}
							/>
							<CompactDetailCard
								icon={Wind}
								title="Hair Texture"
								value={state.hairTexture}
							/>
						</>
					) : (
						<CompactDetailCard icon={User} title="Hair" value="Bald" />
					)}
				</div>

				<h3 className="mt-4 mb-2 font-medium text-lg">Style Preferences</h3>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<MultilineDetailCard
						icon={Layers}
						title="Backgrounds"
						value={state.backgrounds.join(", ")}
					/>
					<MultilineDetailCard
						icon={UserRound}
						title="Outfits"
						value={state.outfits.join(", ")}
					/>
				</div>
			</div>
		);
	};

	const renderImageGallery = () => {
		if (!state.uploadedImageIds || state.uploadedImageIds.length === 0) {
			return (
				<div className="flex h-full items-center justify-center rounded-lg bg-gray-50 p-6">
					<p className="text-center text-gray-500">No images uploaded</p>
				</div>
			);
		}

		return (
			<div className="space-y-3">
				<h3 className="mb-2 font-medium text-lg">Your Uploaded Photos</h3>
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
					{state.uploadedImageIds.map((imageId) => (
						<div
							key={imageId}
							className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100"
						>
							<Image
								src={`https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${imageId}/public`}
								alt="Uploaded image"
								fill
								sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
								style={{ objectFit: "cover" }}
								className="rounded-lg"
							/>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<StepLayout
			title="Review Your Selections"
			description="Please review your selections before proceeding to payment."
			showStepNumber={false}
		>
			<div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="lg:order-1">{renderImageGallery()}</div>
				<div className="lg:order-2">{renderUserDetails()}</div>
			</div>
		</StepLayout>
	);
}

function SelectionCard({
	icon: Icon,
	title,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
}) {
	return (
		<div className="rounded-lg border p-3">
			<div className="mb-1 flex items-center">
				<Icon className="mr-2 h-4 w-4 text-gray-600" />
				<div className="font-medium text-sm">{title}</div>
			</div>
			<div className="text-sm">{value}</div>
		</div>
	);
}

function CompactDetailCard({
	icon: Icon,
	title,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
}) {
	return (
		<div className="rounded-md border px-3 py-2">
			<div className="flex items-center">
				<Icon className="mr-2 h-4 w-4 shrink-0 text-gray-600" />
				<div className="mr-1 font-medium text-sm">{title}:</div>
				<div className="truncate text-sm">{value}</div>
			</div>
		</div>
	);
}

function MultilineDetailCard({
	icon: Icon,
	title,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	value: string;
}) {
	return (
		<div className="rounded-md border px-3 py-2">
			<div className="flex items-start">
				<Icon className="mt-0.5 mr-2 h-4 w-4 shrink-0 text-gray-600" />
				<div>
					<div className="font-medium text-sm">{title}</div>
					<div className="break-words text-sm">{value}</div>
				</div>
			</div>
		</div>
	);
}
