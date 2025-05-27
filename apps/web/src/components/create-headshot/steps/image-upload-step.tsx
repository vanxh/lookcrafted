"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useDropzone } from "react-dropzone";

import { useFaceApiModels } from "@/hooks/use-face-api-models";
import { useImageUploader } from "@/hooks/use-image-uploader";
import { GlobalImageAlerts } from "./image-upload-parts/global-image-alerts";
import { ImageDropzoneUI } from "./image-upload-parts/image-dropzone-ui";
import { ImageUploadGuidance } from "./image-upload-parts/image-upload-guidance";
import { ImageUploadInstructions } from "./image-upload-parts/image-upload-instructions";
import { ProcessingFileGrid } from "./image-upload-parts/processing-file-grid";

export function ImageUploadStep() {
	const [uploadedImageIds, setUploadedImageIds] = useQueryState(
		"uploadedImageIds",
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const { modelsLoaded, modelLoadingError } = useFaceApiModels();

	const {
		processingFiles,
		processingAlerts,
		addFilesToQueue,
		removeImage,
		isUploading,
		completedImagesCount,
		minImages,
		maxImages,
	} = useImageUploader({
		modelsLoaded,
		initialUploadedImageIds: uploadedImageIds,
		setUploadedImageIds,
	});

	const isProcessingAnyFileNonFinalState = processingFiles.some(
		(pf) =>
			pf.status !== "completed" &&
			pf.status !== "completed_from_url" &&
			pf.status !== "error",
	);

	const dropzoneDisabled =
		!modelsLoaded || completedImagesCount >= maxImages || isUploading || false;

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		onDrop: (acceptedFiles, fileRejections) =>
			addFilesToQueue(acceptedFiles, fileRejections),
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpg", ".jpeg"],
			"image/webp": [".webp"],
			"image/heic": [".heic"],
			"image/heif": [".heif"],
		},
		multiple: true,
		disabled: dropzoneDisabled,
		maxSize: 50 * 1024 * 1024,
	});

	return (
		<div className="space-y-6 p-6">
			<ImageUploadInstructions
				minImages={minImages}
				maxImages={maxImages}
				completedImagesCount={completedImagesCount}
				modelLoadingError={modelLoadingError}
			/>

			<GlobalImageAlerts alerts={processingAlerts} />

			<div className="flex flex-col items-center space-y-4">
				<ImageDropzoneUI
					getRootProps={getRootProps}
					getInputProps={getInputProps}
					isDragActive={isDragActive}
					isDragAccept={isDragAccept}
					isDragReject={isDragReject}
					disabled={dropzoneDisabled}
					completedImagesCount={completedImagesCount}
					maxImages={maxImages}
					modelsLoaded={modelsLoaded}
					isProcessingFiles={isProcessingAnyFileNonFinalState}
				/>

				<ProcessingFileGrid
					files={processingFiles}
					onRemoveImage={removeImage}
				/>
			</div>

			<ImageUploadGuidance />
		</div>
	);
}
