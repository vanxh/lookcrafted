import {
	CalendarDays,
	Camera,
	CheckCircle,
	EyeOff,
	Filter,
	ImageOff,
	Sun,
	Type,
	Users,
	XCircle,
} from "lucide-react";
import Image from "next/image";

interface GuidanceItem {
	id: string;
	image: string;
	itemIcon: React.ElementType;
	itemTitle: string;
	description: string;
	isRequirement: boolean;
}

const photoGuidanceItems: GuidanceItem[] = [
	// Requirements
	{
		id: "bright-clear-face",
		image: "image-upload-guidance/bright-face.webp",
		itemIcon: Sun,
		itemTitle: "Bright & Clear Face",
		description:
			"Ensure your face is well-illuminated and in sharp focus. Avoid shadows or blurriness.",
		isRequirement: true,
	},
	{
		id: "just-you",
		image: "image-upload-guidance/just-you.webp",
		itemIcon: Users,
		itemTitle: "Just You in Frame",
		description:
			"The photo should only contain you. No other people, pets, or distracting objects.",
		isRequirement: true,
	},
	{
		id: "current-look",
		image: "image-upload-guidance/current-look.webp",
		itemIcon: CalendarDays,
		itemTitle: "Reflect Your Current Look",
		description:
			"Use recent photos that show your present hairstyle, facial features, and general appearance.",
		isRequirement: true,
	},
	{
		id: "plain-background",
		image: "image-upload-guidance/plain-background.webp",
		itemIcon: Camera,
		itemTitle: "Plain Background Preferred",
		description:
			"Simple, non-busy backgrounds work best to keep the attention on your face.",
		isRequirement: true,
	},
	// Restrictions
	{
		id: "no-low-quality",
		image: "image-upload-guidance/no-low-quality.webp",
		itemIcon: Filter,
		itemTitle: "No Low Quality",
		description:
			"We only accept high-quality images. Please ensure your photos are clear and in focus.",
		isRequirement: false,
	},
	{
		id: "face-uncovered",
		image: "image-upload-guidance/face-uncovered.webp",
		itemIcon: EyeOff,
		itemTitle: "Keep Face Uncovered",
		description:
			"Do not wear sunglasses, hats obscuring your eyes/forehead, or other items that hide your face.",
		isRequirement: false,
	},
	{
		id: "no-awkward-crops",
		image: "image-upload-guidance/no-awkward-crops.webp",
		itemIcon: ImageOff,
		itemTitle: "Avoid Awkward Crops",
		description:
			"Steer clear of extreme close-ups that distort features or photos where parts of your head are cut off.",
		isRequirement: false,
	},
	{
		id: "no-revealing-clothes",
		image: "image-upload-guidance/no-revealing-clothes.webp",
		itemIcon: Type,
		itemTitle: "No Revealing Clothes",
		description:
			"Do not wear revealing clothes. We only accept photos where your face is well-lit and in focus.",
		isRequirement: false,
	},
];

export function ImageUploadGuidance() {
	const requirements = photoGuidanceItems.filter(
		(item: GuidanceItem) => item.isRequirement,
	);
	const restrictions = photoGuidanceItems.filter(
		(item: GuidanceItem) => !item.isRequirement,
	);

	return (
		<div className="space-y-8 pt-4">
			<div className="rounded-xl bg-green-50 p-6 shadow-sm dark:bg-green-900/20">
				<div className="mb-6 flex items-center">
					<CheckCircle className="mr-3 h-7 w-7 text-green-600" />
					<h3 className="font-semibold text-gray-800 text-xl dark:text-green-300">
						Photo Requirements
					</h3>
				</div>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{requirements.map((item: GuidanceItem) => {
						const ItemIcon = item.itemIcon;
						return (
							<div key={item.id} className="text-left">
								<div className="relative mb-2 w-full overflow-hidden rounded-lg">
									<Image
										src={`/${item.image}`}
										alt={item.itemTitle}
										layout="responsive"
										width={3}
										height={4}
										className="aspect-[3/4] rounded-lg object-cover"
									/>
								</div>
								<div className="mt-3 flex items-center">
									<ItemIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
									<h4 className="font-semibold text-gray-700 dark:text-gray-300">
										{item.itemTitle}
									</h4>
								</div>
								<p className="mt-1 text-gray-500 text-xs dark:text-gray-400">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className="rounded-xl bg-red-50 p-6 shadow-sm dark:bg-red-900/20">
				<div className="mb-6 flex items-center">
					<XCircle className="mr-3 h-7 w-7 text-red-600" />
					<h3 className="font-semibold text-gray-800 text-xl dark:text-red-300">
						Photo Restrictions
					</h3>
				</div>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{restrictions.map((item: GuidanceItem) => {
						const ItemIcon = item.itemIcon;
						return (
							<div key={item.id} className="text-left">
								<div className="relative mb-2 w-full overflow-hidden rounded-lg">
									<Image
										src={`/${item.image}`}
										alt={item.itemTitle}
										layout="responsive"
										width={3}
										height={4}
										className="aspect-[3/4] rounded-lg object-cover"
									/>
								</div>
								<div className="mt-3 flex items-center">
									<ItemIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
									<h4 className="font-semibold text-gray-700 dark:text-gray-300">
										{item.itemTitle}
									</h4>
								</div>
								<p className="mt-1 text-gray-500 text-xs dark:text-gray-400">
									{item.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
