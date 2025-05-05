"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	HAIR_LENGTH_OPTIONS,
	type HairLength as HairLengthType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "./step-layout";

export function HairLengthStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		hairLength: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			hairLength: value as HairLengthType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your hair length?"
			description="Choose the option that best describes your hair length."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
			>
				{HAIR_LENGTH_OPTIONS.map((value) => {
					const isSelected = state.hairLength === value;

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
