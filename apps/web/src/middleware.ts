import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/env";
import type { auth } from "../../server/src/lib/auth";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: env.NEXT_PUBLIC_SERVER_URL,
			headers: {
				cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
			},
		},
	);

	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/app", "/app/:path*", "/create-headshot"],
};
