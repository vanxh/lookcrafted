import {
	boolean,
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

import {
	AGE_GROUP_OPTIONS,
	BODY_TYPE_OPTIONS,
	type Background,
	ETHNICITY_OPTIONS,
	GENDER_OPTIONS,
	HAIR_COLOR_OPTIONS,
	HAIR_LENGTH_OPTIONS,
	HAIR_TEXTURE_OPTIONS,
	type Outfit,
} from "@lookcrafted/constants";
import { relations } from "drizzle-orm";

export const user = pgTable(
	"user",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		emailVerified: boolean("email_verified")
			.$defaultFn(() => false)
			.notNull(),
		image: text("image"),
		createdAt: timestamp("created_at")
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),
		updatedAt: timestamp("updated_at")
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("user_email_index").on(table.email)],
);

export const session = pgTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at").notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		activeOrganizationId: text("active_organization_id"),
	},
	(table) => [
		index("session_user_id_index").on(table.userId),
		index("session_token_index").on(table.token),
	],
);

export const account = pgTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").notNull(),
		updatedAt: timestamp("updated_at").notNull(),
	},
	(table) => [index("account_user_id_index").on(table.userId)],
);

export const verification = pgTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").$defaultFn(
			() => /* @__PURE__ */ new Date(),
		),
		updatedAt: timestamp("updated_at").$defaultFn(
			() => /* @__PURE__ */ new Date(),
		),
	},
	(table) => [index("verification_identifier_index").on(table.identifier)],
);

export const organization = pgTable(
	"organization",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		slug: text("slug").unique(),
		logo: text("logo"),
		createdAt: timestamp("created_at").notNull(),
		metadata: text("metadata"),
	},
	(table) => [index("organization_slug_index").on(table.slug)],
);

export const member = pgTable(
	"member",
	{
		id: text("id").primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		role: text("role").notNull(),
		createdAt: timestamp("created_at").notNull(),
	},
	(table) => [
		index("member_organization_id_index").on(table.organizationId),
		index("member_user_id_index").on(table.userId),
	],
);

export const invitation = pgTable(
	"invitation",
	{
		id: text("id").primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		email: text("email").notNull(),
		role: text("role"),
		status: text("status").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		inviterId: text("inviter_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("invitation_email_index").on(table.email),
		index("invitation_organization_id_index").on(table.organizationId),
	],
);

export const genderEnum = pgEnum("gender", GENDER_OPTIONS);
export const ageGroupEnum = pgEnum("age_group", AGE_GROUP_OPTIONS);
export const hairColorEnum = pgEnum("hair_color", HAIR_COLOR_OPTIONS);
export const hairLengthEnum = pgEnum("hair_length", HAIR_LENGTH_OPTIONS);
export const hairTextureEnum = pgEnum("hair_texture", HAIR_TEXTURE_OPTIONS);
export const ethnicityEnum = pgEnum("ethnicity", ETHNICITY_OPTIONS);
export const bodyTypeEnum = pgEnum("body_type", BODY_TYPE_OPTIONS);

export const headshotStatus = pgEnum("headshot_status", [
	"unpaid",
	"pending",
	"training",
	"training-completed",
	"generating",
	"completed",
	"failed",
]);

export const headshotRequest = pgTable(
	"headshot_request",
	{
		id: text("id").primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at")
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),

		headshotCount: integer("headshot_count").notNull(),
		editingCredits: integer("editing_credits").notNull().default(0),

		trainingSteps: integer("training_steps").notNull().default(1000),
		trainingModelId: text("training_model_id"),
		trainingRequestId: text("training_request_id"),
		trainingStartedAt: timestamp("training_started_at"),
		trainingCompletedAt: timestamp("training_completed_at"),
		triggerPhrase: text("trigger_phrase"),
		upscaleImages: boolean("upscale_images").notNull().default(false),

		gender: genderEnum("gender").notNull(),
		ageGroup: ageGroupEnum("age_group").notNull(),
		hairColor: hairColorEnum("hair_color").notNull(),
		hairLength: hairLengthEnum("hair_length").notNull(),
		hairTexture: hairTextureEnum("hair_texture").notNull(),
		ethnicity: ethnicityEnum("ethnicity").notNull(),
		bodyType: bodyTypeEnum("body_type").notNull(),

		backgrounds: jsonb("backgrounds").$type<Background[]>(),
		outfits: jsonb("outfits").$type<Outfit[]>(),

		loraId: text("lora_id"),
		status: headshotStatus("status").notNull().default("unpaid"),

		doNotDelete: boolean("do_not_delete").notNull().default(false),

		completedAt: timestamp("completed_at"),

		regenerationCount: integer("regeneration_count").notNull().default(0),
	},
	(table) => [index("headshot_user_id_index").on(table.userId)],
);

export const headshotRequestRelations = relations(
	headshotRequest,
	({ many }) => ({
		uploads: many(headshotRequestImage),
		images: many(headshotImage),
	}),
);

export const headshotRequestImage = pgTable(
	"headshot_request_image",
	{
		id: text("id").primaryKey(),
		headshotRequestId: text("headshot_request_id")
			.notNull()
			.references(() => headshotRequest.id, { onDelete: "cascade" }),

		imageUrl: text("image_url").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => [
		index("headshot_request_image_headshot_request_id_index").on(
			table.headshotRequestId,
		),
	],
);

export const headshotRequestImageRelations = relations(
	headshotRequestImage,
	({ one }) => ({
		headshotRequest: one(headshotRequest, {
			fields: [headshotRequestImage.headshotRequestId],
			references: [headshotRequest.id],
		}),
	}),
);

export const headshotImage = pgTable(
	"headshot_image",
	{
		id: text("id").primaryKey(),
		headshotRequestId: text("headshot_request_id")
			.notNull()
			.references(() => headshotRequest.id, { onDelete: "cascade" }),

		imageUrl: text("image_url").notNull(),
		upscaledImageUrl: text("upscaled_image_url"),

		prompt: text("prompt"),
		isFavorite: boolean("is_favorite").default(false),

		modelVersion: text("model_version").notNull(),
		regenerationIndex: integer("regeneration_index").notNull().default(0), // 0 is the original image, 1 is the first regeneration, etc.

		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at")
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		index("headshot_image_headshot_request_id_index").on(
			table.headshotRequestId,
		),
	],
);

export const headshotImageRelations = relations(headshotImage, ({ one }) => ({
	headshotRequest: one(headshotRequest, {
		fields: [headshotImage.headshotRequestId],
		references: [headshotRequest.id],
	}),
}));
