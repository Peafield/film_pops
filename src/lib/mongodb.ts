import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;
const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

if (!uri) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

if (process.env.NODE_ENV === "development") {
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>;
	};

	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(uri, options);
		globalWithMongo._mongoClientPromise = client.connect();
		console.log("Creating new MongoDB connection (development)...");
	}
	clientPromise = globalWithMongo._mongoClientPromise;
} else {
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
	console.log("Creating new MongoDB connection (production)...");
}

export default clientPromise;

export async function getDb() {
	// Use your preferred DB name
	if (!clientPromise) {
		throw new Error("MongoDB client promise is not initialized");
	}
	const mongoClient = await clientPromise;
	return mongoClient.db(dbName);
}
