import type { AgeGroup } from "./options";

/**
 * Formats age group options for display
 * Converts "65_plus" to "65+" and replaces underscores with hyphens
 */
export function formatAgeGroup(value: AgeGroup | string): string {
	if (!value) return "";
	if (value === "65_plus") return "65+";
	return value.replace("_", "-");
}

/**
 * Formats a string to capitalize the first letter
 */
export function capitalizeFirstLetter(value: string): string {
	if (!value) return "";
	return value.charAt(0).toUpperCase() + value.slice(1);
}
