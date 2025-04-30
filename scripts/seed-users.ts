import type { UserDocument } from "@/types";
import bcrypt from "bcrypt";
import { MongoClient, ServerApiVersion } from "mongodb";

const defaultUri = "mongodb://127.0.0.1:27017";
const uri = process.env.MONGODB_URI || defaultUri;
const dbName = process.env.MONGODB_NAME || "filmPops";
const collectionName = "user";

const saltRounds = 10;

const initialUsers = [
	{ username: "Peter", password: "initialPassword1" },
	{ username: "Andrew", password: "initialPassword2" },
	{ username: "Fede", password: "initialPassword3" },
];

async function seedUsers() {
	console.log(`Connecting to MongoDB at ${uri}...`);

	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
	});

	try {
		await client.connect();
		console.log("Connected successfully to MongoDB server");
		const db = client.db(dbName);
		const usersCollection = db.collection<UserDocument>(collectionName);

		console.log(`Sedding users into ${dbName}.${collectionName}`);

		for (const user of initialUsers) {
			const existingUser = await usersCollection.findOne({
				username: user.username,
			});

			if (existingUser) {
				console.log(`User "${user}" already exists. Skipping`);
				continue;
			}

			console.log(`Hasing password for "${user.username}"...`);
			const hashedPassword = await bcrypt.hash(user.password, saltRounds);

			const newUserDocument: UserDocument = {
				username: user.username,
				hashedPassword: hashedPassword,
				createdAt: new Date(),
			};

			const result = await usersCollection.insertOne(newUserDocument);
			console.log(
				`Inserted user "${user.username}" with ID: ${result.insertedId}`,
			);
		}

		console.log("User seeding completed successfully");
	} catch (error) {
		console.error("Error during user seeding:", error);
	} finally {
		await client.close();
		console.log("MongoDB connection closed");
	}
}

seedUsers().catch(console.error);
