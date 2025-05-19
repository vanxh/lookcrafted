"use client";

import {
	ClockIcon,
	Edit,
	Heart,
	ImageIcon,
	Maximize2Icon,
	ShirtIcon,
	Sparkles,
	UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function PricingTable({
	onPlanSelect,
}: {
	onPlanSelect?: (plan: string) => void;
}) {
	const router = useRouter();

	onPlanSelect ??= () => {
		router.push("/app");
	};

	return (
		<TooltipProvider>
			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="flex flex-col space-y-1.5 p-6">
						<h3 className="font-semibold text-2xl leading-none tracking-tight">
							Starter
						</h3>
						<p className="text-muted-foreground text-sm">
							Great for trying out AI headshots.
						</p>
					</div>
					<div className="flex flex-grow flex-col p-6 pt-0">
						<div className="mb-4 flex items-baseline gap-2">
							<span className="font-bold text-4xl">$19</span>
							<span className="text-muted-foreground text-sm line-through">
								$29
							</span>
						</div>
						<ul className="mb-6 flex-grow space-y-2 text-muted-foreground text-sm">
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<UserIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Total number of AI headshots you'll receive
									</TooltipContent>
								</Tooltip>
								50 Headshots
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ClockIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Approximate time to generate your AI headshots
									</TooltipContent>
								</Tooltip>
								~15 Mins Generation Time
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ShirtIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Number of different attire options available
									</TooltipContent>
								</Tooltip>
								Choice of 5 Attires
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ImageIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Number of different background options available
									</TooltipContent>
								</Tooltip>
								Choice of 5 Backgrounds
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<Maximize2Icon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Resolution quality of the generated images
									</TooltipContent>
								</Tooltip>
								Standard Resolution
							</li>
						</ul>
						<Button
							variant="outline"
							className="mt-auto w-full"
							onClick={() => onPlanSelect("starter")}
						>
							Get 50 Headshots
						</Button>
					</div>
				</div>

				<div className="relative flex flex-col rounded-lg border-2 border-blue-600 bg-card text-card-foreground shadow-lg">
					<div className="absolute top-[-14px] right-4 inline-flex items-center rounded-full border border-blue-600 bg-blue-600 px-3 py-0.5 font-semibold text-white text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
						<Heart className="mr-1 h-3 w-3 fill-current" />
						Most Popular
					</div>
					<div className="flex flex-col space-y-1.5 p-6">
						<h3 className="font-semibold text-2xl leading-none tracking-tight">
							Basic
						</h3>
						<p className="text-muted-foreground text-sm">
							Essential features for great headshots.
						</p>
					</div>
					<div className="flex flex-grow flex-col p-6 pt-0">
						<div className="mb-4 flex items-baseline gap-2">
							<span className="font-bold text-4xl">$29</span>
							<span className="text-muted-foreground text-sm line-through">
								$39
							</span>
						</div>
						<ul className="mb-6 flex-grow space-y-2 text-muted-foreground text-sm">
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<UserIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Total number of AI headshots you'll receive
									</TooltipContent>
								</Tooltip>
								100 Headshots
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ClockIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Approximate time to generate your AI headshots
									</TooltipContent>
								</Tooltip>
								~15 Mins Generation Time
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ShirtIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Number of different attire options available
									</TooltipContent>
								</Tooltip>
								Choice of 10 Attires
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ImageIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Number of different background options available
									</TooltipContent>
								</Tooltip>
								Choice of 10 Backgrounds
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<Maximize2Icon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Resolution quality of the generated images
									</TooltipContent>
								</Tooltip>
								Standard Resolution
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<Edit className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Credits to make edits to your generated headshots
									</TooltipContent>
								</Tooltip>
								10 Editing Credits
							</li>
						</ul>
						<Button
							className="mt-auto w-full bg-blue-600 text-white hover:bg-blue-700"
							onClick={() => onPlanSelect("basic")}
						>
							Get 100 Headshots
						</Button>
					</div>
				</div>

				<div className="relative flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
					<div className="absolute top-[-14px] right-4 inline-flex items-center rounded-full border bg-secondary px-3 py-0.5 font-semibold text-secondary-foreground text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
						<Sparkles className="mr-1 h-3 w-3 fill-current" />
						Best Value
					</div>
					<div className="flex flex-col space-y-1.5 p-6">
						<h3 className="font-semibold text-2xl leading-none tracking-tight">
							Premium
						</h3>
						<p className="text-muted-foreground text-sm">
							The ultimate package for the best results.
						</p>
					</div>
					<div className="flex flex-grow flex-col p-6 pt-0">
						<div className="mb-4 flex items-baseline gap-2">
							<span className="font-bold text-4xl">$39</span>
							<span className="text-muted-foreground text-sm line-through">
								$49
							</span>
						</div>
						<ul className="mb-6 flex-grow space-y-2 text-muted-foreground text-sm">
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<UserIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Total number of AI headshots you'll receive
									</TooltipContent>
								</Tooltip>
								200 Headshots
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ClockIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Approximate time to generate your AI headshots
									</TooltipContent>
								</Tooltip>
								~15 Mins Generation Time
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ShirtIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										All possible attire options are included
									</TooltipContent>
								</Tooltip>
								All Attires Included
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<ImageIcon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										All possible background options are included
									</TooltipContent>
								</Tooltip>
								All Backgrounds Included
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<Maximize2Icon className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Higher resolution and quality for professional use
									</TooltipContent>
								</Tooltip>
								Enhanced Image Resolution
							</li>
							<li className="flex items-center gap-2">
								<Tooltip>
									<TooltipTrigger>
										<Edit className="h-4 w-4 text-blue-600" />
									</TooltipTrigger>
									<TooltipContent>
										Credits to make edits to your generated headshots
									</TooltipContent>
								</Tooltip>
								20 Editing Credits
							</li>
						</ul>
						<Button
							variant="outline"
							className="mt-auto w-full"
							onClick={() => onPlanSelect("premium")}
						>
							Get 200 Headshots
						</Button>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}
