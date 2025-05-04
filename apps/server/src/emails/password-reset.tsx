import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";

export default function PasswordResetEmail({
	name = "there",
	resetLink = "https://lookcrafted.com/reset-password?token=xyz",
}: {
	name?: string;
	resetLink?: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>Reset your LookCrafted password</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={{ textAlign: "center" }}>
						<Heading style={heading}>Reset your password, {name}</Heading>
						<Text style={bodyText}>
							It looks like you requested to reset your LookCrafted password. No
							worries — just click below and choose a new one.
						</Text>

						<Button href={resetLink} style={button}>
							Reset Password →
						</Button>

						<Text style={note}>
							If you didn’t request this, you can safely ignore this email. This
							link will expire in 60 minutes for security.
						</Text>
					</Section>

					<Section style={{ marginTop: "40px", textAlign: "center" }}>
						<Text style={footer}>
							Having trouble? Copy and paste this link into your browser:
							<br />
							<a href={resetLink} style={link}>
								{resetLink}
							</a>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#fffdf9",
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
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

const heading = {
	fontSize: "22px",
	marginBottom: "16px",
	fontWeight: "bold" as const,
	color: "#111827",
};

const bodyText = {
	fontSize: "16px",
	color: "#374151",
	lineHeight: "1.6",
	marginBottom: "24px",
};

const button = {
	backgroundColor: "#f97316",
	color: "#ffffff",
	fontSize: "16px",
	padding: "14px 28px",
	borderRadius: "8px",
	textDecoration: "none",
	display: "inline-block",
};

const note = {
	fontSize: "14px",
	color: "#6b7280",
	marginTop: "24px",
};

const footer = {
	fontSize: "13px",
	color: "#9ca3af",
};

const link = {
	color: "#f97316",
	wordBreak: "break-all" as const,
	fontSize: "13px",
};
