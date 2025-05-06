"use client";

import { ChevronLeft } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import type * as React from "react";

import { Button } from "@/components/ui/button";

interface StepLayoutProps {
	title: string;
	description: string;
	children: React.ReactNode;
}

export function StepLayout({ title, description, children }: StepLayoutProps) {
	const [step, setStep] = useQueryState("step", parseAsInteger.withDefault(1));

	const handleGoBack = () => {
		setStep((prev) => Math.max(prev - 1, 1));
	};

	return (
		<div className="relative flex w-full flex-col items-center gap-6 p-6 pt-12">
			{step > 1 && (
				<Button
					onClick={handleGoBack}
					variant="outline"
					className="absolute top-4 left-4 flex items-center gap-2"
				>
					<ChevronLeft className="h-4 w-4" /> Back
				</Button>
			)}

			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-sm text-white">
				{step}
			</div>

			<h1 className="text-center font-bold text-3xl">{title}</h1>

			<p className="text-center text-muted-foreground">{description}</p>

			{children}
		</div>
	);
}
