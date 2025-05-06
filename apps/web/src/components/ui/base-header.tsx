import Image from "next/image";
import Link from "next/link";
import type * as React from "react";

interface BaseHeaderProps {
	children?: React.ReactNode;
	rightAction?: React.ReactNode;
}

export function BaseHeader({ children, rightAction }: BaseHeaderProps) {
	return (
		<header className="sticky top-0 z-[51] border-b bg-white dark:bg-black">
			<div className="flex h-16 items-center justify-between px-4 md:px-6">
				<Link href="/" className="flex flex-row items-center gap-1">
					<Image src="/logo.png" alt="LookCrafted" width={32} height={32} />
					<span className="font-bold">LookCrafted</span>
				</Link>
				<div className="flex-1 px-4 md:px-6 lg:px-8">{children}</div>
				{rightAction}
			</div>
		</header>
	);
}
