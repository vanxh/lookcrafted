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

export default function MagicLinkEmail({
	name = "there",
	magicLink = "https://lookcrafted.com/",
}: {
	name?: string;
	magicLink?: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>Your magic link to log in to LookCrafted</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={{ textAlign: "center" }}>
						<Heading style={heading}>
							Hey {name}, here’s your magic link ✨
						</Heading>
						<Text style={bodyText}>
							Tap the button below to securely log in to your LookCrafted
							account. No passwords needed.
						</Text>

						<Button href={magicLink} style={button}>
							Log In Instantly →
						</Button>

						<Text style={note}>
							This link will expire in 10 minutes. If you didn’t request this,
							you can safely ignore it.
						</Text>
					</Section>

					<Section style={{ marginTop: "40px", textAlign: "center" }}>
						<Text style={footer}>
							Having trouble? Copy and paste this link into your browser:
							<br />
							<a href={magicLink} style={link}>
								{magicLink}
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

const note = {
	fontSize: "14px",
	color: "#6b7280",
	marginTop: "24px",
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

const footer = {
	fontSize: "13px",
	color: "#9ca3af",
};

const link = {
	color: "#f97316",
	wordBreak: "break-all" as const,
	fontSize: "13px",
};
