import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import type { HTMLProps, default as React } from "react";

import { cn } from "@/lib/utils";

interface ImageDropzoneUIProps {
	getRootProps: <T extends HTMLProps<HTMLElement>>(props?: T | undefined) => T;
	getInputProps: <T extends HTMLProps<HTMLInputElement>>(
		props?: T | undefined,
	) => T;
	isDragActive: boolean;
	isDragAccept: boolean;
	isDragReject: boolean;
	disabled: boolean;
	completedImagesCount: number;
	maxImages: number;
	modelsLoaded: boolean;
	isProcessingFiles: boolean;
}

export function ImageDropzoneUI({
	getRootProps,
	getInputProps,
	isDragActive,
	isDragAccept,
	isDragReject,
	disabled,
	completedImagesCount,
	maxImages,
	modelsLoaded,
	isProcessingFiles,
}: ImageDropzoneUIProps) {
	const dropzoneDisabled =
		disabled || !modelsLoaded || completedImagesCount >= maxImages;

	let icon: React.ReactNode;
	let message: string;

	if (!modelsLoaded && !isDragActive) {
		icon = (
			<Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
		);
		message = "Loading face detection models...";
	} else if (isDragAccept) {
		icon = (
			<CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-600 dark:text-green-400" />
		);
		message = "All files will be accepted!";
	} else if (isDragReject) {
		icon = (
			<AlertCircle className="mx-auto mb-2 h-8 w-8 text-red-600 dark:text-red-400" />
		);
		message = "Some files will be rejected (type or number)!";
	} else if (isProcessingFiles) {
		icon = (
			<Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
		);
		message = "Processing files...";
	} else if (completedImagesCount >= maxImages) {
		icon = (
			<CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-500 dark:text-green-400" />
		);
		message = "Maximum images reached";
	} else {
		icon = (
			<CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-500 dark:text-green-400" />
		);
		message = "Drag & drop files here, or click to select";
	}

	return (
		<div
			{...getRootProps()}
			className={cn(
				"w-full max-w-md cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors",
				isDragActive && !dropzoneDisabled
					? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
					: "border-gray-300 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500",
				isDragAccept && "border-green-500 bg-green-50 dark:bg-green-900/30",
				(isDragReject || dropzoneDisabled) &&
					"cursor-not-allowed border-red-500 bg-red-50 opacity-60 dark:bg-red-900/30",
			)}
		>
			<input {...getInputProps()} />
			{icon}
			<p className="text-gray-600 dark:text-gray-400">{message}</p>
			<p className="text-gray-500 text-xs dark:text-gray-300">
				PNG, JPG, WEBP, HEIC supported.{" "}
				{maxImages - completedImagesCount > 0
					? `Up to ${maxImages - completedImagesCount} more.`
					: "No more images can be added."}
			</p>
		</div>
	);
}
