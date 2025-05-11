import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY as string, {
			api_host: "/ingest",
			ui_host: "https://us.posthog.com",
			person_profiles: "always",
			capture_pageview: false,
		});
	}, []);

	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	);
}

function PostHogPageView() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const posthog = usePostHog();
	const { data: session } = authClient.useSession();

	useEffect(() => {
		if (session) {
			posthog.identify(session.user.id, {
				email: session.user.email,
				name: session.user.name,
			});
		}
	}, [session, posthog]);

	useEffect(() => {
		if (pathname && posthog) {
			let url = window.origin + pathname;
			if (searchParams.toString()) {
				url = `${url}?${searchParams.toString()}`;
			}

			posthog.capture("$pageview", { $current_url: url });
		}
	}, [pathname, searchParams, posthog]);

	return null;
}

function SuspendedPostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageView />
		</Suspense>
	);
}
