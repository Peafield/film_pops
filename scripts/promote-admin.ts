import { closeDb, getDb } from "@/lib/mongodb";
import type { Db } from "mongodb";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@filmpops.com";

async function promoteAdmin() {
	let db: Db | null = null;
	try {
		db = await getDb();
		const usersCollection = db.collection("user");

		console.log(`Looking for user: ${ADMIN_EMAIL}`);
		const userToPromote = await usersCollection.findOne({ email: ADMIN_EMAIL });

		if (!userToPromote) {
			console.error("Admin user not found!");
			return;
		}

		console.log(`Found user ${userToPromote.name} Promoting to admin...`);
		const result = await usersCollection.updateOne(
			{ _id: userToPromote._id },
			{ $set: { role: "admin", isApproved: true } },
		);

		if (result.matchedCount === 1) {
			console.log("User successfully promoted to admin.");
		} else {
			console.log("User found, but promotion failed (maybe already admin?)");
		}
	} catch (error) {
		console.error("Error promoting admin:", error);
	} finally {
		await closeDb();
		console.log("DB connection closed.");
	}
}

promoteAdmin().finally(() => process.exit());
