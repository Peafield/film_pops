import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { admin, customSession } from "better-auth/plugins";
import { getDb } from "./mongodb";

let auth: ReturnType<typeof betterAuth> | null = null;

async function initializeAuth() {
	try {
		const db = await getDb();

		auth = betterAuth({
			database: mongodbAdapter(db),

			emailAndPassword: {
				enabled: true,

				autoSignIn: false,
			},

			user: {
				additionalFields: {
					isApproved: {
						type: "boolean",
						defaultValue: false,
						input: false,
					},
				},
			},

			plugins: [
				admin(),
				nextCookies(),
				customSession(async ({ user, session }) => {
					return {
						user: {
							...user,
							isApproved: false,
						},
						session,
					};
				}),
			],

			databaseHooks: {
				user: {
					create: {
						before: async (userData) => {
							const dataWithApproval = {
								...userData,
								isApproved: false,
							};

							return { data: dataWithApproval };
						},
					},
				},
			},

			session: {
				cookieCache: {
					enabled: true,
					maxAge: 5 * 60,
				},
				additionalFields: {
					isApproved: {
						type: "boolean",
						defaultValue: false,
						input: false,
					},
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
	return auth;
}

export const authInit = await initializeAuth();
