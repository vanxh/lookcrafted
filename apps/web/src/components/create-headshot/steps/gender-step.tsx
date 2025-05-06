"use client";

import { Mars, Transgender, Venus } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import type { Gender as GenderType } from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "../step-layout";

const GENDER_OPTIONS_WITH_ICONS = [
	{ value: "male", label: "Man", icon: Mars },
	{ value: "female", label: "Woman", icon: Venus },
	{ value: "other", label: "Non Binary", icon: Transgender },
] as const;

export function GenderStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		gender: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			gender: value as GenderType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your gender?"
			description="Provide your gender to help us create headshots that accurately represent you."
		>
			<div
				role="radiogroup"
				className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6"
			>
				{GENDER_OPTIONS_WITH_ICONS.map(({ value, label, icon: Icon }) => {
					const isSelected = state.gender === value;
					return (
						<SelectCard
							key={value}
							value={value}
							label={label}
							icon={<Icon className="h-5 w-5" />}
							isSelected={isSelected}
							onClick={() => handleValueChange(value)}
						/>
					);
				})}
			</div>
		</StepLayout>
	);
}
