import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB_NAME || "filmPops";
const fullUri = `${uri}/${dbName}`;

const client = new MongoClient(fullUri);
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db),
	plugins: [username(), nextCookies()],
});
