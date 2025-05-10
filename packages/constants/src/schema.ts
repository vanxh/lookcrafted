import { z } from "zod";

import {
	AGE_GROUP_OPTIONS,
	BACKGROUND_OPTIONS,
	BODY_TYPE_OPTIONS,
	ETHNICITY_OPTIONS,
	GENDER_OPTIONS,
	HAIR_COLOR_OPTIONS,
	HAIR_LENGTH_OPTIONS,
	HAIR_TEXTURE_OPTIONS,
	OUTFIT_OPTIONS,
} from "./options";

export const createHeadshotRequestSchema = z.object({
	gender: z.enum(GENDER_OPTIONS),
	ageGroup: z.enum(AGE_GROUP_OPTIONS),
	hairColor: z.enum(HAIR_COLOR_OPTIONS),
	hairLength: z.enum(HAIR_LENGTH_OPTIONS),
	hairTexture: z.enum(HAIR_TEXTURE_OPTIONS),
	ethnicity: z.enum(ETHNICITY_OPTIONS),
	bodyType: z.enum(BODY_TYPE_OPTIONS),
	backgrounds: z.array(z.enum(BACKGROUND_OPTIONS)),
	outfits: z.array(z.enum(OUTFIT_OPTIONS)),
});

export type CreateHeadshotRequestInput = z.infer<
	typeof createHeadshotRequestSchema
>;

export const editHeadshotRequestSchema = createHeadshotRequestSchema
	.partial()
	.extend({
		id: z.string(),
	});

export type EditHeadshotRequestInput = z.infer<
	typeof editHeadshotRequestSchema
>;
