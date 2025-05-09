import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { getDb } from "./mongodb";

let authInit: ReturnType<typeof betterAuth> | null = null;

async function initializeAuth() {
	try {
		const db = await getDb();
		authInit = betterAuth({
			database: mongodbAdapter(db),
			emailAndPassword: {
				enabled: true,
				autoSignIn: false,
			},
			user: {
				additionalFields: {
					role: {
						type: "string",
						input: false,
						defaultValue: "user",
					},
				},
				changeEmail: {
					enabled: true,
				},
			},
			plugins: [nextCookies(), admin()],
			session: {
				cookieCache: {
					enabled: true,
					maxAge: 5 * 60,
				},
			},
		});
	} catch (error) {
		console.error(
			"Failed to initialize auth due to DB connection error:",
			error,
		);
		throw new Error("Auth initialization failed");
	}
	return authInit;
}

export const auth = await initializeAuth();
