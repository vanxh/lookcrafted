"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type * as React from "react";

interface SelectImageCardProps {
	value: string;
	label: React.ReactNode;
	imageUrl?: string;
	isSelected: boolean;
	onClick: () => void;
}

export function SelectImageCard({
	value,
	label,
	imageUrl,
	isSelected,
	onClick,
}: SelectImageCardProps) {
	return (
		<button
			type="button"
			aria-checked={isSelected}
			data-state={isSelected ? "checked" : "unchecked"}
			value={value}
			onClick={onClick}
			className={cn(
				"relative flex flex-1 cursor-pointer flex-col items-stretch justify-start gap-3 overflow-hidden rounded-lg border p-0 text-center transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				isSelected
					? "border-orange-500 ring-2 ring-orange-500/50"
					: "border-border",
			)}
		>
			{isSelected && (
				<div className="absolute top-2 right-2 z-10">
					<CheckCircle2 className="h-6 w-6 text-orange-500" />
				</div>
			)}

			{imageUrl && (
				<div className="relative aspect-[3/4] w-full">
					<Image
						src={imageUrl}
						alt={typeof label === "string" ? label : value}
						fill
						className="object-cover"
						sizes="(max-width: 640px) 50vw, 200px"
					/>
				</div>
			)}

			<span className="block p-3 pt-0 text-center font-medium">{label}</span>
		</button>
	);
}
