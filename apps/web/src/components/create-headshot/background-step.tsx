"use client";

import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsString,
	useQueryState,
	useQueryStates,
} from "nuqs";

import {
	BACKGROUND_OPTIONS,
	type Background as BackgroundType,
} from "@lookcrafted/constants";

import { SelectImageCard } from "../ui/select-image-card";
import { StepLayout } from "./step-layout";

export function BackgroundStep() {
	const [state, setState] = useQueryStates({
		step: parseAsInteger.withDefault(1),
		backgrounds: parseAsArrayOf(parseAsString).withDefault([]),
	});
	const [gender] = useQueryState("gender", parseAsString.withDefault("male"));

	const handleValueChange = (value: string) => {
		setState((prev) => {
			const currentBackgrounds = prev.backgrounds || [];
			const newBackgrounds = currentBackgrounds.includes(value)
				? currentBackgrounds.filter((bg) => bg !== value)
				: [...currentBackgrounds, value];
			return {
				...prev,
				backgrounds: newBackgrounds as BackgroundType[],
			};
		});
	};

	return (
		<StepLayout
			title="Choose a background style"
			description="Select a preferred background for your headshots."
		>
			<div
				role="radiogroup"
				className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
			>
				{BACKGROUND_OPTIONS.map((value) => {
					const isSelected = state.backgrounds?.includes(value);
					const imageUrl = gender
						? `/background/${gender}/${value}.webp`
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
