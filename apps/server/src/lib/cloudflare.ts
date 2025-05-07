import { betterFetch } from "@better-fetch/fetch";

import { env } from "../env";

export const getSignedUrl = async (
	userId: string,
	metadata?: Record<string, string>,
) => {
	const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`;

	const formData = new FormData();
	// formData.append("requireSignedURLs", "true");
	if (metadata) {
		formData.append("metadata", JSON.stringify({ ...metadata, userId }));
	} else {
		formData.append("metadata", JSON.stringify({ userId }));
	}

	// Use native fetch to avoid form-data issues
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
		},
		body: formData,
	});

	if (!res.ok) {
		throw new Error("Unable to get signed URL");
	}

	const data = (await res.json()) as {
		result: {
			uploadURL: string;
			id: string;
		};
	};

	return {
		signedUrl: data.result.uploadURL,
		imageId: data.result.id,
	};
};

export const deleteImage = async (imageId: string) => {
	const url = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${imageId}`;

	const { data, error } = await betterFetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
		},
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
