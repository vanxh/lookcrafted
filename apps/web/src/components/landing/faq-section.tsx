import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
	{
		id: "faq-1",
		question: "What kind of photos should I upload for best results?",
		answer:
			"Variety is key! Upload 8+ clear selfies with different facial expressions, backgrounds, lighting conditions, and angles. Avoid sunglasses, hats, and heavy makeup. The more variety, the better your AI headshots will be.",
	},
	{
		id: "faq-2",
		question: "How does LookCrafted protect my uploaded photos?",
		answer:
			"We prioritize your privacy. Your uploaded photos are used solely to train the AI model for your headshots and are automatically deleted from our servers after 7 days. You can also manually delete them anytime using the 'Delete' button in your account.",
	},
	{
		id: "faq-3",
		question: "What if I'm not satisfied with my AI headshots?",
		answer:
			"We offer a satisfaction guarantee. If you don't receive any headshots you're happy with, contact our support and we'll figure out a solution. Your happiness is our priority.",
	},
	{
		id: "faq-4",
		question: "How long does it take to receive my headshots?",
		answer:
			"Generation times vary by plan. Starter plan typically takes around 45 minutes, Basic around 30 minutes, and Premium around 15 minutes. We'll notify you via email as soon as your headshots are ready.",
	},
	{
		id: "faq-5",
		question: "Can I use the generated headshots for commercial purposes?",
		answer:
			"Absolutely! Once you purchase a plan, you receive full commercial rights and ownership of your generated headshots. Use them for your LinkedIn profile, website, business cards, or any other professional need.",
	},
	{
		id: "faq-6",
		question: "How many 'good' photos will I actually get?",
		answer:
			"AI generation involves some variability. While you'll receive the full number of headshots based on your plan (50, 100, or 200), the number of 'perfect' shots varies. Most customers find at least 10-20 excellent options suitable for professional use. We aim to provide a wide selection to choose from.",
	},
];

export function FaqSection() {
	return (
		<section className="container mx-auto mt-16 max-w-4xl px-4 md:px-6 lg:mt-24">
			<div className="mb-8 text-center">
				<h2 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
					Frequently Asked Questions
				</h2>
				<p className="mt-4 text-lg text-muted-foreground">
					Answers to common questions about our AI headshot service.
				</p>
			</div>
			<Accordion type="single" collapsible className="w-full">
				{faqData.map((item) => (
					<AccordionItem key={item.id} value={item.id}>
						<AccordionTrigger>{item.question}</AccordionTrigger>
						<AccordionContent>{item.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
