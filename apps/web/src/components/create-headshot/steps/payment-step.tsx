import { useRouter, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";

import { PricingTable } from "@/components/landing/pricing-table";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

export function PaymentStep() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const headshotId = searchParams.get("id");

	const posthog = usePostHog();

	const { data: session } = authClient.useSession();

	const handleCheckout = async (plan: string) => {
		if (!session) {
			console.error("User not authenticated");
			return;
		}

		if (!headshotId) {
			console.error("Headshot ID not found in URL parameters");
			return;
		}

		posthog.capture("checkout_started", {
			headshotId,
			plan,
			userId: session.user.id,
		});

		// @ts-expect-error
		window.Affonso.signup(session.user.email);

		// @ts-expect-error
		const referralId = window.affonso_referral;

		// await authClient.checkout({
		// 	slug: plan,
		// 	metadata: {
		// 		headshotRequestId: headshotId,
		// 		userId: session.user.id,
		// 		plan,

		// 		affonso_referral: referralId,
		// 	},
		// });

		const checkoutUrl = `${env.NEXT_PUBLIC_SERVER_URL}/v1/headshots/${headshotId}/checkout?plan=${plan}&referral=${referralId}`;
		void router.push(checkoutUrl);
	};

	return (
		<div className="container mx-auto max-w-6xl px-4 py-8">
			<div className="mb-8 text-center">
				<h1 className="mb-4 font-bold text-3xl">Choose Your Plan</h1>
				<p className="mx-auto max-w-3xl text-lg text-muted-foreground">
					Select the package that best fits your needs to generate your
					professional AI headshots.
				</p>
			</div>

			<PricingTable onPlanSelect={handleCheckout} />
		</div>
	);
}
