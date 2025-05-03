import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, magicLink } from "better-auth/plugins";

import { db } from "../db/index.js";
import * as schema from "../db/schema/auth.js";
import { env } from "../env.js";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	trustedOrigins: [env.CORS_ORIGIN || "", "lookcrafted-app://"],
	emailAndPassword: {
		enabled: true,
		resetPasswordTokenExpiresIn: 1 * 60 * 60,
		sendResetPassword: async ({ user, url }) => {
			// await sendPasswordResetEmail(user.email, url);
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 1 * 60 * 60,
		sendVerificationEmail: async ({ user, url }) => {
			// await sendVerificationEmail(user.email, url);
		},
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
	},
	session: {},
	advanced: {
		cookiePrefix: "lookcrafted",
	},
	databaseHooks: {
		user: {
			create: {
				after: async (user) => {
					// await sendWelcomeEmail(user.email);
				},
			},
		},
	},
	plugins: [
		magicLink({
			expiresIn: 10 * 60,
			sendMagicLink: async ({ email, url }) => {
				// await sendMagicLinkEmail(email, url);
			},
		}),
		emailOTP({
			async sendVerificationOTP({ email, otp }) {
				// await sendOtpEmail(email, otp);
			},
		}),
		nextCookies(),
		// @ts-ignore
		expo(),
	],
	appName: "LookCrafted",
});
