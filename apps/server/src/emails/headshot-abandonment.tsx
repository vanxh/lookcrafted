import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface HeadshotAbandonmentEmailProps {
	name?: string;
	discount: number;
	checkoutLink: string;
}

export default function HeadshotAbandonmentEmail({
	name = "there",
	discount,
	checkoutLink,
}: HeadshotAbandonmentEmailProps) {
	const previewText = `Don't miss out! ${discount}% OFF your AI headshots`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={{ textAlign: "center" }}>
						<Img
							src="https://lookcrafted.com/logo.png"
							alt="LookCrafted Logo"
							width="130"
							style={{ margin: "0 auto", borderRadius: "8px" }}
						/>
						<Heading style={heading}>
							Don't miss out on your AI headshots!
						</Heading>
						<Text style={subheading}>
							Limited time: {discount}% OFF your professional headshots
						</Text>
						<Text style={bodyText}>
							Hi {name},
							<br />
							<br />
							We noticed you started creating your AI headshots but haven't
							completed your order yet.
							<br />
							<br />
							Don't let this opportunity slip away! For a limited time, we're
							offering you <strong>{discount}% OFF</strong> your AI headshot
							package.
						</Text>
						<Button href={checkoutLink} style={button}>
							Complete Your Order - {discount}% OFF →
						</Button>
						<Text style={note}>
							This exclusive discount won't last long. Complete your order now
							and get professional AI headshots that will make you stand out.
						</Text>
					</Section>

					<Section style={{ marginTop: "40px", textAlign: "center" }}>
						<Text style={footer}>
							Need help? Just reply to this email or visit our{" "}
							<a href="https://lookcrafted.com/" style={link}>
								Help Center
							</a>
							.
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
	fontSize: "24px",
	marginTop: "24px",
	marginBottom: "12px",
	fontWeight: "bold" as const,
	color: "#111827",
};

const subheading = {
	fontSize: "16px",
	color: "#f97316",
	marginBottom: "16px",
};

const bodyText = {
	fontSize: "16px",
	color: "#374151",
	lineHeight: "1.6",
	marginBottom: "24px",
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
};

const note = {
	fontSize: "14px",
	color: "#6b7280",
	marginTop: "24px",
	textAlign: "left" as const,
};

const footer = {
	fontSize: "14px",
	color: "#6b7280",
};

const link = {
	color: "#f97316",
	textDecoration: "underline",
};
