import { polarClient } from "@polar-sh/better-auth";
import {
	emailOTPClient,
	inferAdditionalFields,
	magicLinkClient,
	organizationClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";
import type { auth } from "../../../server/src/lib/auth";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_SERVER_URL,
	plugins: [
		magicLinkClient(),
		emailOTPClient(),
		inferAdditionalFields<typeof auth>(),
		organizationClient(),
		polarClient(),
	],
});
