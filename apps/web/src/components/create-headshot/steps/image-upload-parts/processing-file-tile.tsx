import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import type { ProcessingFile } from "@/hooks/use-image-uploader";
import { cn } from "@/lib/utils";

interface ProcessingFileTileProps {
	file: ProcessingFile;
	onRemove: (fileId: string) => void;
}

export function ProcessingFileTile({
	file,
	onRemove,
}: ProcessingFileTileProps) {
	const isError = file.status === "error";
	const isCompleted =
		file.status === "completed" || file.status === "completed_from_url";
	const isProcessing = !isError && !isCompleted;

	return (
		<div
			key={file.id}
			className="group relative aspect-[3/4] overflow-hidden rounded-md bg-gray-100 shadow-md dark:bg-gray-800"
		>
			{!isError && (
				<div className="absolute inset-0 bg-neutral-700 bg-opacity-0 opacity-0 transition-all duration-300 group-hover:bg-opacity-50 group-hover:opacity-100 dark:bg-neutral-800 dark:group-hover:bg-opacity-60" />
			)}

			{file.dataUrl ? (
				<Image
					src={file.dataUrl}
					alt={`Preview ${file.name}`}
					layout="fill"
					objectFit="cover"
					className="rounded-md"
				/>
			) : (
				<div className="flex h-full items-center justify-center">
					<AlertCircle className="h-8 w-8 text-gray-400" />
				</div>
			)}

			<div
				className={cn(
					"absolute inset-0 flex flex-col items-center justify-center bg-black p-1 text-center transition-opacity duration-300",
					isError
						? "bg-opacity-70 opacity-100"
						: "hidden group-hover:flex group-hover:bg-opacity-60 group-hover:opacity-60",
				)}
			>
				{isProcessing && (
					<Loader2 className="mb-1 h-6 w-6 animate-spin text-white" />
				)}
				{isError && <AlertCircle className="mb-1 h-6 w-6 text-red-300" />}
				<p className="break-words text-[10px] text-white leading-tight">
					{file.name} <br />
					Status: {file.status}{" "}
					{file.status === "uploading" &&
						file.progress != null &&
						`${file.progress}%`}
					{file.error && (
						<span className="block text-[9px] text-red-300">{file.error}</span>
					)}
				</p>
			</div>
			{(isCompleted || isError) && (
				<Button
					variant="destructive"
					size="icon"
					onClick={() => onRemove(file.id)}
					className="absolute top-1 right-1 z-10 h-7 w-7 p-1.5"
					aria-label={`Delete image ${file.name}`}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			)}
			{file.status === "uploading" && file.progress != null && (
				<div className="absolute right-0 bottom-0 left-0 z-10 h-1.5 overflow-hidden rounded-b-md bg-gray-200 dark:bg-gray-700">
					<div
						className="h-full bg-blue-500 transition-all duration-150 ease-linear"
						style={{ width: `${file.progress}%` }}
					/>
				</div>
			)}
		</div>
	);
}
