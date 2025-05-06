"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import type * as React from "react";

interface SelectCardProps {
	value: string;
	label: React.ReactNode;
	icon?: React.ReactNode;
	isSelected: boolean;
	onClick: () => void;
}

export function SelectCard({
	value,
	label,
	icon: Swatch,
	isSelected,
	onClick,
}: SelectCardProps) {
	return (
		<button
			type="button"
			aria-checked={isSelected}
			data-state={isSelected ? "checked" : "unchecked"}
			value={value}
			onClick={onClick}
			className={cn(
				"relative flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				isSelected
					? "border-orange-500 ring-2 ring-orange-500/50"
					: "border-border",
			)}
		>
			{Swatch}
			<span className="flex-1 font-medium">{label}</span>

			{isSelected && (
				<div className="ml-auto flex-shrink-0">
					<CheckCircle2 className="h-5 w-5 text-orange-500" />
				</div>
			)}
		</button>
	);
}
