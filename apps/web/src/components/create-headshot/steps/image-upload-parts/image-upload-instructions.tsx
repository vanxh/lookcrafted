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
			<h2 className="font-semibold text-3xl tracking-tight">
				Upload Your Images
			</h2>
			<p className="mt-1.5 text-base text-muted-foreground">
				Please upload {minImages}-{maxImages} clear, front-facing photos of
				yourself.
			</p>
			<p className="mt-1 text-muted-foreground text-xs">
				We suggest uploading at least 8 images to ensure the best results.
			</p>
			<p className="mt-1 text-muted-foreground text-sm">
				{completedImagesCount} / {maxImages} images uploaded successfully.
				{completedImagesCount > 0 && completedImagesCount < minImages && (
					<span className="ml-1 font-medium text-destructive">
						(Minimum {minImages} images required)
					</span>
				)}
			</p>
			{modelLoadingError && (
				<p className="mt-2 flex items-center justify-center text-destructive text-sm">
					<AlertCircle className="mr-1.5 h-4 w-4" /> {modelLoadingError}
				</p>
			)}
		</div>
	);
}
