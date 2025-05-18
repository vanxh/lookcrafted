import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodSmartCoercionPlugin, ZodToJsonSchemaConverter } from "@orpc/zod";
import { tasks } from "@trigger.dev/sdk/v3";
import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { env } from "./env";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import {
	type CreemCheckoutCompletedEvent,
	generateCreemSignature,
} from "./lib/creem";
import { appRouter } from "./routers/index";
import type { headshotPaid } from "./trigger/headshot-paid";

export type AuthType = {
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
};

const app = new Hono<{ Bindings: AuthType }>({
	strict: false,
});

app.use(logger());

app.use(
	"/*",
	cors({
		origin: env.CORS_ORIGIN?.split(",") || [],
		allowMethods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
		allowHeaders: ["Content-Type", "Authorization"],
		exposeHeaders: ["Content-Length"],
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

const rpcHandler = new RPCHandler(appRouter);
app.use("/rpc/*", async (c, next) => {
	const context = await createContext({ context: c });
	const { matched, response } = await rpcHandler.handle(c.req.raw, {
		prefix: "/rpc",
		context: context,
	});
	if (matched) {
		return c.newResponse(response.body, response);
	}
	await next();
});

const openapiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			docsPath: "/docs",
			specPath: "/docs/openapi.json",
			schemaConverters: [new ZodToJsonSchemaConverter()],
			specGenerateOptions: {
				externalDocs: {
					url: "https://api.lookcrafted.com/api/auth/reference",
					description: "Authentication API",
				},
				servers: [
					{
						url: "https://api.lookcrafted.com",
						description: "Production",
					},
					{
						url: "http://localhost:3000",
						description: "Development",
					},
				],
				info: {
					title: "LookCrafted API",
					version: "0.1.0",
				},
			},
		}),
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		new ZodSmartCoercionPlugin() as any,
	],
});
app.get("/v1/*", async (c, next) => {
	const context = await createContext({ context: c });
	const { matched, response } = await openapiHandler.handle(c.req.raw, {
		prefix: "/v1",
		context: context,
	});
	if (matched) {
		return c.newResponse(response.body, response);
	}
	await next();
});

app.get("/", (c) => {
	return c.text("OK");
});

app.post("/webhook/creem", async (c) => {
	const signature = c.req.header("creem-signature");
	const body = await c.req.json();

	const computedSignature = generateCreemSignature(JSON.stringify(body));

	if (signature !== computedSignature) {
		return c.text("Invalid signature", 401);
	}

	const { eventType, object } = body as CreemCheckoutCompletedEvent;

	if (eventType !== "checkout.completed") {
		return c.text("Invalid event type", 400);
	}

	const { order, metadata } = object;

	if (order?.status !== "paid") {
		return c.text("Order not paid", 400);
	}

	const plan = {
		[env.CREEM_STARTER_PRODUCT_ID]: "starter",
		[env.CREEM_BASIC_PRODUCT_ID]: "basic",
		[env.CREEM_PREMIUM_PRODUCT_ID]: "premium",
	}[order.product] as "starter" | "basic" | "premium";

	if (!plan) {
		return c.text("Invalid product", 400);
	}

	const userId = metadata.userId;
	const headshotRequestId = metadata.headshotRequestId;

	await tasks.trigger<typeof headshotPaid>("headshot-paid", {
		headshotRequestId,
		plan,
		userId,
	});

	return c.text("OK");
});

export default app;
