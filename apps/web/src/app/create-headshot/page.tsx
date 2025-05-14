"use client";

import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	useQueryStates,
} from "nuqs";
import { Suspense } from "react";

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
import { PreviewStep } from "@/components/create-headshot/steps/preview-step";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
	const progress = (state.step / totalSteps) * 100;

	const nextStep = () => {
		if (state.step === totalSteps) {
			console.log("Form Submission Placeholder");
			return;
		}
		if (!isStepValid()) return;
		setState((prev) => ({
			...prev,
			step: Math.min(prev.step + 1, totalSteps),
		}));
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
					state.uploadedImageIds.length >= 6 &&
					state.uploadedImageIds.length <= 10
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
			default:
				return <div className="p-6">Invalid Step</div>;
		}
	};

	return (
		<div className="flex min-h-screen flex-col">
			<AppHeader />

			<div className="flex flex-1">
				<ProgressSidebar currentStep={state.step} stepTitles={STEP_TITLES} />
				<main className="container mx-auto flex-1">{renderStep()}</main>
			</div>
			<footer className="sticky bottom-0 mt-auto flex items-center justify-center border-t bg-white p-4 dark:bg-black">
				<Button
					onClick={nextStep}
					disabled={!isStepValid() || state.step === totalSteps}
					className={cn(
						"bg-blue-600 text-white hover:bg-blue-700",
						(!isStepValid() || state.step === totalSteps) &&
							"cursor-not-allowed opacity-50",
						"px-16",
						"text-lg",
					)}
					size="lg"
				>
					{state.step === totalSteps ? "Finish" : "Continue"}
				</Button>
			</footer>
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
