"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	OUTFIT_OPTIONS,
	type Outfit as OutfitType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "./step-layout";

export function OutfitStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		outfit: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			outfit: value as OutfitType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="Choose an outfit style"
			description="Select a preferred outfit for your headshots."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
			>
				{OUTFIT_OPTIONS.map((value) => {
					const isSelected = state.outfit === value;

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
