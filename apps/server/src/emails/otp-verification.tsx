import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";

export default function OtpVerificationEmail({
	name = "there",
	otp = "123456",
}: {
	name?: string;
	otp?: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>Your LookCrafted verification code</Preview>
			<Body style={main}>
				<Container style={card}>
					<Section style={{ textAlign: "center" }}>
						<Heading style={heading}>Verify your LookCrafted account</Heading>
						<Text style={bodyText}>
							Hi {name},<br />
							<br />
							Use the code below to verify your email address and complete your
							sign-up process.
						</Text>

						<Text style={otpBox}>{otp}</Text>

						<Text style={note}>
							This code is valid for 5 minutes. If you didn't request this, you
							can safely ignore this email.
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

const otpBox = {
	fontSize: "32px",
	fontWeight: "bold" as const,
	letterSpacing: "4px",
	backgroundColor: "#f3f4f6",
	padding: "16px 24px",
	borderRadius: "8px",
	display: "inline-block",
	marginBottom: "24px",
};

const note = {
	fontSize: "14px",
	color: "#6b7280",
};
