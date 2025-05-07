import * as faceapi from "face-api.js";
import { useEffect, useState } from "react";

export function useFaceApiModels() {
	const [modelsLoaded, setModelsLoaded] = useState(false);
	const [modelLoadingError, setModelLoadingError] = useState<string | null>(
		null,
	);

	useEffect(() => {
		const loadModels = async () => {
			const MODEL_URL = "/models";
			try {
				await Promise.all([
					faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
					faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
					faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				]);
				setModelsLoaded(true);
				setModelLoadingError(null);
			} catch (error) {
				console.error("Error loading face-api models:", error);
				setModelLoadingError(
					"Could not load face detection models. Please try refreshing.",
				);
				setModelsLoaded(false);
			}
		};
		loadModels();
	}, []);

	return { modelsLoaded, modelLoadingError };
}
