import { AlertCircle } from "lucide-react";

interface GlobalImageAlertsProps {
	alerts: string[];
}

export function GlobalImageAlerts({ alerts }: GlobalImageAlertsProps) {
	if (alerts.length === 0) {
		return null;
	}

	return (
		<div className="mb-4 space-y-2">
			{alerts.map((alert, index) => (
				<div
					key={index.toString()}
					className="flex items-center rounded-md border border-red-300 bg-red-50 p-3 text-red-700 text-sm dark:border-red-700 dark:bg-red-900/30 dark:text-red-300"
				>
					<AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
					<p>{alert}</p>
				</div>
			))}
		</div>
	);
}
