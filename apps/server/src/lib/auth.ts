import { expo } from "@better-auth/expo";
import { polar } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, magicLink, organization } from "better-auth/plugins";

import { db } from "../db/index";
import * as schema from "../db/schema";
import { env } from "../env";
import {
	sendMagicLinkEmail,
	sendOrganizationCreatedEmail,
	sendOrganizationInvitationEmail,
	sendOtpVerificationEmail,
	sendPasswordResetEmail,
	sendVerificationEmail,
	sendWelcomeEmail,
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
		crossSubDomainCookies: {
			enabled: true,
			domain: ".lookcrafted.com",
		},
		defaultCookieAttributes: {
			secure: true,
			httpOnly: true,
			sameSite: "none",
			partitioned: true,
		},
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
					await sendWelcomeEmail({
						to: user.email,
						name: user.name,
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
						dashboardLink: `${env.BETTER_AUTH_URL}/dashboard`,
					});
				},
			},
			async sendInvitationEmail(data) {
				const inviteLink = `${env.BETTER_AUTH_URL}/accept-invitation/${data.id}`;
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
			enableCustomerPortal: true,
			checkout: {
				enabled: true,
				products: [
					{
						productId: "123-456-789", // ID of Product from Polar Dashboard
						slug: "pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
					},
				],
				successUrl: "/success?checkout_id={CHECKOUT_ID}",
			},
			webhooks: {
				secret: env.POLAR_WEBHOOK_SECRET,
				onPayload: async (payload) => {
					console.log(payload);
				},
			},
		}),
	],
	appName: "LookCrafted",
});
