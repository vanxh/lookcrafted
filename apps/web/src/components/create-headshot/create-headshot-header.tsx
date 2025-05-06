"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BaseHeader } from "@/components/ui/base-header";
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
		<BaseHeader
			rightAction={
				<Button
					variant="ghost"
					size="icon"
					aria-label="Logout"
					onClick={handleLogout}
				>
					<LogOut className="h-5 w-5" />
				</Button>
			}
		>
			<Progress value={progress} className="h-2 w-full [&>div]:bg-blue-600" />
		</BaseHeader>
	);
}
