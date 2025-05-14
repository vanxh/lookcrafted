import { CheckCircle2 } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { cn } from "@/lib/utils";

interface ProgressSidebarProps {
	currentStep: number;
	stepTitles: string[];
	stepChangeEnabled?: boolean;
}

export function ProgressSidebar({
	currentStep,
	stepTitles,
	stepChangeEnabled = true,
}: ProgressSidebarProps) {
	const [, setStep] = useQueryState("step", parseAsInteger.withDefault(1));

	return (
		// 4 rem = header height
		// 76px = header height
		<aside className="sticky top-16 hidden h-[calc(100vh-4rem-76px)] w-72 overflow-y-auto border-r px-6 py-4 lg:block dark:border-gray-700">
			<h2 className="mb-4 font-semibold text-gray-900 text-lg dark:text-gray-100">
				Progress
			</h2>
			<nav aria-label="Progress">
				<ol className="space-y-2">
					{stepTitles.map((title, index) => {
						const stepNumber = index + 1;
						const isCompleted = stepNumber < currentStep;
						const isCurrent = stepNumber === currentStep;

						return (
							<li key={title} className="group w-full">
								<button
									type="button"
									onClick={() => stepChangeEnabled && setStep(stepNumber)}
									disabled={stepNumber > currentStep || !stepChangeEnabled}
									className={cn(
										"w-full rounded-md p-3 text-left transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
										isCurrent
											? "bg-blue-100 dark:bg-blue-800/30"
											: "hover:bg-gray-100 dark:hover:bg-gray-800",
										stepNumber > currentStep && "cursor-not-allowed opacity-50",
									)}
								>
									<h3
										className={cn(
											isCurrent ? "text-base" : "text-sm",
											isCurrent
												? "font-semibold text-blue-600 dark:text-blue-400"
												: "font-medium text-gray-700 dark:text-gray-300",
											isCompleted &&
												"font-medium text-gray-500 dark:text-gray-400",
										)}
									>
										{isCompleted && (
											<CheckCircle2 className="mr-2 inline h-5 w-5 text-blue-600" />
										)}
										{title}
									</h3>
								</button>
							</li>
						);
					})}
				</ol>
			</nav>
		</aside>
	);
}
