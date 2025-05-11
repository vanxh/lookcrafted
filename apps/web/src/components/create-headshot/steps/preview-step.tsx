"use client";

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

import { capitalizeFirstLetter, formatAgeGroup } from "@lookcrafted/constants";

import { env } from "@/env";
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

	const renderUserDetails = () => {
		return (
			<div className="w-full space-y-6">
				<div>
					<h3 className="mb-2 font-medium text-lg">Personal Details</h3>
					<div className="grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-4">
						<div className="flex items-center space-x-2">
							<UserRound className="h-4 w-4 text-gray-600" />
							<span className="font-medium text-sm">Gender:</span>
							<span className="text-gray-700 text-sm">
								{capitalizeFirstLetter(state.gender)}
							</span>
						</div>

						<div className="flex items-center space-x-2">
							<Calendar className="h-4 w-4 text-gray-600" />
							<span className="font-medium text-sm">Age Group:</span>
							<span className="text-gray-700 text-sm">
								{state.ageGroup ? formatAgeGroup(state.ageGroup) : ""}
							</span>
						</div>

						<div className="flex items-center space-x-2">
							<User className="h-4 w-4 text-gray-600" />
							<span className="font-medium text-sm">Ethnicity:</span>
							<span className="text-gray-700 text-sm">{state.ethnicity}</span>
						</div>

						<div className="flex items-center space-x-2">
							<User className="h-4 w-4 text-gray-600" />
							<span className="font-medium text-sm">Body Type:</span>
							<span className="text-gray-700 text-sm">{state.bodyType}</span>
						</div>
					</div>
				</div>

				<div className="pt-2">
					<h3 className="mb-4 font-medium text-xl">Hair Details</h3>
					<div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
						{state.hairColor && state.hairColor !== "Bald" ? (
							<>
								<div className="flex items-center space-x-2">
									<Palette className="h-4 w-4 text-gray-600" />
									<span className="font-medium text-sm">Color:</span>
									<span className="text-gray-700 text-sm">
										{state.hairColor}
									</span>
								</div>

								<div className="flex items-center space-x-2">
									<Scissors className="h-4 w-4 text-gray-600" />
									<span className="font-medium text-sm">Length:</span>
									<span className="text-gray-700 text-sm">
										{state.hairLength}
									</span>
								</div>

								<div className="flex items-center space-x-2">
									<Wind className="h-4 w-4 text-gray-600" />
									<span className="font-medium text-sm">Texture:</span>
									<span className="text-gray-700 text-sm">
										{state.hairTexture}
									</span>
								</div>
							</>
						) : (
							<div className="flex items-center space-x-2">
								<User className="h-4 w-4 text-gray-600" />
								<span className="font-medium text-sm">Hair:</span>
								<span className="text-gray-700 text-sm">Bald</span>
							</div>
						)}
					</div>
				</div>

				<div>
					<h3 className="mb-4 font-medium text-xl">Style Preferences</h3>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<div className="flex items-start space-x-2">
								<Layers className="mt-0.5 h-4 w-4 text-gray-600" />
								<div>
									<div className="font-medium text-sm">Backgrounds</div>
									<div className="flex flex-wrap gap-1 text-gray-700 text-sm">
										{state.backgrounds.map((bg) => (
											<span
												key={bg}
												className="rounded bg-gray-100 px-1.5 py-0.5"
											>
												{bg}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>

						<div>
							<div className="flex items-start space-x-2">
								<UserRound className="mt-0.5 h-4 w-4 text-gray-600" />
								<div>
									<div className="font-medium text-sm">Outfits</div>
									<div className="flex flex-wrap gap-1 text-gray-700 text-sm">
										{state.outfits.map((outfit) => (
											<span
												key={outfit}
												className="rounded-md bg-gray-100 px-2 py-1"
											>
												{outfit}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
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
			<div className="w-full space-y-3">
				<h3 className="mb-2 pb-1 font-medium text-lg">Your Uploaded Photos</h3>
				<div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
					{state.uploadedImageIds.map((imageId) => (
						<div
							key={imageId}
							className="relative aspect-[3/4] overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md"
						>
							<Image
								src={`https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${imageId}/public`}
								alt="Uploaded image"
								fill
								sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
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
			<div className="w-full space-y-8">
				<div>{renderImageGallery()}</div>
				<div>{renderUserDetails()}</div>
			</div>
		</StepLayout>
	);
}
