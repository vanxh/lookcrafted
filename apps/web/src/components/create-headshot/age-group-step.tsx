"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	AGE_GROUP_OPTIONS,
	type AgeGroup as AgeGroupType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "./step-layout";

const formatAgeGroupLabel = (value: AgeGroupType) => {
	if (value === "65_plus") return "65+";
	return value.replace("_", "-");
};

export function AgeGroupStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		ageGroup: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			ageGroup: value as AgeGroupType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your age group?"
			description="This helps us generate age-appropriate photos."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
			>
				{AGE_GROUP_OPTIONS.map((value) => {
					const isSelected = state.ageGroup === value;
					return (
						<SelectCard
							key={value}
							value={value}
							label={formatAgeGroupLabel(value)}
							isSelected={isSelected}
							onClick={() => handleValueChange(value)}
						/>
					);
				})}
			</div>
		</StepLayout>
	);
}
