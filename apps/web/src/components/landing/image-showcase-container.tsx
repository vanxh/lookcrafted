"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import { ComparisonImage } from "./comparison-image";

import Example1Before from "@/public/example-1-before.webp";
import Example1After from "@/public/example-1.webp";
import Example2Before from "@/public/example-2-before.webp";
import Example2After from "@/public/example-2.webp";
import Example3Before from "@/public/example-3-before.webp";
import Example3After from "@/public/example-3.webp";
import Example4Before from "@/public/example-4-before.webp";
import Example4After from "@/public/example-4.webp";
import Example5Before from "@/public/example-5-before.webp";
import Example5After from "@/public/example-5.webp";
import Example6Before from "@/public/example-6-before.webp";
import Example6After from "@/public/example-6.webp";

const images = [
	{
		before: Example1Before,
		after: Example1After,
		alt: "Example 1",
	},
	{
		before: Example2Before,
		after: Example2After,
		alt: "Example 2",
	},
	{
		before: Example4Before,
		after: Example4After,
		alt: "Example 4",
	},
	{
		before: Example3Before,
		after: Example3After,
		alt: "Example 3",
	},
	{
		before: Example5Before,
		after: Example5After,
		alt: "Example 5",
	},
	{
		before: Example6Before,
		after: Example6After,
		alt: "Example 6",
	},
];

const carouselImages = [...images, ...images, ...images, ...images, ...images];

export function ImageShowcaseContainer() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const animationFrameId = useRef<number | null>(null);
	const scrollPositionRef = useRef(0);
	const lastTimeRef = useRef(0);
	const isPausedRef = useRef(false);

	const SCROLL_SPEED = 0.075; // 0.075px/ms

	const updateClipPaths = useCallback(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

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
	}, []);

	const animateScroll = useCallback(
		(timestamp: number) => {
			const container = scrollContainerRef.current;
			if (!container) return;

			if (lastTimeRef.current === 0) {
				lastTimeRef.current = timestamp;
			}

			const deltaTime = timestamp - lastTimeRef.current;
			lastTimeRef.current = timestamp;

			if (!isPausedRef.current) {
				scrollPositionRef.current += SCROLL_SPEED * deltaTime;

				const firstChild = container.firstChild as HTMLElement;
				if (firstChild) {
					const itemWidth = firstChild.offsetWidth + 16;

					if (scrollPositionRef.current >= itemWidth) {
						const firstItem = container.firstChild;
						if (firstItem) {
							container.appendChild(firstItem);
							scrollPositionRef.current -= itemWidth;
						}
					}

					container.style.transform = `translateX(-${scrollPositionRef.current}px)`;
				}
			}

			updateClipPaths();

			animationFrameId.current = requestAnimationFrame(animateScroll);
		},
		[updateClipPaths],
	);

	useEffect(() => {
		animationFrameId.current = requestAnimationFrame(animateScroll);

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [animateScroll]);

	return (
		<div className="w-full max-w-full overflow-hidden">
			<div
				className="group relative"
				onMouseEnter={() => {
					isPausedRef.current = true;
				}}
				onMouseLeave={() => {
					isPausedRef.current = false;
				}}
			>
				<div
					ref={scrollContainerRef}
					className="flex gap-4"
					style={{ willChange: "transform" }}
				>
					{carouselImages.map((img, index) => (
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
		</div>
	);
}
