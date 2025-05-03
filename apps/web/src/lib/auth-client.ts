import {
	emailOTPClient,
	inferAdditionalFields,
	magicLinkClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";
import type { auth } from "../../../server/api/lib/auth";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_SERVER_URL,
	plugins: [
		magicLinkClient(),
		emailOTPClient(),
		inferAdditionalFields<typeof auth>(),
	],
});
