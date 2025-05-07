import React from "react";

import type { ProcessingFile } from "@/hooks/use-image-uploader";
import { ProcessingFileTile } from "./processing-file-tile";

interface ProcessingFileGridProps {
	files: ProcessingFile[];
	onRemoveImage: (fileId: string) => void;
}

export function ProcessingFileGrid({
	files,
	onRemoveImage,
}: ProcessingFileGridProps) {
	if (files.length === 0) {
		return null;
	}

	return (
		<div className="mt-6 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{files.map((file) => (
				<ProcessingFileTile
					key={file.id}
					file={file}
					onRemove={onRemoveImage}
				/>
			))}
		</div>
	);
}
