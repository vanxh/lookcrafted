"use client";

import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	useQueryStates,
} from "nuqs";
import { Suspense } from "react";

import { AgeGroupStep } from "@/components/create-headshot/age-group-step";
import { BackgroundStep } from "@/components/create-headshot/background-step";
import { BodyTypeStep } from "@/components/create-headshot/body-type-step";
import { CreateHeadshotHeader } from "@/components/create-headshot/create-headshot-header";
import { EthnicityStep } from "@/components/create-headshot/ethnicity-step";
import { GenderStep } from "@/components/create-headshot/gender-step";
import { HairColorStep } from "@/components/create-headshot/hair-color-step";
import { HairLengthStep } from "@/components/create-headshot/hair-length-step";
import { HairTextureStep } from "@/components/create-headshot/hair-texture-step";
import { OutfitStep } from "@/components/create-headshot/outfit-step";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
	});

	const totalSteps = 9;
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
			default:
				return <div className="p-6">Invalid Step</div>;
		}
	};

	return (
		<div className="flex min-h-screen flex-col">
			<CreateHeadshotHeader progress={progress} />

			<main className="container mx-auto flex-1">{renderStep()}</main>

			<footer className="sticky bottom-0 mt-auto flex items-center justify-center border-t bg-white p-4">
				<Button
					onClick={nextStep}
					disabled={!isStepValid() || state.step === totalSteps}
					className={cn(
						"bg-orange-500 text-white hover:bg-orange-600",
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
