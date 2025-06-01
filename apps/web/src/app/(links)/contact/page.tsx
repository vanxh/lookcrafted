import { redirect } from "next/navigation";

export default function ContactPage() {
	redirect("mailto:hello@lookcrafted.com");
}
