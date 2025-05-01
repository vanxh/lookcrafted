"use client";
import { ORPCContext, orpc, queryClient } from "@/utils/orpc";
import { QueryClientProvider } from "@tanstack/react-query";
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
		>
			<QueryClientProvider client={queryClient}>
				<ORPCContext.Provider value={orpc}>{children}</ORPCContext.Provider>
			</QueryClientProvider>
			<Toaster richColors />
		</ThemeProvider>
	);
}
