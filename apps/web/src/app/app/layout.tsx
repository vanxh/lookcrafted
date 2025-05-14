import { AppHeader } from "@/components/app/header";

export default async function AppLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<AppHeader />
			<main>
				<div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
					{children}
				</div>
			</main>
		</div>
	);
}
