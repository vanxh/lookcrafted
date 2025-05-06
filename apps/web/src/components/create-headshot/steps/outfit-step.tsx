"use client";

import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from "nuqs";

import {
	OUTFIT_OPTIONS,
	type Outfit as OutfitType,
} from "@lookcrafted/constants";

import { SelectImageCard } from "@/components/ui/select-image-card";
import { StepLayout } from "./step-layout";

export function OutfitStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		outfits: parseAsArrayOf(parseAsString).withDefault([]),
	});
	const [gender] = useQueryState("gender", parseAsString.withDefault("male"));

	const handleValueChange = (value: string) => {
		setState((prev) => {
			const currentOutfits = prev.outfits || [];
			const newOutfits = currentOutfits.includes(value)
				? currentOutfits.filter((o) => o !== value)
				: [...currentOutfits, value];
			return {
				...prev,
				outfits: newOutfits as OutfitType[],
			};
		});
	};

	return (
		<StepLayout
			title="Choose an outfit style"
			description="Select a preferred outfit for your headshots."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
			>
				{OUTFIT_OPTIONS.map((value) => {
					const isSelected = state.outfits?.includes(value);
					const imageUrl = gender
						? `/outfit/${gender}/${value}.webp`
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
