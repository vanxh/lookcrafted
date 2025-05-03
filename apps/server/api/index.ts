import { handle } from "hono/vercel";
import app from "./server";

const vercelHandler = handle(app);

export const GET = vercelHandler;
export const POST = vercelHandler;
export const PATCH = vercelHandler;
export const PUT = vercelHandler;
export const OPTIONS = vercelHandler;
