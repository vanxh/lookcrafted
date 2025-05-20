"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	useQueryStates,
} from "nuqs";
import { usePostHog } from "posthog-js/react";
import { Suspense } from "react";
import { toast } from "sonner";

import { AppHeader } from "@/components/app/header";
import { ProgressSidebar } from "@/components/create-headshot/progress-sidebar";
import { AgeGroupStep } from "@/components/create-headshot/steps/age-group-step";
import { BackgroundStep } from "@/components/create-headshot/steps/background-step";
import { BodyTypeStep } from "@/components/create-headshot/steps/body-type-step";
import { EthnicityStep } from "@/components/create-headshot/steps/ethnicity-step";
import { GenderStep } from "@/components/create-headshot/steps/gender-step";
import { HairColorStep } from "@/components/create-headshot/steps/hair-color-step";
import { HairLengthStep } from "@/components/create-headshot/steps/hair-length-step";
import { HairTextureStep } from "@/components/create-headshot/steps/hair-texture-step";
import { ImageUploadStep } from "@/components/create-headshot/steps/image-upload-step";
import { OutfitStep } from "@/components/create-headshot/steps/outfit-step";
import { PaymentStep } from "@/components/create-headshot/steps/payment-step";
import { PreviewStep } from "@/components/create-headshot/steps/preview-step";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { orpc } from "@/utils/orpc";
import type { CreateHeadshotRequestInput } from "@lookcrafted/constants";

const STEP_TITLES = [
	"Gender",
	"Age Group",
	"Hair Color",
	"Hair Length",
	"Hair Texture",
	"Ethnicity",
	"Body Type",
	"Backgrounds",
	"Outfits",
	"Upload Image",
	"Preview",
	"Payment",
];

function CreateHeadshotPageComponent() {
	const router = useRouter();
	const posthog = usePostHog();

	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		gender: parseAsString,
		ageGroup: parseAsString,
		hairColor: parseAsString,
		hairLength: parseAsString,
		hairTexture: parseAsString,
		ethnicity: parseAsString,
		bodyType: parseAsString,
		backgrounds: parseAsArrayOf(parseAsString).withDefault([]),
		outfits: parseAsArrayOf(parseAsString).withDefault([]),
		uploadedImageIds: parseAsArrayOf(parseAsString).withDefault([]),
	});

	const totalSteps = STEP_TITLES.length;

	const createHeadshotMutation = useMutation(
		orpc.headshot.create.mutationOptions({
			onSuccess: (data) => {
				posthog.capture("Headshot Request Created", {
					headshot_request_id: data.id,
				});
				toast.success("Headshot request created successfully!");
				router.push(`/create-headshot?id=${data.id}&step=12`);
			},
			onError: (error) => {
				toast.error("Failed to create headshot request. Please try again.");
			},
		}),
	);

	const nextStep = async () => {
		if (!isStepValid()) return;

		posthog.capture("Create Headshot Request Page Step", {
			step: state.step,
		});

		if (state.step === 11) {
			const data = await createHeadshotRequest();
			router.push(`/create-headshot?id=${data?.id}&step=12`);
			return;
		}

		setState((prev) => ({
			...prev,
			step: Math.min(prev.step + 1, totalSteps),
		}));
	};

	const createHeadshotRequest = async () => {
		if (!isStepValid()) return;

		if (
			!state.gender ||
			!state.ageGroup ||
			!state.hairColor ||
			!state.hairLength ||
			!state.hairTexture ||
			!state.ethnicity ||
			!state.bodyType
		) {
			toast.error("Please complete all required fields before continuing.");
			return;
		}

		return createHeadshotMutation.mutateAsync({
			gender: state.gender,
			ageGroup: state.ageGroup,
			hairColor: state.hairColor,
			hairLength: state.hairLength,
			hairTexture: state.hairTexture,
			ethnicity: state.ethnicity,
			bodyType: state.bodyType,
			backgrounds: state.backgrounds,
			outfits: state.outfits,
			uploadedImageIds: state.uploadedImageIds,
		} as CreateHeadshotRequestInput);
	};

	const isStepValid = () => {
		switch (state.step) {
			case 1:
				return !!state.gender;
			case 2:
				return !!state.ageGroup;
			case 3:
				return !!state.hairColor;
			case 4:
				return !!state.hairLength;
			case 5:
				return !!state.hairTexture;
			case 6:
				return !!state.ethnicity;
			case 7:
				return !!state.bodyType;
			case 8:
				return !!state.backgrounds && !!state.backgrounds.length;
			case 9:
				return !!state.outfits && !!state.outfits.length;
			case 10:
				return (
					!!state.uploadedImageIds &&
					state.uploadedImageIds.length >= 8 &&
					state.uploadedImageIds.length <= 15
				);
			case 11:
				return true;
			default:
				return false;
		}
	};

	const renderStep = () => {
		switch (state.step) {
			case 1:
				return <GenderStep />;
			case 2:
				return <AgeGroupStep />;
			case 3:
				return <HairColorStep />;
			case 4:
				return <HairLengthStep />;
			case 5:
				return <HairTextureStep />;
			case 6:
				return <EthnicityStep />;
			case 7:
				return <BodyTypeStep />;
			case 8:
				return <BackgroundStep />;
			case 9:
				return <OutfitStep />;
			case 10:
				return <ImageUploadStep />;
			case 11:
				return <PreviewStep />;
			case 12:
				return <PaymentStep />;
			default:
				return <div className="p-6">Invalid Step</div>;
		}
	};

	return (
		<div className="flex min-h-screen flex-col">
			<AppHeader />

			<div className="flex flex-1">
				<ProgressSidebar
					currentStep={state.step}
					stepTitles={STEP_TITLES}
					stepChangeEnabled={state.step < 12}
				/>
				<main className="container mx-auto flex-1">{renderStep()}</main>
			</div>
			{state.step !== 12 && (
				<footer className="sticky bottom-0 mt-auto flex items-center justify-center border-t bg-white p-4 dark:bg-black">
					<Button
						onClick={nextStep}
						disabled={
							!isStepValid() ||
							state.step === totalSteps ||
							createHeadshotMutation.isPending
						}
						className={cn(
							"bg-blue-600 text-white hover:bg-blue-700",
							(!isStepValid() ||
								state.step === totalSteps ||
								createHeadshotMutation.isPending) &&
								"cursor-not-allowed opacity-50",
							"px-16",
							"text-lg",
						)}
						size="lg"
					>
						{createHeadshotMutation.isPending
							? "Processing..."
							: state.step === 11
								? "Create Headshots"
								: "Continue"}
					</Button>
				</footer>
			)}
		</div>
	);
}

export default function CreateHeadshotPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CreateHeadshotPageComponent />
		</Suspense>
	);
}
