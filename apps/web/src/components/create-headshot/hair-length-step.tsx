"use client";

import {
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from "nuqs";

import {
	FEMALE_HAIR_LENGTH_OPTIONS,
	type HairLength as HairLengthType,
	MALE_HAIR_LENGTH_OPTIONS,
} from "@lookcrafted/constants";

import { SelectImageCard } from "@/components/ui/select-image-card";
import { StepLayout } from "./step-layout";

export function HairLengthStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		hairLength: parseAsString,
	});
	const [gender] = useQueryState("gender", parseAsString.withDefault("male"));

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			hairLength: value as HairLengthType,
			step: value === "Bald" ? prev.step + 2 : prev.step + 1,
		}));
	};

	const hairLengthOptions =
		gender === "female" ? FEMALE_HAIR_LENGTH_OPTIONS : MALE_HAIR_LENGTH_OPTIONS;

	return (
		<StepLayout
			title="What's your hair length?"
			description="Choose the option that best describes your hair length."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:flex-row"
			>
				{hairLengthOptions.map((value) => {
					const isSelected = state.hairLength === value;
					const imageUrl = gender
						? `/hair-length/${gender}/${value}.webp`
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
