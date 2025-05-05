"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
	HAIR_TEXTURE_OPTIONS,
	type HairTexture as HairTextureType,
} from "@lookcrafted/constants";

import { SelectCard } from "@/components/ui/select-card";
import { StepLayout } from "./step-layout";

export function HairTextureStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		hairTexture: parseAsString,
	});

	const handleValueChange = (value: string) => {
		setState((prev) => ({
			...prev,
			hairTexture: value as HairTextureType,
			step: prev.step + 1,
		}));
	};

	return (
		<StepLayout
			title="What's your hair texture?"
			description="Select the texture that best describes your hair."
		>
			<div role="radiogroup" className="grid w-full grid-cols-2 gap-4">
				{HAIR_TEXTURE_OPTIONS.map((value) => {
					const isSelected = state.hairTexture === value;

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
