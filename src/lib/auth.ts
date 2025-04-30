import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const defaultUri = "mongodb://127.0.0.1:27017";
const uri = process.env.MONGODB_URI || defaultUri;
const dbName = process.env.MONGODB_NAME || "filmPops";

const client = new MongoClient(uri);
const db = client.db(dbName);

export const auth = betterAuth({
	database: mongodbAdapter(db),
	plugins: [username(), nextCookies()],
});
