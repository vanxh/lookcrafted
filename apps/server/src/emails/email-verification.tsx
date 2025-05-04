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

export default function EmailVerificationEmail({
	name = "there",
	verifyLink = "https://lookcrafted.com/verify-email?token=xyz",
}: {
	name?: string;
	verifyLink?: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>Verify your LookCrafted email to get started</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={{ textAlign: "center" }}>
						<Heading style={heading}>Verify your email, {name} 👋</Heading>
						<Text style={bodyText}>
							Just one last step! Click the button below to confirm your email
							and activate your LookCrafted account.
						</Text>

						<Button href={verifyLink} style={button}>
							Verify My Email →
						</Button>

						<Text style={note}>
							This link expires in 60 minutes. If you didn’t create a
							LookCrafted account, you can safely ignore this email.
						</Text>
					</Section>

					<Section style={{ marginTop: "40px", textAlign: "center" }}>
						<Text style={footer}>
							Trouble clicking? Copy and paste this link in your browser:
							<br />
							<a href={verifyLink} style={link}>
								{verifyLink}
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
