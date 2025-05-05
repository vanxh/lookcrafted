"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	BACKGROUND_OPTIONS,
	type Background as BackgroundType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "./step-layout";

export function BackgroundStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		background: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			background: value as BackgroundType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="Choose a background style"
			description="Select a preferred background for your headshots."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
			>
				{BACKGROUND_OPTIONS.map((value) => {
					const isSelected = state.background === value;

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
