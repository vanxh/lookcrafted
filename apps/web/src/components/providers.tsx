"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ORPCContext, orpc, queryClient } from "@/utils/orpc";
import { PostHogProvider } from "./posthog-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			forcedTheme="light"
		>
			<PostHogProvider>
				<QueryClientProvider client={queryClient}>
					<ORPCContext.Provider value={orpc}>
						<NuqsAdapter>{children}</NuqsAdapter>
					</ORPCContext.Provider>
				</QueryClientProvider>
			</PostHogProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
