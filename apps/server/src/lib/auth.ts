import { expo } from "@better-auth/expo";
import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { tasks } from "@trigger.dev/sdk/v3";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
	emailOTP,
	magicLink,
	openAPI,
	organization,
} from "better-auth/plugins";

import { db } from "../db/index";
import * as schema from "../db/schema";
import { env } from "../env";
import type { onboarding } from "../trigger/onboarding";
import {
	sendMagicLinkEmail,
	sendOrganizationCreatedEmail,
	sendOrganizationInvitationEmail,
	sendOtpVerificationEmail,
	sendPasswordResetEmail,
	sendVerificationEmail,
} from "./email";
import { polarClient } from "./polar";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	trustedOrigins: [...(env.CORS_ORIGIN.split(",") || []), "lookcrafted-app://"],
	advanced: {
		cookiePrefix: "lookcrafted",
		crossSubDomainCookies:
			env.NODE_ENV === "production"
				? {
						enabled: true,
						domain: ".lookcrafted.com",
					}
				: undefined,
		defaultCookieAttributes:
			env.NODE_ENV === "production"
				? {
						secure: true,
						httpOnly: true,
						sameSite: "none",
						partitioned: true,
					}
				: undefined,
	},
	emailAndPassword: {
		enabled: true,
		resetPasswordTokenExpiresIn: 1 * 60 * 60,
		sendResetPassword: async ({ user, url }) => {
			await sendPasswordResetEmail({
				to: user.email,
				name: user.name,
				resetLink: url,
			});
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 1 * 60 * 60,
		sendVerificationEmail: async ({ user, url }) => {
			await sendVerificationEmail({
				to: user.email,
				name: user.name,
				verifyLink: url,
			});
		},
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	session: {},
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					await tasks.trigger<typeof onboarding>("onboarding", {
						userId: user.id,
					});
				},
			},
		},
		// session: {
		//     create: {
		//         before: async (session) => {
		//             const organization = await db.query.organizations.findFirst({
		//                 where: eq(schema.organizations.userId, session.userId),
		//             });
		//             return {
		//                 data: {
		//                     ...session,
		//                     activeOrganizationId: organization.id,
		//                 },
		//             };
		//         },
		//     },
		// },
	},
	plugins: [
		organization({
			organizationCreation: {
				afterCreate: async (organization) => {
					await sendOrganizationCreatedEmail({
						to: organization.user.email,
						name: organization.user.name,
						organizationName: organization.organization.name,
						dashboardLink: `${env.FRONTEND_URL}/dashboard`,
					});
				},
			},
			async sendInvitationEmail(data) {
				const inviteLink = `${env.FRONTEND_URL}/accept-invitation/${data.id}`;
				await sendOrganizationInvitationEmail({
					to: data.email,
					invitedByUsername: data.inviter.user.name,
					invitedByEmail: data.inviter.user.email,
					teamName: data.organization.name,
					inviteLink,
					recipientName: data.email.split("@")[0],
				});
			},
		}),
		magicLink({
			expiresIn: 10 * 60,
			sendMagicLink: async ({ email, url }) => {
				await sendMagicLinkEmail({
					to: email,
					name: email.split("@")[0],
					magicLink: url,
				});
			},
		}),
		emailOTP({
			async sendVerificationOTP({ email, otp }) {
				await sendOtpVerificationEmail({
					to: email,
					name: email.split("@")[0],
					otp: otp,
				});
			},
		}),
		nextCookies(),
		// @ts-ignore
		expo(),
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			use: [
				checkout({
					authenticatedUsersOnly: true,
					products: [
						{
							productId: env.POLAR_STARTER_PRODUCT_ID,
							slug: "starter",
						},
						{
							productId: env.POLAR_BASIC_PRODUCT_ID,
							slug: "basic",
						},
						{
							productId: env.POLAR_PREMIUM_PRODUCT_ID,
							slug: "premium",
						},
					],
					successUrl: `${env.FRONTEND_URL}/app?checkout_id={CHECKOUT_ID}`,
				}),
				portal(),
				webhooks({
					secret: env.POLAR_WEBHOOK_SECRET,
					onOrderPaid: async (payload) => {
						// TODO: Handle order paid
						console.log(payload);
					},
				}),
			],
		}),
		openAPI({}),
	],
	appName: "LookCrafted",
});
