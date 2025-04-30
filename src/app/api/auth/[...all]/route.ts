import { authPromise } from "@/lib/auth"; // Import the promise
import { toNextJsHandler } from "better-auth/next-js"; // If needed for typing

async function getAuthHandler() {
	const auth = await authPromise;
	return toNextJsHandler(auth);
}

export async function POST(req: Request) {
	const handler = await getAuthHandler();
	return handler.POST(req);
}

export async function GET(req: Request) {
	const handler = await getAuthHandler();
	return handler.GET(req);
}
