"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	BODY_TYPE_OPTIONS,
	type BodyType as BodyTypeType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "./step-layout";

export function BodyTypeStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		bodyType: parseAsString,
	});

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
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
			>
				{BODY_TYPE_OPTIONS.map((value) => {
					const isSelected = state.bodyType === value;

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
