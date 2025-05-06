"use client";

import {
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from "nuqs";

import {
	BODY_TYPE_OPTIONS,
	type BodyType as BodyTypeType,
} from "@lookcrafted/constants";

import { SelectImageCard } from "@/components/ui/select-image-card";
import { StepLayout } from "../step-layout";

export function BodyTypeStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		bodyType: parseAsString,
	});
	const [gender] = useQueryState("gender", parseAsString.withDefault("male"));

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			bodyType: value as BodyTypeType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your body type?"
			description="Select the option that best represents your build."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:flex-row"
			>
				{BODY_TYPE_OPTIONS.map((value) => {
					const isSelected = state.bodyType === value;
					const imageUrl = gender
						? `/body-type/${gender}/${value}.webp`
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
