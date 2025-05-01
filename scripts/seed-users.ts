import { authPromise } from "@/lib/auth";
import { closeDb, getDb } from "@/lib/mongodb";
import type { Db } from "mongodb";

const passwordPrefix = process.env.INITIAL_PASSWORD_PREFIX || "password";

const usersToSeed = [
	{
		password: "",
		email: "peter@mail.com",
		name: "peter",
	},
	{
		password: "",
		email: "anna@mail.com",
		name: "peter",
	},
];

async function seedUsers() {
	let db: Db | null = null;
	try {
		console.log("Conntecting to db...");
		db = await getDb();
		console.log(db);
		console.log("Connected to db.");

		console.log("Initialising auth instance...");
		const auth = await authPromise;
		console.log("Auth instance initialised.");

		for (const userData of usersToSeed) {
			try {
				userData.password = `${passwordPrefix}${userData.name}`;
				userData.email = `${userData.name}@filmpops.com`;

				await auth.api.signUpEmail({
					body: {
						name: userData.name,
						email: userData.email,
						password: userData.password,
					},
				});

				console.log(`Successfully created user ${userData.name}`);
			} catch (error) {
				throw new Error(`Failed to seed user: ${error}`);
			}
		}
		console.log("User seeding process finished!");
	} catch (error) {
		console.error("An error occurred during the seeding process:", error);
	} finally {
		if (db) {
			await closeDb();
			console.log("Db connection closed.");
		}
	}
}
seedUsers()
	.catch(console.error)
	.finally(() => process.exit());
