"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	HAIR_COLOR_OPTIONS,
	type HairColor as HairColorType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "./step-layout";

const hairColorMap: Record<HairColorType, string> = {
	Black: "bg-black",
	Brown: "bg-[#A0522D]",
	Blonde: "bg-[#FAFAD2]",
	Gray: "bg-gray-500",
	Auburn: "bg-[#A52A2A]",
	Red: "bg-red-600",
	White: "bg-white border border-gray-300",
	Other: "bg-gray-300",
	Bald: "bg-transparent",
};

export function HairColorStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		hairColor: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			hairColor: value as HairColorType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your hair color?"
			description="Select the hair color that best matches."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3"
			>
				{HAIR_COLOR_OPTIONS.map((value) => {
					const isSelected = state.hairColor === value;
					const swatchClass = hairColorMap[value] || "bg-gray-300";

					const LabelContent = (
						<div className="flex items-center gap-2">
							{value !== "Bald" && (
								<span className={`h-4 w-4 rounded-full ${swatchClass}`} />
							)}
							<span>{value}</span>
						</div>
					);

					return (
						<SelectCard
							key={value}
							value={value}
							label={LabelContent}
							isSelected={isSelected}
							onClick={() => handleValueChange(value)}
						/>
					);
				})}
			</div>
		</StepLayout>
	);
}
