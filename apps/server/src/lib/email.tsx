import type * as React from "react";
import { Resend } from "resend";

import EmailVerificationEmail from "../emails/email-verification";
import HeadshotAbandonmentEmail from "../emails/headshot-abandonment";
import HeadshotCompletedEmail from "../emails/headshot-completed";
import MagicLinkEmail from "../emails/magic-link";
import OrganizationCreatedEmail from "../emails/organization-created";
import OrganizationInvitationEmail from "../emails/organization-invitation";
import OtpVerificationEmail from "../emails/otp-verification";
import PasswordResetEmail from "../emails/password-reset";
import WelcomeEmail from "../emails/welcome-email";
import { env } from "../env";

const resend = new Resend(env.RESEND_API_KEY);

const fromEmail =
	env.RESEND_FROM_EMAIL || "LookCrafted <lookcrafted@vanxh.dev>";

async function sendEmail(
	to: string,
	subject: string,
	reactElement: React.ReactNode,
	bcc?: string[],
) {
	try {
		const { data, error } = await resend.emails.send({
			from: fromEmail,
			to: to,
			subject: subject,
			// @ts-ignore
			react: reactElement,
			bcc,
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

export async function sendOrganizationCreatedEmail({
	to,
	name,
	organizationName,
	dashboardLink,
}: {
	to: string;
	name?: string;
	organizationName: string;
	dashboardLink: string;
}) {
	return sendEmail(
		to,
		"Your organization has been created",
		<OrganizationCreatedEmail
			ownerName={name}
			organizationName={organizationName}
			dashboardLink={dashboardLink}
		/>,
	);
}

export async function sendOrganizationInvitationEmail({
	to,
	invitedByUsername,
	invitedByEmail,
	teamName,
	inviteLink,
	recipientName,
}: {
	to: string;
	invitedByUsername?: string | null;
	invitedByEmail: string;
	teamName: string;
	inviteLink: string;
	recipientName?: string | null;
}) {
	return sendEmail(
		to,
		"You've been invited to join an organization",
		<OrganizationInvitationEmail
			invitedByUsername={invitedByUsername}
			invitedByEmail={invitedByEmail}
			teamName={teamName}
			inviteLink={inviteLink}
			recipientName={recipientName}
		/>,
	);
}

export async function sendHeadshotCompletedEmail({
	to,
	name,
	headshots,
	headshotGalleryLink,
}: {
	to: string;
	name?: string;
	headshots?: number;
	headshotGalleryLink: string;
}) {
	return sendEmail(
		to,
		"Your AI headshots are ready!",
		<HeadshotCompletedEmail
			name={name}
			headshots={headshots}
			headshotGalleryLink={headshotGalleryLink}
		/>,
		["lookcrafted.com+e376a2314c@invite.trustpilot.com"],
	);
}

export async function sendHeadshotAbandonmentEmail({
	to,
	name,
	discount,
	headshotRequestId,
}: {
	to: string;
	name?: string;
	discount: number;
	headshotRequestId: string;
}) {
	const discountCode = {
		15: "A9WHA3NCZZ",
		30: "AYW21E8M55",
		50: "YTAYML85DU",
	}[discount];

	const checkoutLink = `${env.FRONTEND_URL}/app/headshots/${headshotRequestId}/checkout?discount=${discountCode}`;

	return sendEmail(
		to,
		`Don't miss out! ${discount}% OFF your AI headshots`,
		<HeadshotAbandonmentEmail
			name={name}
			discount={discount}
			checkoutLink={checkoutLink}
		/>,
	);
}
