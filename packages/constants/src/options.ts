export const GENDER_OPTIONS = ["male", "female", "other"] as const;
export type Gender = (typeof GENDER_OPTIONS)[number];

export const AGE_GROUP_OPTIONS = [
	"18_20",
	"21_24",
	"25_29",
	"30_40",
	"41_50",
	"51_65",
	"65_plus",
] as const;
export type AgeGroup = (typeof AGE_GROUP_OPTIONS)[number];

export const HAIR_COLOR_OPTIONS = [
	"Black",
	"Brown",
	"Blonde",
	"Gray",
	"Auburn",
	"Red",
	"White",
	"Other",
	"Bald",
] as const;
export type HairColor = (typeof HAIR_COLOR_OPTIONS)[number];

export const MALE_HAIR_LENGTH_OPTIONS = [
	"Bald",
	"Buzz Cut",
	"Short",
	"Medium Length",
	"Long",
] as const;
export type MaleHairLength = (typeof MALE_HAIR_LENGTH_OPTIONS)[number];

export const FEMALE_HAIR_LENGTH_OPTIONS = [
	"Clean Crop",
	"Bob Cut",
	"Medium",
	"Long",
] as const;
export type FemaleHairLength = (typeof FEMALE_HAIR_LENGTH_OPTIONS)[number];

export const HAIR_LENGTH_OPTIONS = Array.from(
	new Set([...MALE_HAIR_LENGTH_OPTIONS, ...FEMALE_HAIR_LENGTH_OPTIONS]),
) as [string, ...string[]];
export type HairLength = (typeof HAIR_LENGTH_OPTIONS)[number];

export const HAIR_TEXTURE_OPTIONS = [
	"Straight",
	"Wavy",
	"Curly",
	"Coarse",
] as const;
export type HairTexture = (typeof HAIR_TEXTURE_OPTIONS)[number];

export const ETHNICITY_OPTIONS = [
	"White",
	"Black",
	"Hispanic",
	"Middle Eastern",
	"South Asian",
	"East Asian",
	"Southeast Asian",
	"Pacific Islander",
	"Other",
] as const;
export type Ethnicity = (typeof ETHNICITY_OPTIONS)[number];

export const BODY_TYPE_OPTIONS = [
	"Slim",
	"Average",
	"Athletic",
	"Medium",
	"Large",
] as const;
export type BodyType = (typeof BODY_TYPE_OPTIONS)[number];

export const BACKGROUND_OPTIONS = [
	"White",
	"Black",
	"Gray",
	"Blue",
	"Office",
	"Studio",
	"Nature",
	"Street",
] as const;
export type Background = (typeof BACKGROUND_OPTIONS)[number];

export const OUTFIT_OPTIONS = [
	"Formal",
	"Tech",
	"Casual",
	"Business Casual",
	"Sporty",
] as const;
export type Outfit = (typeof OUTFIT_OPTIONS)[number];
