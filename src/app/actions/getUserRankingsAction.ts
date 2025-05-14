"use server";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import type { MovieRanking, RankChoice, UserRankingsMap } from "@/types";
import { headers } from "next/headers";

export async function getUserRankingsAction(): Promise<UserRankingsMap | null> {
	const readonlyRequestHeaders = headers();
	const requestHeaders = new Headers(await readonlyRequestHeaders);
	const session = await auth.api.getSession({ headers: requestHeaders });

	if (!session?.user) {
		console.log("No session found for getUserRankingsAction");
		return null;
	}

	const userId = session.user.id;

	try {
		const db = await getDb();
		const rankingsCollection = db.collection<MovieRanking>("movieRankings");
		const userRankingsDocs = await rankingsCollection
			.find({ userId: userId })
			.toArray();

		const rankingsMap: UserRankingsMap = {};
		for (const doc of userRankingsDocs) {
			rankingsMap[doc.movieId] = doc.rank;
		}
		return rankingsMap;
	} catch (error) {
		console.error("Error fetching user rankings:", error);
		return null;
	}
}
