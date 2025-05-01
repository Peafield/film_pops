import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { getDb } from "./mongodb";

async function initializeAuth() {
	try {
		const db = await getDb();
		return betterAuth({
			database: mongodbAdapter(db),
			emailAndPassword: {
				enabled: true,
			},
			plugins: [nextCookies()],
		});
	} catch (error) {
		console.error(
			"Failed to initialize auth due to DB connection error:",
			error,
		);
		throw new Error("Auth initialization failed");
	}
}

export const authPromise = initializeAuth();
