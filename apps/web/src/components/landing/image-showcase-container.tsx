"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ComparisonImage } from "./comparison-image";

const images = [
	{
		before: "/example-before.webp",
		after: "/example.webp",
		alt: "Example 1",
	},
	{
		before: "/example-before.webp",
		after: "/example.webp",
		alt: "Example 2",
	},
	{
		before: "/example-before.webp",
		after: "/example.webp",
		alt: "Example 3",
	},
	{
		before: "/example-before.webp",
		after: "/example.webp",
		alt: "Example 4",
	},
	{
		before: "/example-before.webp",
		after: "/example.webp",
		alt: "Example 5",
	},
	{
		before: "/example-before.webp",
		after: "/example.webp",
		alt: "Example 6",
	},
	{
		before: "/example-before.webp",
		after: "/example.webp",
		alt: "Example 7",
	},
];

const allImages = [...images, ...images];

export function ImageShowcaseContainer() {
	const baseAnimationDuration = `${images.length * 4}s`;
	const mobileAnimationDuration = `${images.length * 1.5}s`;
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const animationFrameId = useRef<number | null>(null);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const updateClipPaths = () => {
			const viewportCenter = window.innerWidth / 2;
			const children = container.childNodes;

			for (const child of children) {
				if (child instanceof HTMLElement) {
					const rect = child.getBoundingClientRect();
					const revealPercentage = Math.max(
						0,
						Math.min(1, (viewportCenter - rect.left) / rect.width),
					);
					child.style.setProperty("--reveal-percentage", `${revealPercentage}`);
				}
			}

			animationFrameId.current = requestAnimationFrame(updateClipPaths);
		};

		animationFrameId.current = requestAnimationFrame(updateClipPaths);

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, []);

	return (
		<div className="w-full max-w-full overflow-hidden pb-12">
			<div
				ref={scrollContainerRef}
				className="group scroll-container flex gap-4 pointer-fine:hover:[animation-play-state:paused]"
				style={
					{
						"--scroll-duration-base": baseAnimationDuration,
						"--scroll-duration-mobile": mobileAnimationDuration,
					} as React.CSSProperties
				}
			>
				{allImages.map((img, index) => (
					<motion.div
						key={`${img.alt}-${index}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5, delay: index * 0.05 }}
					>
						<ComparisonImage
							beforeSrc={img.before}
							afterSrc={img.after}
							alt={img.alt}
						/>
					</motion.div>
				))}
			</div>
		</div>
	);
}
