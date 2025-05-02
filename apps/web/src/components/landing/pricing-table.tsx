import { Button } from "@/components/ui/button";
import {
	ClockIcon,
	Heart,
	ImageIcon,
	Maximize2Icon,
	ShirtIcon,
	Sparkles,
	UserIcon,
} from "lucide-react";

export function PricingTable() {
	return (
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
							<UserIcon className="h-4 w-4 text-primary" />
							50 Headshots
						</li>
						<li className="flex items-center gap-2">
							<ClockIcon className="h-4 w-4 text-primary" />
							~45 Mins Generation Time
						</li>
						<li className="flex items-center gap-2">
							<ShirtIcon className="h-4 w-4 text-primary" />
							Choice of 1 Attire
						</li>
						<li className="flex items-center gap-2">
							<ImageIcon className="h-4 w-4 text-primary" />
							Choice of 1 Background
						</li>
						<li className="flex items-center gap-2">
							<Maximize2Icon className="h-4 w-4 text-primary" />
							Standard Resolution
						</li>
					</ul>
					<Button variant="outline" className="mt-auto w-full">
						Get 50 Headshots
					</Button>
				</div>
			</div>

			<div className="relative flex flex-col rounded-lg border-2 border-orange-500 bg-card text-card-foreground shadow-lg">
				<div className="absolute top-[-14px] right-4 inline-flex items-center rounded-full border border-orange-500 bg-orange-500 px-3 py-0.5 font-semibold text-white text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
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
							<UserIcon className="h-4 w-4 text-primary" />
							100 Headshots
						</li>
						<li className="flex items-center gap-2">
							<ClockIcon className="h-4 w-4 text-primary" />
							~30 Mins Generation Time
						</li>
						<li className="flex items-center gap-2">
							<ShirtIcon className="h-4 w-4 text-primary" />
							Choice of 2 Attires
						</li>
						<li className="flex items-center gap-2">
							<ImageIcon className="h-4 w-4 text-primary" />
							Choice of 2 Backgrounds
						</li>
						<li className="flex items-center gap-2">
							<Maximize2Icon className="h-4 w-4 text-primary" />
							Standard Resolution
						</li>
					</ul>
					<Button className="mt-auto w-full bg-orange-500 text-white hover:bg-orange-600">
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
							<UserIcon className="h-4 w-4 text-primary" />
							200 Headshots
						</li>
						<li className="flex items-center gap-2">
							<ClockIcon className="h-4 w-4 text-primary" />
							~15 Mins Generation Time
						</li>
						<li className="flex items-center gap-2">
							<ShirtIcon className="h-4 w-4 text-primary" />
							All Attires Included
						</li>
						<li className="flex items-center gap-2">
							<ImageIcon className="h-4 w-4 text-primary" />
							All Backgrounds Included
						</li>
						<li className="flex items-center gap-2">
							<Maximize2Icon className="h-4 w-4 text-primary" />
							Enhanced Image Resolution
						</li>
					</ul>
					<Button variant="outline" className="mt-auto w-full">
						Get 200 Headshots
					</Button>
				</div>
			</div>
		</div>
	);
}
