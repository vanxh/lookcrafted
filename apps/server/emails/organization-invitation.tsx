import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface OrganizationInvitationEmailProps {
	invitedByUsername?: string | null;
	invitedByEmail: string;
	teamName: string;
	inviteLink: string;
	recipientName?: string | null;
}

export default function OrganizationInvitationEmail({
	invitedByUsername,
	invitedByEmail,
	teamName,
	inviteLink,
	recipientName,
}: OrganizationInvitationEmailProps) {
	const inviterDisplayName = invitedByUsername || invitedByEmail;
	const previewText = `You've been invited to join ${teamName} on LookCrafted!`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={logoSection}>
						<Img
							src="https://lookcrafted.com/logo.png" // Consistent logo URL
							width="48"
							height="48"
							alt="LookCrafted Logo"
						/>
					</Section>
					<Section style={contentSection}>
						<Heading style={heading}>You're Invited!</Heading>
						<Text style={bodyText}>Hi {recipientName || "there"},</Text>
						<Text style={bodyText}>
							<strong>{inviterDisplayName}</strong> has invited you to join the{" "}
							<strong>{teamName}</strong> organization on LookCrafted.
						</Text>
						<Text style={bodyText}>
							Join the team to collaborate and manage your professional AI
							headshots together.
						</Text>
						<Button style={button} href={inviteLink}>
							Accept Invitation
						</Button>
						<Text style={note}>Invited by: {invitedByEmail}</Text>
						<Text style={note}>
							If you were not expecting this invitation, you can safely ignore
							this email.
						</Text>
					</Section>
					<Hr style={hr} />
					<Section style={footerSection}>
						<Text style={footer}>
							<Link href="https://lookcrafted.com" style={link}>
								LookCrafted
							</Link>
							, Your AI Headshot Partner
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#fffdf9",
	fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
	padding: "40px 0",
};

const card = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "48px 32px",
	borderRadius: "12px",
	maxWidth: "560px",
	boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
};

const logoSection = {
	textAlign: "center" as const,
	marginBottom: "24px",
};

const contentSection = {
	textAlign: "center" as const,
};

const heading = {
	fontSize: "24px",
	marginBottom: "16px",
	fontWeight: "bold" as const,
	color: "#111827",
};

const bodyText = {
	fontSize: "16px",
	color: "#374151",
	lineHeight: "1.6",
	marginBottom: "16px",
	textAlign: "left" as const,
};

const button = {
	backgroundColor: "#f97316",
	color: "#ffffff",
	fontSize: "16px",
	padding: "14px 28px",
	borderRadius: "8px",
	textDecoration: "none",
	display: "inline-block",
	marginBottom: "24px",
};

const note = {
	fontSize: "14px",
	color: "#6b7280",
	marginTop: "12px",
	lineHeight: "1.4",
	textAlign: "left" as const,
};

const hr = {
	borderColor: "#e5e7eb",
	margin: "32px 0",
};

const footerSection = {
	textAlign: "center" as const,
};

const footer = {
	fontSize: "13px",
	color: "#9ca3af",
};

const link = {
	color: "#f97316",
	textDecoration: "underline",
};
