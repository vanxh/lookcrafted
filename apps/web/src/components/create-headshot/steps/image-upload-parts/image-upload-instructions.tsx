import { AlertCircle } from "lucide-react";

interface ImageUploadInstructionsProps {
	minImages: number;
	maxImages: number;
	completedImagesCount: number;
	modelLoadingError: string | null;
}

export function ImageUploadInstructions({
	minImages,
	maxImages,
	completedImagesCount,
	modelLoadingError,
}: ImageUploadInstructionsProps) {
	return (
		<div className="text-center">
			<h2 className="font-semibold text-2xl">Upload Your Images</h2>
			<p className="text-gray-600 dark:text-gray-400">
				Please upload {minImages}-{maxImages} clear, front-facing photos.
			</p>
			<p className="text-gray-500 text-sm dark:text-gray-300">
				{completedImagesCount} / {maxImages} images uploaded successfully.
				{completedImagesCount > 0 && completedImagesCount < minImages && (
					<span className="ml-1 text-red-500">
						Minimum {minImages} images required.
					</span>
				)}
			</p>
			{modelLoadingError && (
				<p className="mt-2 flex items-center justify-center text-red-500 dark:text-red-400">
					<AlertCircle className="mr-1 h-4 w-4" /> {modelLoadingError}
				</p>
			)}
		</div>
	);
}
