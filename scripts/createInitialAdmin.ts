import { auth } from "@/lib/auth";
import { closeDb, getDb } from "@/lib/mongodb";
import type { Db } from "mongodb";

const ADMIN_EMAIL = process.env.INITIAL_ADMIN_EMAIL || "admin@filmpops.com";
const ADMIN_NAME = process.env.INITIAL_ADMIN_NAME || "Peter";
const ADMIN_INITIAL_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD;

async function createInitalAdmin() {
	if (!ADMIN_INITIAL_PASSWORD) {
		console.error(
			"Error: INITIAL_ADMIN_PASSWORD environment variable is not set.",
		);
		process.exit(1);
	}

	let db: Db | null = null;

	try {
		db = await getDb();
		const usersCollection = db.collection("user");
		console.log("DB Connected.");

		console.log(`Checking if admin user ${ADMIN_EMAIL} exits...`);
		const existingAdmin = await usersCollection.findOne({ email: ADMIN_EMAIL });

		if (existingAdmin) {
			console.log(`Admin user ${ADMIN_EMAIL} already exists!`);
			if (existingAdmin.role !== "admin") {
				console.log("User exists but is not admin. Promoting...");
				await usersCollection.updateOne(
					{ _id: existingAdmin._id },
					{ $set: { role: "admin" } },
				);
			}
			return;
		}

		console.log(`Admin user ${ADMIN_EMAIL} not found. Creating...`);

		try {
			await auth.api.signUpEmail({
				body: {
					name: ADMIN_NAME,
					email: ADMIN_EMAIL,
					password: ADMIN_INITIAL_PASSWORD,
				},
			});
			console.log(`Initial user ${ADMIN_EMAIL} created via signUpEmail.`);
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error));
		}

		const newUser = await usersCollection.findOne({ email: ADMIN_EMAIL });
		if (!newUser) {
			throw new Error(`Failed to find newly created user ${ADMIN_EMAIL}`);
		}

		console.log(`Promoting newly created user ${newUser.name} to admin...`);
		const result = await usersCollection.updateOne(
			{ _id: newUser._id },
			{ $set: { role: "admin" } },
		);
		if (result.modifiedCount === 1) {
			console.log("User successfully created and promoted to admin.");
		} else {
			throw new Error("User was created but promotion failed.");
		}
	} catch (error) {
		console.error("Error in createAndPromoteAdmin:", error);
		process.exit(1); // Exit with error on failure
	} finally {
		await closeDb();
		console.log("DB connection closed.");
	}
}

createInitalAdmin().finally(() => process.exit());
