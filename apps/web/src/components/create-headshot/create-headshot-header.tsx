"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth-client";

interface CreateHeadshotHeaderProps {
	progress: number;
}

export function CreateHeadshotHeader({ progress }: CreateHeadshotHeaderProps) {
	const router = useRouter();

	const handleLogout = async () => {
		await authClient.signOut();
		router.push("/login");
	};

	return (
		<header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
			<Link href="/" className="flex flex-row items-center gap-1">
				<Image src="/logo.png" alt="LookCrafted" width={32} height={32} />
				<span className="font-bold">LookCrafted</span>
			</Link>

			<div className="flex-1 px-4 sm:px-10 md:px-20">
				<Progress
					value={progress}
					className="h-2 w-full [&>div]:bg-orange-500"
				/>
			</div>

			<Button
				variant="ghost"
				size="icon"
				aria-label="Logout"
				onClick={handleLogout}
			>
				<LogOut className="h-5 w-5" />
			</Button>
		</header>
	);
}
