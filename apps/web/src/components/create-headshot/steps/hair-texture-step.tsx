"use client";

import {
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from "nuqs";

import {
	HAIR_TEXTURE_OPTIONS,
	type HairTexture as HairTextureType,
} from "@lookcrafted/constants";

import { SelectImageCard } from "@/components/ui/select-image-card";
import { StepLayout } from "../step-layout";

export function HairTextureStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		hairTexture: parseAsString,
	});
	const [gender] = useQueryState("gender", parseAsString.withDefault("male"));

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			hairTexture: value as HairTextureType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your hair texture?"
			description="Select the texture that best describes your hair."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:flex-row"
			>
				{HAIR_TEXTURE_OPTIONS.map((value) => {
					const isSelected = state.hairTexture === value;
					const imageUrl = gender
						? `/hair-texture/${gender}/${value}.webp`
						: undefined;

					return (
						<SelectImageCard
							key={value}
							value={value}
							label={value}
							imageUrl={imageUrl}
							isSelected={isSelected}
							onClick={() => handleValueChange(value)}
						/>
					);
				})}
			</div>
		</StepLayout>
	);
}
