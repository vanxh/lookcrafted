import Link from "next/link";

import { LoginBranding } from "@/components/auth/login-branding";
import { LoginForm } from "@/components/auth/login-form";

const Logo = () => (
	<div className="mb-4 font-bold text-3xl">
		<Link href="/">LookCrafted</Link>
	</div>
);

export default function LoginPage() {
	return (
		<div className="h-screen w-full overflow-hidden lg:grid lg:grid-cols-2">
			<div className="hidden h-screen lg:block">
				<LoginBranding />
			</div>

			<div className="flex min-h-screen w-full flex-col px-4 pt-6 pb-12 lg:items-center lg:justify-center lg:px-0 lg:pt-0 lg:pb-0">
				<Logo />
				<div className="mx-auto mt-8 grid w-full max-w-sm gap-6 lg:mt-0">
					<div className="grid gap-2 text-center">
						<h1 className="font-bold text-3xl">Login or Sign Up</h1>
						<p className="text-balance text-muted-foreground">
							Access your account or create a new one
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
				</div>
			</div>
		</div>
	);
}
