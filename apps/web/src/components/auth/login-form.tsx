"use client";

import { useMutation } from "@tanstack/react-query";
import { KeyRound, Loader2, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import Google from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const callbackURL = searchParams.get("callbackURL") ?? "/app";

	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [otpSent, setOtpSent] = useState(false);

	const isValidEmail = emailRegex.test(email);

	const googleSignInMutation = useMutation({
		mutationFn: () =>
			authClient.signIn.social({
				provider: "google",
				callbackURL: `${window.location.origin}/${callbackURL}`,
			}),
		onSuccess: () => {
			toast.success("Google login initiated!");
		},
		onError: (error: Error) => {
			console.error("Google Sign-In Error:", error);
			toast.error("Google login failed. Please try again.");
		},
	});

	const sendOtpMutation = useMutation({
		mutationFn: () =>
			authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" }),
		onSuccess: () => {
			toast.success(`OTP sent to ${email}!`);
			setOtpSent(true);
		},
		onError: (error: Error) => {
			console.error("Send OTP Error:", error);
			toast.error("Failed to send OTP. Please try again.");
		},
	});

	const sendMagicLinkMutation = useMutation({
		mutationFn: () => authClient.signIn.magicLink({ email, callbackURL }),
		onSuccess: () => {
			toast.success(`Magic link sent to ${email}!`);
		},
		onError: (error: Error) => {
			console.error("Send Magic Link Error:", error);
			toast.error("Failed to send magic link. Please try again.");
		},
	});

	const verifyOtpMutation = useMutation({
		mutationFn: () => authClient.signIn.emailOtp({ email, otp }),
		onSuccess: () => {
			toast.success("OTP Verified! Logging in...");
			router.push(callbackURL);
		},
		onError: (error: Error) => {
			console.error("Verify OTP Error:", error);
			toast.error("Invalid or expired OTP. Please try again.");
		},
	});

	const handleSendOtp = () => {
		if (!isValidEmail)
			return toast.error("Please enter a valid email address.");
		sendOtpMutation.mutate();
	};

	const handleSendMagicLink = () => {
		if (!isValidEmail)
			return toast.error("Please enter a valid email address.");
		sendMagicLinkMutation.mutate();
	};

	const handleVerifyOtp = () => {
		if (otp.length !== 6) return toast.error("Please enter the 6-digit code.");
		verifyOtpMutation.mutate();
	};

	const handleGoogleLogin = () => {
		googleSignInMutation.mutate();
	};

	const isAnyLoading =
		googleSignInMutation.isPending ||
		sendOtpMutation.isPending ||
		sendMagicLinkMutation.isPending ||
		verifyOtpMutation.isPending;

	return (
		<div className="space-y-4">
			<Button
				variant="outline"
				className="w-full"
				onClick={handleGoogleLogin}
				disabled={isAnyLoading}
				isLoading={googleSignInMutation.isPending}
			>
				<Google className="mr-2 h-4 w-4" />
				Continue with Google
			</Button>

			<div className="relative my-4">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with Email
					</span>
				</div>
			</div>

			{!otpSent ? (
				<>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={isAnyLoading}
						/>
					</div>

					<div className="flex flex-col space-y-2">
						<Button
							variant="secondary"
							onClick={handleSendOtp}
							disabled={isAnyLoading || !isValidEmail}
							isLoading={sendOtpMutation.isPending}
						>
							<KeyRound className="mr-2 h-4 w-4" />
							Send Code
						</Button>
						<Button
							variant="secondary"
							onClick={handleSendMagicLink}
							disabled={isAnyLoading || !isValidEmail}
							isLoading={sendMagicLinkMutation.isPending}
						>
							<Mail className="mr-2 h-4 w-4" />
							Send Magic Link
						</Button>
					</div>
				</>
			) : (
				<>
					<div className="space-y-2 text-center">
						<Label htmlFor="otp">Enter Code</Label>
						<p className="text-muted-foreground text-sm">
							Enter the 6-digit code sent to {email}
						</p>
						<div className="flex justify-center">
							<InputOTP
								maxLength={6}
								value={otp}
								onChange={(value) => setOtp(value)}
								disabled={verifyOtpMutation.isPending}
							>
								<InputOTPGroup>
									<InputOTPSlot index={0} />
									<InputOTPSlot index={1} />
									<InputOTPSlot index={2} />
									<InputOTPSlot index={3} />
									<InputOTPSlot index={4} />
									<InputOTPSlot index={5} />
								</InputOTPGroup>
							</InputOTP>
						</div>
					</div>

					<Button
						onClick={handleVerifyOtp}
						className="w-full"
						disabled={isAnyLoading || otp.length !== 6}
						isLoading={verifyOtpMutation.isPending}
					>
						Verify
					</Button>
				</>
			)}
		</div>
	);
}
