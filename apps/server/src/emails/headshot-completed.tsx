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

interface HeadshotCompletedEmailProps {
	name?: string;
	headshots?: number;
	headshotGalleryLink: string;
	gender?: string;
	ageGroup?: string;
}

export default function HeadshotCompletedEmail({
	name = "there",
	headshots = 20,
	headshotGalleryLink = "https://lookcrafted.com/app/headshots/123",
	gender = "professional",
	ageGroup = "",
}: HeadshotCompletedEmailProps) {
	const title = `Your ${gender} ${ageGroup} headshots are ready!`;

	return (
		<Html>
			<Head />
			<Preview>Your AI headshots are ready to view! ✨</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={{ textAlign: "center" }}>
						<Img
							src="https://lookcrafted.com/logo.png"
							alt="LookCrafted Logo"
							width="130"
							style={{ margin: "0 auto", borderRadius: "8px" }}
						/>
						<Heading style={heading}>{title}</Heading>
						<Text style={subheading}>
							Your AI headshots have been successfully generated
						</Text>
						<Text style={bodyText}>
							Hi {name},
							<br />
							<br />
							Great news! We've just finished generating your professional AI
							headshots. You now have {headshots} unique images ready to view
							and download.
							<br />
							<br />
							Your headshots are stored in your account for 90 days. Make sure
							to download any favorites to keep them permanently.
						</Text>
						<Button href={headshotGalleryLink} style={button}>
							View My Headshots →
						</Button>

						<Text style={note}>
							Remember, you can favorite your best shots to easily find them
							later, regenerate additional variations, or create entirely new
							headshots from your LookCrafted dashboard.
						</Text>
					</Section>

					<Section style={{ marginTop: "40px", textAlign: "center" }}>
						<Text style={footer}>
							Need help? Visit our{" "}
							<a href="https://lookcrafted.com/" style={link}>
								Help Center
							</a>{" "}
							or reply to this email with any questions.
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
	marginBottom: "32px",
};

const previewImagesContainer = {
	marginTop: "24px",
	marginBottom: "24px",
};

const previewText = {
	fontSize: "16px",
	color: "#374151",
	marginBottom: "16px",
	textAlign: "center" as const,
};

const imagePlaceholder = {
	width: "100%",
	height: "200px",
	backgroundColor: "#f3f4f6",
	borderRadius: "8px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const imagePlaceholderText = {
	color: "#9ca3af",
	fontSize: "14px",
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
