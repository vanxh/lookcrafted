"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	ETHNICITY_OPTIONS,
	type Ethnicity as EthnicityType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "../step-layout";

export function EthnicityStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		ethnicity: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			ethnicity: value as EthnicityType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your ethnicity?"
			description="This helps us capture features accurately."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
			>
				{ETHNICITY_OPTIONS.map((value) => {
					const isSelected = state.ethnicity === value;

					return (
						<SelectCard
							key={value}
							value={value}
							label={value}
							isSelected={isSelected}
							onClick={() => handleValueChange(value)}
						/>
					);
				})}
			</div>
		</StepLayout>
	);
}
