// next-auth.d.ts
import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";
import { type DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			username: string;
		} & DefaultSession["user"]; // Combine with default user properties
	}

	interface User extends DefaultUser {
		username: string; // Add username if you use the User object directly
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		username: string;
	}
}
