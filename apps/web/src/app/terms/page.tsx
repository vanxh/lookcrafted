import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service - LookCrafted",
	description: "Read the Terms of Service for LookCrafted AI headshots.",
};

export default function TermsPage() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
			<h1 className="mb-6 font-bold text-3xl sm:text-4xl">Terms of Service</h1>
			<p className="mb-8 text-muted-foreground text-sm">
				Last Updated: {new Date().toLocaleDateString()}
			</p>

			<div className="prose prose-zinc dark:prose-invert mx-auto max-w-none">
				<p>
					Welcome to LookCrafted! These Terms of Service ("Terms") govern your
					use of the LookCrafted website (the "Site") and the AI headshot
					generation services offered through the Site (the "Service"). By
					accessing or using the Site or Service, you agree to be bound by these
					Terms.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					1. Service Description
				</h2>
				<p>
					LookCrafted uses artificial intelligence to generate professional
					headshots based on photographs you upload. You select styles and
					preferences, and our AI creates a set of unique headshots for your
					use.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					2. User Responsibilities
				</h2>
				<ul>
					<li>
						You must provide clear, suitable photographs as input for the AI.
						The quality of the generated headshots depends significantly on the
						quality of the input images.
					</li>
					<li>
						You must have the necessary rights and permissions to use the
						photographs you upload.
					</li>
					<li>
						You agree not to use the Service for any unlawful purpose or to
						generate content that is defamatory, obscene, offensive, or
						infringes on the rights of others.
					</li>
				</ul>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					3. Intellectual Property
				</h2>
				<p>
					You retain ownership of the original photographs you upload. Upon
					successful generation and delivery, LookCrafted grants you a
					worldwide, royalty-free, perpetual license to use the generated
					headshots for personal and commercial purposes, subject to these
					Terms. LookCrafted retains ownership of the underlying AI models and
					the Service itself.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">4. Refund Policy</h2>
				<p>
					Due to the nature of digital goods and the computational resources
					required to generate AI headshots, we generally cannot offer refunds
					once the generation process has begun and the headshots have been
					delivered to you.
				</p>
				<ul>
					<li>
						<strong>Non-Refundable:</strong> Payments for successfully generated
						and delivered headshot packages are non-refundable.
					</li>
					<li>
						<strong>Exceptions:</strong> Refunds may be considered on a
						case-by-case basis only in the event of a verifiable technical
						failure on our part that prevents the successful delivery of your
						headshots.
					</li>
					<li>
						<strong>Quality Concerns:</strong> While we strive for high-quality
						results, the subjective nature of AI generation and its dependence
						on input quality mean we cannot offer refunds based solely on
						dissatisfaction with the artistic style or specific likeness of the
						generated headshots, provided they are technically sound and based
						on the images provided.
					</li>
					<li>
						<strong>How to Request:</strong> If you believe you qualify for a
						refund due to a technical failure, please contact our support team
						at vanxh@lookcrafted.com within 7 days of your purchase, providing
						details of the issue.
					</li>
				</ul>
				<p className="text-muted-foreground text-sm">
					<strong>Disclaimer:</strong> This refund policy is a template. Consult
					with legal counsel to ensure compliance and suitability for your
					business.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">5. Disclaimers</h2>
				<p>
					The Service is provided "as is" without warranties of any kind.
					LookCrafted does not guarantee that the generated headshots will be
					perfectly accurate representations or meet all subjective
					expectations.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					6. Limitation of Liability
				</h2>
				<p>
					To the fullest extent permitted by law, LookCrafted shall not be
					liable for any indirect, incidental, special, consequential, or
					punitive damages arising out of or relating to your use of the
					Service.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">7. Governing Law</h2>
				<p>
					These Terms shall be governed by and construed in accordance with the
					laws of India, without regard to its conflict of law principles.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					8. Changes to Terms
				</h2>
				<p>
					LookCrafted reserves the right to modify these Terms at any time. We
					will notify you of significant changes by posting the new Terms on the
					Site. Your continued use of the Service after such changes constitutes
					your acceptance of the new Terms.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					9. Contact Information
				</h2>
				<p>
					If you have any questions about these Terms, please contact us at
					vanxh@lookcrafted.com.
				</p>
			</div>
		</div>
	);
}
