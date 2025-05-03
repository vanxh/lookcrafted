import type * as React from "react";
import { Resend } from "resend";

import EmailVerificationEmail from "../../emails/email-verification";
import MagicLinkEmail from "../../emails/magic-link";
import OtpVerificationEmail from "../../emails/otp-verification";
import PasswordResetEmail from "../../emails/password-reset";
import WelcomeEmail from "../../emails/welcome-email";
import { env } from "../env.js";

const resend = new Resend(env.RESEND_API_KEY);

const fromEmail =
	env.RESEND_FROM_EMAIL || "LookCrafted <lookcrafted@vanxh.dev>";

async function sendEmail(
	to: string,
	subject: string,
	reactElement: React.ReactNode,
) {
	try {
		const { data, error } = await resend.emails.send({
			from: fromEmail,
			to: to,
			subject: subject,
			react: reactElement,
		});

		if (error) {
			console.error(`Error sending email to ${to}:`, error);
			return { data: null, error };
		}

		console.log(`Email sent successfully to ${to}: ${data?.id}`);
		return { data, error: null };
	} catch (error) {
		console.error(`Exception sending email to ${to}:`, error);
		return {
			data: null,
			error:
				error instanceof Error
					? error
					: new Error("Unknown error sending email"),
		};
	}
}

export async function sendVerificationEmail({
	to,
	name,
	verifyLink,
}: {
	to: string;
	name?: string;
	verifyLink: string;
}) {
	return sendEmail(
		to,
		"Verify your email for LookCrafted",
		<EmailVerificationEmail name={name} verifyLink={verifyLink} />,
	);
}

export async function sendPasswordResetEmail({
	to,
	name,
	resetLink,
}: {
	to: string;
	name?: string;
	resetLink: string;
}) {
	return sendEmail(
		to,
		"Reset your LookCrafted password",
		<PasswordResetEmail name={name} resetLink={resetLink} />,
	);
}

export async function sendWelcomeEmail({
	to,
	name,
}: { to: string; name?: string }) {
	return sendEmail(to, "Welcome to LookCrafted!", <WelcomeEmail name={name} />);
}

export async function sendMagicLinkEmail({
	to,
	name,
	magicLink,
}: {
	to: string;
	name?: string;
	magicLink: string;
}) {
	return sendEmail(
		to,
		"Your LookCrafted Login Link",
		<MagicLinkEmail name={name} magicLink={magicLink} />,
	);
}

export async function sendOtpVerificationEmail({
	to,
	name,
	otp,
}: {
	to: string;
	name?: string;
	otp: string;
}) {
	return sendEmail(
		to,
		"Your LookCrafted Verification Code",
		<OtpVerificationEmail name={name} otp={otp} />,
	);
}
