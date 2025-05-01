"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ShowcaseImageProps = {
	beforeSrc: string;
	afterSrc: string;
	alt: string;
};

export function ShowcaseImage({
	beforeSrc,
	afterSrc,
	alt,
}: ShowcaseImageProps) {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		if (window.matchMedia("(pointer: fine)").matches) {
			setIsHovered(true);
		}
	};

	const handleMouseLeave = () => {
		if (window.matchMedia("(pointer: fine)").matches) {
			setIsHovered(false);
		}
	};

	return (
		<div
			className={cn(
				"showcase-item group relative aspect-[3/4] w-60 flex-shrink-0 overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out",
				"pointer-fine:hover:!blur-none pointer-fine:hover:!opacity-100 pointer-fine:group-hover:opacity-60 pointer-fine:group-hover:blur-sm",
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Image
				src={beforeSrc}
				alt={`${alt} (Before)`}
				fill
				className="object-cover transition-opacity duration-300 ease-in-out"
				style={{
					clipPath: !isHovered
						? "inset(0 calc(100% - (var(--reveal-percentage, 0.5) * 100%)) 0 0)"
						: "inset(0)",
					opacity: isHovered ? 0 : 1,
				}}
			/>
			<Image
				src={afterSrc}
				alt={`${alt} (After)`}
				fill
				className="object-cover transition-opacity duration-300 ease-in-out"
				style={{
					clipPath: !isHovered
						? "inset(0 0 0 calc(var(--reveal-percentage, 0.5) * 100%))"
						: "inset(0)",
					opacity: 1,
				}}
			/>
			<div
				className="absolute top-0 bottom-0 w-0.5 bg-white transition-opacity duration-300 ease-in-out"
				style={{
					left: "calc(var(--reveal-percentage, 0.5) * 100%)",
					transform: "translateX(-50%)",
					opacity: isHovered ? 0 : 0.8,
				}}
			/>
		</div>
	);
}
