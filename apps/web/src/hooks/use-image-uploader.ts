import { useMutation } from "@tanstack/react-query";
import * as faceapi from "face-api.js";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FileRejection } from "react-dropzone";

import { env } from "@/env";
import { orpc } from "@/utils/orpc";

const MIN_IMAGES_DEFAULT = 8;
const MAX_IMAGES_DEFAULT = 15;

interface FaceDescriptorEntry {
	id: string;
	descriptor: Float32Array;
}

export interface ProcessingFile {
	id: string;
	name: string;
	status:
		| "reading"
		| "validating"
		| "gettingUrl"
		| "uploading"
		| "completed"
		| "error"
		| "completed_from_url";
	dataUrl?: string;
	progress?: number;
	error?: string;
	imageId?: string;
}

interface UseImageUploaderProps {
	modelsLoaded: boolean;
	initialUploadedImageIds: string[];
	setUploadedImageIds: (
		updater: string[] | ((prev: string[]) => string[]),
	) => void;
	minImages?: number;
	maxImages?: number;
}

const createImageElement = (dataUrl: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img: HTMLImageElement = document.createElement("img");
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = dataUrl;
	});
};

export function useImageUploader({
	modelsLoaded,
	initialUploadedImageIds,
	setUploadedImageIds,
	minImages = MIN_IMAGES_DEFAULT,
	maxImages = MAX_IMAGES_DEFAULT,
}: UseImageUploaderProps) {
	const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);
	const [processingAlerts, setProcessingAlerts] = useState<string[]>([]);
	const activeDescriptorsRef = useRef<FaceDescriptorEntry[]>([]);

	const { mutateAsync: getSignedUrl } = useMutation(
		orpc.cloudflare.getSignedUploadUrl.mutationOptions(),
	);
	const { mutateAsync: deleteImageFromCloud } = useMutation(
		orpc.cloudflare.deleteImage.mutationOptions(),
	);

	useEffect(() => {
		const cloudflareHash = env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;

		setProcessingFiles((currentProcessingFiles) => {
			let filesChanged = false;

			let nextProcessingFilesWorkingCopy = [...currentProcessingFiles];

			if (initialUploadedImageIds && initialUploadedImageIds.length > 0) {
				const existingImageIdsInState = new Set(
					nextProcessingFilesWorkingCopy
						.map((f) => f.imageId)
						.filter((id) => id),
				);

				for (const id of initialUploadedImageIds) {
					if (!existingImageIdsInState.has(id)) {
						const imageUrl = `https://imagedelivery.net/${cloudflareHash}/${id}/public`;
						nextProcessingFilesWorkingCopy.push({
							id: id,
							name: "Uploaded Image",
							status: "completed_from_url",
							imageId: id,
							dataUrl: imageUrl,
						});
						filesChanged = true;
					}
				}

				const initialIdsSet = new Set(initialUploadedImageIds);
				const countBeforeFilter = nextProcessingFilesWorkingCopy.length;
				nextProcessingFilesWorkingCopy = nextProcessingFilesWorkingCopy.filter(
					(pf) => {
						if (pf.status === "completed_from_url") {
							return pf.imageId && initialIdsSet.has(pf.imageId);
						}
						return true;
					},
				);

				if (nextProcessingFilesWorkingCopy.length !== countBeforeFilter) {
					filesChanged = true;
				}

				const activeImageIds = new Set(
					nextProcessingFilesWorkingCopy
						.filter(
							(file) =>
								file.status === "completed" ||
								file.status === "completed_from_url",
						)
						.map((file) => file.imageId)
						.filter(Boolean),
				);

				activeDescriptorsRef.current = activeDescriptorsRef.current.filter(
					(entry) => entry.id && activeImageIds.has(entry.id),
				);
			} else if (
				initialUploadedImageIds &&
				initialUploadedImageIds.length === 0
			) {
				const countBeforeFilter = nextProcessingFilesWorkingCopy.length;
				nextProcessingFilesWorkingCopy = nextProcessingFilesWorkingCopy.filter(
					(pf) => pf.status !== "completed_from_url",
				);
				if (nextProcessingFilesWorkingCopy.length !== countBeforeFilter) {
					filesChanged = true;
					activeDescriptorsRef.current = [];
				}
			}

			return filesChanged
				? nextProcessingFilesWorkingCopy
				: currentProcessingFiles;
		});
	}, [initialUploadedImageIds]);

	const updateFileStatus = useCallback(
		(id: string, updates: Partial<ProcessingFile>) => {
			setProcessingFiles((prev) =>
				prev.map((pf) => (pf.id === id ? { ...pf, ...updates } : pf)),
			);
		},
		[],
	);

	const _addNewFileToProcessingList = useCallback(
		(file: File, dataUrl: string) => {
			const newFileEntry: ProcessingFile = {
				id: Date.now().toString(36) + Math.random().toString(36).substring(2),
				name: file.name,
				status: "gettingUrl",
				dataUrl: dataUrl,
			};
			setProcessingFiles((prev) => [...prev, newFileEntry]);
			return newFileEntry;
		},
		[],
	);

	const validateImage = useCallback(
		async (
			imgEl: HTMLImageElement,
			currentDescriptors: FaceDescriptorEntry[],
		): Promise<{
			error?: string;
			success?: boolean;
			descriptor?: Float32Array;
		}> => {
			const detections = await faceapi
				.detectAllFaces(imgEl, new faceapi.TinyFaceDetectorOptions())
				.withFaceLandmarks()
				.withFaceDescriptors();

			if (detections.length === 0) return { error: "No face detected" };
			if (detections.length > 1) return { error: "Multiple faces detected" };

			const detection = detections[0];
			const { box } = detection.detection;
			const faceArea = box.width * box.height;
			const imageArea = imgEl.naturalWidth * imgEl.naturalHeight;
			const faceRatio = faceArea / imageArea;
			if (faceRatio < 0.03) {
				return {
					error:
						"Face is too small or too far. Please ensure face covers at least 3% of the image.",
				};
			}

			for (const prevDescEntry of currentDescriptors) {
				const distance = faceapi.euclideanDistance(
					detection.descriptor,
					prevDescEntry.descriptor,
				);
				if (distance < 0.15)
					return {
						error: "Image too similar to another uploaded image.",
					};
			}
			return { success: true, descriptor: detection.descriptor };
		},
		[],
	);

	const _processSingleFileAfterValidation = useCallback(
		async (fileEntry: ProcessingFile, descriptor?: Float32Array) => {
			if (!fileEntry.dataUrl) {
				updateFileStatus(fileEntry.id, {
					status: "error",
					error: "Missing image data for upload.",
				});
				return;
			}

			try {
				const signedUrlResponse = await getSignedUrl({});

				updateFileStatus(fileEntry.id, {
					status: "uploading",
					imageId: signedUrlResponse.imageId,
					progress: 0,
				});

				const blob = await fetch(fileEntry.dataUrl).then((res) => res.blob());

				await new Promise<void>((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.open("POST", signedUrlResponse.signedUrl, true);
					const formData = new FormData();
					formData.append("file", blob, fileEntry.name);

					xhr.upload.onprogress = (event) => {
						if (event.lengthComputable) {
							const percentComplete = Math.round(
								(event.loaded / event.total) * 100,
							);
							updateFileStatus(fileEntry.id, {
								progress: percentComplete,
							});
						}
					};
					xhr.onload = () => {
						if (xhr.status >= 200 && xhr.status < 300) {
							updateFileStatus(fileEntry.id, {
								status: "completed",
								progress: 100,
							});
							if (descriptor) {
								activeDescriptorsRef.current = [
									...activeDescriptorsRef.current,
									{
										id: signedUrlResponse.imageId,
										descriptor: descriptor,
									},
								].slice(0, maxImages);
							}
							setUploadedImageIds((prev) =>
								[...(prev || []), signedUrlResponse.imageId].slice(
									0,
									maxImages,
								),
							);
							resolve();
						} else {
							reject(
								new Error(`Upload failed: ${xhr.statusText} (${xhr.status})`),
							);
						}
					};
					xhr.onerror = () => reject(new Error("Upload network error."));
					xhr.send(formData);
				});
			} catch (error: unknown) {
				console.error(
					"Error processing file after validation:",
					fileEntry.name,
					error,
				);
				const message =
					error instanceof Error ? error.message : "An unknown error occurred";
				updateFileStatus(fileEntry.id, {
					status: "error",
					error: message,
				});
			}
		},
		[getSignedUrl, updateFileStatus, setUploadedImageIds, maxImages],
	);

	const addFilesToQueue = useCallback(
		async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
			if (!modelsLoaded) {
				setProcessingAlerts([
					"Face detection models not loaded. Please wait or refresh.",
				]);
				return;
			}
			const newAlerts: string[] = [];

			for (const rejection of fileRejections) {
				for (const err of rejection.errors) {
					if (err.code === "file-too-large") {
						newAlerts.push(
							`Error with ${rejection.file.name}: File is too large (max 10MB).`,
						);
					} else {
						newAlerts.push(`Error with ${rejection.file.name}: ${err.message}`);
					}
				}
			}

			const currentCompletedCount = processingFiles.filter(
				(pf) => pf.status === "completed" || pf.status === "completed_from_url",
			).length;

			const filesToProcess = acceptedFiles.slice(
				0,
				maxImages - currentCompletedCount,
			);

			if (
				acceptedFiles.length > filesToProcess.length &&
				filesToProcess.length > 0
			) {
				newAlerts.push(
					`You selected more images than the remaining slots. Only the first ${filesToProcess.length} valid images will be processed.`,
				);
			} else if (
				acceptedFiles.length > 0 &&
				filesToProcess.length === 0 &&
				currentCompletedCount >= maxImages
			) {
				newAlerts.push(
					"Maximum number of images already uploaded. No more images can be added.",
				);
			}

			for (const file of filesToProcess) {
				let dataUrl: string;
				let imgEl: HTMLImageElement;
				let validationResult: Awaited<ReturnType<typeof validateImage>>;

				try {
					dataUrl = await new Promise<string>((resolve, reject) => {
						const reader = new FileReader();
						reader.onloadend = () => resolve(reader.result as string);
						reader.onerror = reject;
						reader.readAsDataURL(file);
					});

					imgEl = await createImageElement(dataUrl);
					validationResult = await validateImage(
						imgEl,
						activeDescriptorsRef.current,
					);

					if (validationResult.error) {
						newAlerts.push(
							`Error with ${file.name}: ${validationResult.error}`,
						);
						continue;
					}
					if (!validationResult.descriptor) {
						newAlerts.push(
							`Error with ${file.name}: Failed to generate face descriptor.`,
						);
						continue;
					}
				} catch (readValidateError: unknown) {
					newAlerts.push(
						`Error processing ${file.name} for validation: ${
							readValidateError instanceof Error
								? readValidateError.message
								: String(readValidateError)
						}`,
					);
					continue;
				}

				const newFileEntry = _addNewFileToProcessingList(file, dataUrl);
				_processSingleFileAfterValidation(
					newFileEntry,
					validationResult.descriptor,
				);
			}
			setProcessingAlerts(newAlerts);
		},
		[
			modelsLoaded,
			processingFiles,
			maxImages,
			validateImage,
			_addNewFileToProcessingList,
			_processSingleFileAfterValidation,
		],
	);

	const removeImage = useCallback(
		async (fileIdToRemove: string) => {
			const fileToRemove = processingFiles.find(
				(pf) => pf.id === fileIdToRemove,
			);
			if (!fileToRemove) return;

			if (fileToRemove.imageId) {
				try {
					await deleteImageFromCloud({
						imageId: fileToRemove.imageId,
					});
				} catch (error) {
					console.error(
						"Failed to delete image from Cloudflare:",
						fileToRemove.imageId,
						error,
					);
				}
				setUploadedImageIds((prev) =>
					(prev || []).filter((id) => id !== fileToRemove.imageId),
				);

				activeDescriptorsRef.current = activeDescriptorsRef.current.filter(
					(entry) => entry.id !== fileToRemove.imageId,
				);
			}

			setProcessingFiles((prev) =>
				prev.filter((pf) => pf.id !== fileIdToRemove),
			);
		},
		[processingFiles, deleteImageFromCloud, setUploadedImageIds],
	);

	const completedImagesCount = processingFiles.filter(
		(pf) => pf.status === "completed" || pf.status === "completed_from_url",
	).length;

	const isUploadingSomeFile = processingFiles.some(
		(pf) => pf.status === "uploading" || pf.status === "gettingUrl",
	);

	return {
		processingFiles,
		processingAlerts,
		addFilesToQueue,
		removeImage,
		isUploading: isUploadingSomeFile,
		completedImagesCount,
		minImages,
		maxImages,
	};
}
