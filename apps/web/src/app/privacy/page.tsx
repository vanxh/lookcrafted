import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy - LookCrafted",
	description: "Read the Privacy Policy for LookCrafted AI headshots.",
};

export default function PrivacyPage() {
	return (
		<div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
			<h1 className="mb-6 font-bold text-3xl sm:text-4xl">Privacy Policy</h1>
			<p className="mb-8 text-muted-foreground text-sm">
				Last Updated: {new Date().toLocaleDateString()}
			</p>

			<div className="prose prose-zinc dark:prose-invert mx-auto max-w-none">
				<p>
					Welcome to LookCrafted ("we," "us," or "our"). We are committed to
					protecting your privacy. This Privacy Policy explains how we collect,
					use, disclose, and safeguard your information when you visit our
					website [Your Website URL, e.g., www.lookcrafted.com] (the "Site") and
					use our AI headshot generation services (the "Service"). Please read
					this privacy policy carefully. If you do not agree with the terms of
					this privacy policy, please do not access the site or use the service.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					1. Information We Collect
				</h2>
				<p>
					We may collect information about you in a variety of ways. The
					information we may collect via the Site and Service includes:
				</p>
				<h3 className="mt-6 mb-3 font-medium text-xl">Personal Data</h3>
				<p>
					Personally identifiable information, such as your name, email address,
					payment information, and the photographs you upload for headshot
					generation, that you voluntarily give to us when you register with the
					Site, purchase the Service, or when you choose to participate in
					various activities related to the Site and our Service.
				</p>
				<h3 className="mt-6 mb-3 font-medium text-xl">Uploaded Images</h3>
				<p>
					The photographs you upload are necessary for the Service to function.
					We use these images solely for the purpose of generating your AI
					headshots. [**Specify how long you retain these images and if they are
					used for model training - BE VERY CLEAR AND TRANSPARENT HERE.**
					Example: We temporarily store uploaded images only for the duration
					needed to process your request and generate the headshots. They are
					deleted [ timeframe, e.g., within 24 hours] after successful
					generation and are NOT used for training our AI models unless you
					explicitly consent.]
				</p>
				<h3 className="mt-6 mb-3 font-medium text-xl">Usage Data</h3>
				<p>
					Information our servers automatically collect when you access the
					Site, such as your IP address, your browser type, your operating
					system, your access times, and the pages you have viewed directly
					before and after accessing the Site.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					2. How We Use Your Information
				</h2>
				<p>
					Having accurate information permits us to provide you with a smooth,
					efficient, and customized experience. Specifically, we may use
					information collected about you via the Site or our Service to:
				</p>
				<ul>
					<li>Create and manage your account.</li>
					<li>Process your transactions and deliver the Service.</li>
					<li>Email you regarding your account or order.</li>
					<li>Improve the efficiency and operation of the Site and Service.</li>
					<li>
						Monitor and analyze usage and trends to improve your experience.
					</li>
					<li>
						Prevent fraudulent transactions, monitor against theft, and protect
						against criminal activity.
					</li>
					<li>Respond to customer service requests.</li>
				</ul>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					3. Disclosure of Your Information
				</h2>
				<p>
					We may share information we have collected about you in certain
					situations. Your information may be disclosed as follows:
				</p>
				<ul>
					<li>
						<strong>By Law or to Protect Rights:</strong> If we believe the
						release of information about you is necessary to respond to legal
						process, to investigate or remedy potential violations of our
						policies, or to protect the rights, property, and safety of others,
						we may share your information as permitted or required by any
						applicable law, rule, or regulation.
					</li>
					<li>
						<strong>Third-Party Service Providers:</strong> We may share your
						information with third parties that perform services for us or on
						our behalf, including payment processing, data analysis, email
						delivery, hosting services, customer service, and [mention specific
						AI model providers if applicable and if they process data].
					</li>
					<li>
						<strong>Business Transfers:</strong> We may share or transfer your
						information in connection with, or during negotiations of, any
						merger, sale of company assets, financing, or acquisition of all or
						a portion of our business to another company.
					</li>
				</ul>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">4. Data Security</h2>
				<p>
					We use administrative, technical, and physical security measures to
					help protect your personal information. While we have taken reasonable
					steps to secure the personal information you provide to us, please be
					aware that despite our efforts, no security measures are perfect or
					impenetrable, and no method of data transmission can be guaranteed
					against any interception or other type of misuse.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					5. Your Data Rights
				</h2>
				<p>
					Depending on your location, you may have certain rights regarding your
					personal information, such as the right to access, correct, delete, or
					restrict the processing of your data. [**This section needs
					significant customization based on applicable laws like GDPR, CCPA,
					etc.** You should specify the rights available and how users can
					exercise them, e.g., by contacting your support email.]
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">6. Data Retention</h2>
				<p>
					We will retain your personal information only for as long as is
					necessary for the purposes set out in this Privacy Policy [and to
					comply with our legal obligations]. Uploaded images are retained as
					described in Section 1.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					7. Children's Privacy
				</h2>
				<p>
					Our Service is not intended for individuals under the age of [Specify
					age, e.g., 13 or 16 depending on jurisdiction]. We do not knowingly
					collect personal information from children. If we become aware that we
					have collected personal information from a child without verification
					of parental consent, we take steps to remove that information from our
					servers.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">
					8. Changes to This Privacy Policy
				</h2>
				<p>
					We may update this Privacy Policy from time to time. We will notify
					you of any changes by posting the new Privacy Policy on this page and
					updating the "Last Updated" date. You are advised to review this
					Privacy Policy periodically for any changes.
				</p>

				<h2 className="mt-8 mb-4 font-semibold text-2xl">9. Contact Us</h2>
				<p>
					If you have questions or comments about this Privacy Policy, please
					contact us at: vanxh@lookcrafted.com
				</p>
			</div>
		</div>
	);
}
