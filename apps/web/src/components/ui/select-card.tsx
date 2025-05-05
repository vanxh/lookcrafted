"use client";

import { cn } from "@/lib/utils";
import type * as React from "react";

interface SelectCardProps {
	value: string;
	label: React.ReactNode;
	icon?: React.ElementType;
	isSelected: boolean;
	onClick: () => void;
}

export function SelectCard({
	value,
	label,
	icon: Icon,
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
				"flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				isSelected
					? "border-orange-500 bg-orange-50 ring-2 ring-orange-500/50"
					: "border-border hover:bg-accent",
			)}
		>
			{Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
			<span className="flex-1 font-medium">{label}</span>
		</button>
	);
}
