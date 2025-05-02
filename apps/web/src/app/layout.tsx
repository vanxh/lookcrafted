import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";

import "../index.css";

import Providers from "@/components/providers";

const instrumentSans = Instrument_Sans({
	variable: "--font-instrument-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title:
		"The #1 AI Headshot Generator for Professional Headshots | LookCrafted",
	description:
		"LookCrafted is the leading AI headshot generator for stunning, studio-quality photos. Upload selfies and get 100+ professional headshots in minutes — perfect for LinkedIn, resumes, and more.",
	keywords: [
		"AI headshots",
		"professional headshots",
		"LinkedIn headshot generator",
		"studio-quality headshots",
		"AI photo generator",
		"headshot generator",
		"AI avatar",
		"LookCrafted",
		"4K headshots",
		"AI headshot generator",
		"Photo AI",
		"AI photo generator",
	],
	openGraph: {
		title:
			"The #1 AI Headshot Generator for Professional Headshots | LookCrafted",
		description:
			"Get studio-quality AI headshots in minutes. Upload selfies, choose styles, and download 100+ professional headshots for LinkedIn, resumes, and more.",
		url: "https://lookcrafted.com",
		siteName: "LookCrafted",
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "The #1 AI Headshot Generator for Professional Headshots",
		description:
			"Create stunning AI headshots from your selfies. Trusted by professionals, ready in minutes. Try LookCrafted today.",
		creator: "@vanxhh",
	},
	metadataBase: new URL("https://lookcrafted.com"),
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className="scroll-smooth">
			<body
				className={`${instrumentSans.variable} font-instrument-sans antialiased`}
			>
				<Providers>
					<div className="grid h-svh grid-rows-[auto_1fr]">{children}</div>
				</Providers>

				<Analytics />
			</body>
		</html>
	);
}
