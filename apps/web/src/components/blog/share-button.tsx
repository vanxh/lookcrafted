"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/lib/blog";

interface ShareButtonProps {
	post: BlogPost;
}

export function ShareButton({ post }: ShareButtonProps) {
	const handleShare = async () => {
		const shareData = {
			title: post.title,
			text: post.excerpt,
			url: `https://lookcrafted.com/blog/${post.slug}`,
		};

		try {
			if (navigator.share && navigator.canShare(shareData)) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.url);
				toast.success("Link copied to clipboard!");
			}
		} catch (error) {
			console.error("Error sharing:", error);
			toast.error("Failed to share. Please copy the URL manually.");
		}
	};

	return (
		<Button variant="outline" size="lg" className="gap-2" onClick={handleShare}>
			<Share2 className="h-4 w-4" />
			Share Article
		</Button>
	);
}
