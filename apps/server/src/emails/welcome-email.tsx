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

export default function WelcomeEmail({ name = "there" }: { name?: string }) {
	return (
		<Html>
			<Head />
			<Preview>You're in! Start crafting AI headshots with LookCrafted</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={{ textAlign: "center" }}>
						<Img
							src="https://lookcrafted.com/logo.png"
							alt="LookCrafted Logo"
							width="130"
							style={{ margin: "0 auto", borderRadius: "8px" }}
						/>
						<Heading style={heading}>Welcome to LookCrafted, {name} 👋</Heading>
						<Text style={subheading}>
							You're moments away from stunning, studio-quality AI headshots.
						</Text>
						<Text style={bodyText}>
							Upload your selfies, pick your favorite looks, and let our AI do
							the rest. You’ll get 100+ beautiful, professional-grade photos—no
							studio needed.
						</Text>
						<Button href="https://lookcrafted.com/" style={button}>
							Get Started →
						</Button>
					</Section>

					<Section style={{ marginTop: "40px", textAlign: "center" }}>
						<Text style={footer}>
							✨ Need help? Just reply to this email or visit our{" "}
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
	fontSize: "14px",
	color: "#6b7280",
};

const link = {
	color: "#f97316",
	textDecoration: "underline",
};
