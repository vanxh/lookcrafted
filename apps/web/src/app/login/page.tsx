import { BadgeCheckIcon, ShieldCheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LoginBranding } from "@/components/auth/login-branding";
import { LoginForm } from "@/components/auth/login-form";
import { cn } from "@/lib/utils";

const Logo = ({
	className,
}: {
	className?: string;
}) => (
	<div className={cn("mb-4 text-left font-bold text-3xl", className)}>
		<Link href="/" className="flex items-center gap-1">
			<Image src="/logo.png" alt="LookCrafted" width={50} height={50} />
			<span className="text-2xl">LookCrafted</span>
		</Link>
	</div>
);

export default function LoginPage() {
	return (
		<div className="h-screen w-full overflow-hidden lg:grid lg:grid-cols-2">
			<div className="hidden h-screen lg:block">
				<LoginBranding />
			</div>

			<div>
				<Logo className="mt-4 ml-4 sm:hidden" />

				<div className="flex min-h-screen w-full flex-col items-start justify-start px-4 pt-6 pb-12 sm:items-center sm:justify-center lg:p-8">
					<div className="sm:mx-auto sm:w-sm">
						<Logo className="hidden sm:block" />
					</div>

					<div className="mt-8 grid w-full gap-6 md:max-w-sm lg:mt-0">
						<div className="grid gap-2 text-center">
							<h1 className="font-bold text-3xl">Your Best Headshots Await</h1>
							<p className="text-balance text-muted-foreground">
								Log in or create an account to get started.
							</p>
						</div>
						<LoginForm />
						<div className="mt-4 text-center text-sm">
							By continuing, you agree to our{" "}
							<Link href="/terms" className="underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="/privacy" className="underline">
								Privacy Policy
							</Link>
							.
						</div>
						<div className="mt-6 space-y-2 text-center text-muted-foreground text-xs">
							<div className="flex items-center justify-center gap-2">
								<ShieldCheckIcon className="h-4 w-4" />
								<span>Security built for peace of mind</span>
							</div>
							<div className="flex items-center justify-center gap-2">
								<BadgeCheckIcon className="h-4 w-4" />
								<span>100% Satisfaction Guarantee</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
