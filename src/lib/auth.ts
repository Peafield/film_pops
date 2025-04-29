import { getDb } from "@/lib/mongodb";
import type { UserProfile } from "@/types";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) {
					console.log("Missing credentials");
					return null;
				}

				try {
					const db = await getDb();
					const user = await db
						.collection<UserProfile>("users")
						.findOne({ username: credentials.username });

					if (
						user &&
						(await bcrypt.compare(credentials.password, user.hashedPassword))
					) {
						console.log(`Password match for user: ${user.username}`);
						return {
							id: user._id.toString(),
							username: user.username,
						};
					}
					console.log(`Password mismatch for user: ${credentials.username}`);
					return null; // Login failed
				} catch (error) {
					console.error("Authorize error:", error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
		signOut: "/auth/signout",
	},
	secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
