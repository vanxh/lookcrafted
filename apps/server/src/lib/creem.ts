import crypto from "node:crypto";
import { Creem } from "creem";

import { env } from "../env";

const creem = new Creem({});

export const createCreemCheckout = async ({
	plan,
	headshotRequestId,
	email,
	userId,
	referral,
	discount,
}: {
	plan: "starter" | "basic" | "premium";
	headshotRequestId: string;
	email: string;
	userId: string;
	referral?: string;
	discount?: string;
}) => {
	const productId = {
		starter: env.CREEM_STARTER_PRODUCT_ID,
		basic: env.CREEM_BASIC_PRODUCT_ID,
		premium: env.CREEM_PREMIUM_PRODUCT_ID,
	}[plan];

	if (!productId) {
		throw new Error("Invalid plan");
	}

	const checkout = await creem.createCheckout({
		createCheckoutRequest: {
			productId,
			successUrl: `${env.FRONTEND_URL}/app/headshots/${headshotRequestId}`,
			customer: {
				email,
			},
			metadata: {
				headshotRequestId,
				userId,
				plan,
				...(referral ? { affonso_referral: referral } : {}),
			},
			discountCode: discount,
		},
		xApiKey: env.CREEM_API_KEY,
	});

	return checkout;
};

export const generateCreemSignature = (payload: string): string => {
	const computedSignature = crypto
		.createHmac("sha256", env.CREEM_WEBHOOK_SECRET)
		.update(payload)
		.digest("hex");
	return computedSignature;
};

export type CreemCheckoutCompletedEvent = {
	id: string;
	eventType: "checkout.completed";
	created_at: number;
	object: {
		id: string;
		object: "checkout";
		request_id: string;
		order: {
			id: string;
			customer: string;
			product: string;
			amount: number;
			currency: "USD" | "EUR";
			status: "paid" | string;
			type: "recurring" | string;
			created_at: string;
			updated_at: string;
			mode: "local" | string;
		};
		product: {
			id: string;
			name: string;
			description: string;
			image_url: string | null;
			price: number;
			currency: "USD" | "EUR";
			billing_type: "recurring" | string;
			billing_period: "every-month" | string;
			status: "active" | string;
			tax_mode: "exclusive" | string;
			tax_category: "saas" | string;
			default_success_url: string;
			created_at: string;
			updated_at: string;
			mode: "local" | string;
		};
		customer: {
			id: string;
			object: "customer";
			email: string;
			name: string;
			country: string;
			created_at: string;
			updated_at: string;
			mode: "local" | string;
		};
		custom_fields: [];
		status: "completed";
		metadata: {
			internal_customer_id: string;
			[key: string]: string;
		};
		mode: "local" | string;
	};
};
