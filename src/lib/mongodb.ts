import { type Db, MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbNameFromEnv = process.env.MONGODB_DB_NAME;
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
	maxPoolSize: 10,
	minPoolSize: 2,
	connectTimeoutMS: 5000,
	socketTimeoutMS: 30000,
};

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

/**
 * Establishes a connection to MongoDB if not already connected,
 * caches the client and db instances, and returns them.
 */
async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
	const effectiveDbName = dbNameFromEnv || "filmPops";
	if (process.env.NODE_ENV === "production" && !uri) {
		console.warn(
			"MONGODB_URI not set in production environment. Assuming build phase and returning mock DB object.",
		);
		return {
			// @ts-ignore - This is a deliberate mock for build time
			client: null,
			// @ts-ignore - This is a deliberate mock for build time
			db: {
				databaseName: effectiveDbName,
				collection: (name: string) => ({
					collectionName: name,
				}),
				command: async (command: object) => {
					if (command && typeof command === "object" && "ping" in command) {
						return { ok: 1 };
					}
					console.warn(
						`Mock DB received unhandled command: ${JSON.stringify(command)}`,
					);
					return {};
				},
			} as unknown as Db,
		};
	}

	if (!uri) {
		console.error(
			"MONGODB_URI is not defined. Cannot connect to database at runtime.",
		);
		throw new Error("MONGODB_URI environment variable is not set.");
	}

	if (cachedClient && cachedDb) {
		try {
			await cachedClient.db(effectiveDbName).command({ ping: 1 });
		} catch (e) {
			console.warn("Cached connection ping failed, reconnecting...", e);
			cachedClient = null;
			cachedDb = null;
		}
		if (cachedClient && cachedDb) {
			return { client: cachedClient, db: cachedDb };
		}
	}

	const client = new MongoClient(uri, options);
	cachedClient = client;

	try {
		console.log("Attempting to connect to MongoDB...");
		await client.connect();
		const db = client.db(effectiveDbName);

		await db.command({ ping: 1 });
		console.log(
			`Successfully connected to MongoDB database: ${effectiveDbName}`,
		);

		cachedDb = db;

		return { client, db };
	} catch (error) {
		console.error("Failed to connect to the database:", error);
		cachedClient = null;
		cachedDb = null;
		throw new Error("Failed to connect to the database.");
	}
}

/**
 * Gets the connected MongoDB database instance.
 * Ensures connection is established before returning.
 * @returns {Promise<Db>} The connected Db instance.
 */
export async function getDb(): Promise<Db> {
	const { db } = await connectToDatabase();
	return db;
}

/**
 * Gets the connected MongoDB client instance.
 * Ensures connection is established before returning.
 * @returns {Promise<MongoClient>} The connected MongoClient instance.
 */
export async function getMongoClient(): Promise<MongoClient> {
	const { client } = await connectToDatabase();
	return client;
}

/**
 * Closes the MongoDB client connection if it exists.
 * Resets the cached client and database instances.
 * @returns {Promise<void>} Resolves when the connection is closed.
 */
export async function closeDb(): Promise<void> {
	if (cachedClient) {
		await cachedClient.close();
		console.log("MongoDB connection closed.");
		cachedClient = null;
		cachedDb = null;
	} else {
		console.log("No MongoDB connection to close.");
	}
}
