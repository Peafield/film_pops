"use server";

import { getDb } from "@/lib/mongodb";
import {
	type GetPopsPicksResult,
	type MovieRanking,
	type PopsPickMovie,
	SCORE_WEIGHTS,
	type TMDBMovie,
	type UserDbRecord,
	type VoterInfo,
} from "@/types";
import { ObjectId } from "mongodb";

export async function getPopsPicksAction(): Promise<GetPopsPicksResult> {
	try {
		const db = await getDb();
		const rankingsCollection = db.collection<MovieRanking>("movieRankings");
		const moviesCollection = db.collection<TMDBMovie>("movies");
		const userCollection = db.collection("user");

		const aggregatedRankings = await rankingsCollection
			.aggregate([
				{
					$group: {
						_id: "$movieId",
						yeahVotes: {
							$sum: { $cond: [{ $eq: ["$rank", "yeah"] }, 1, 0] },
						},
						maybeVotes: {
							$sum: { $cond: [{ $eq: ["$rank", "maybe"] }, 1, 0] },
						},
						nopeVotes: {
							$sum: { $cond: [{ $eq: ["$rank", "nope"] }, 1, 0] },
						},
						yeahVoterIds: {
							$addToSet: {
								$cond: [{ $eq: ["$rank", "yeah"] }, "$userId", "$$REMOVE"],
							},
						},
						maybeVoterIds: {
							$addToSet: {
								$cond: [{ $eq: ["$rank", "maybe"] }, "$userId", "$$REMOVE"],
							},
						},
						nopeVoterIds: {
							$addToSet: {
								$cond: [{ $eq: ["$rank", "nope"] }, "$userId", "$$REMOVE"],
							},
						},
					},
				},
				{
					$addFields: {
						totalScore: {
							$add: [
								{ $multiply: ["$yeahVotes", SCORE_WEIGHTS.yeah] },
								{ $multiply: ["$maybeVotes", SCORE_WEIGHTS.maybe] },
								{ $multiply: ["$nopeVotes", SCORE_WEIGHTS.nope] },
							],
						},
						totalUserVotes: {
							$add: ["$yeahVotes", "$maybeVotes", "$nopeVotes"],
						},
					},
				},
				{
					$project: {
						movieId: "$_id",
						totalScore: 1,
						yeahVotes: "$yeahVotes",
						maybeVotes: "$maybeVotes",
						nopeVotes: "$nopeVotes",
						yeahVoterIds: 1,
						maybeVoterIds: 1,
						nopeVoterIds: 1,
						totalUserVotes: 1,
						_id: 0,
					},
				},
			])
			.toArray();

		if (!aggregatedRankings || aggregatedRankings.length === 0) {
			return {
				success: true,
				picks: [],
				message: "No movies have been ranked yet.",
			};
		}

		const allUserIdsSet = new Set<string>();
		for (const agg of aggregatedRankings) {
			for (const id of (agg.yeahVoterIds as string[]) || []) {
				allUserIdsSet.add(id);
			}
			for (const id of (agg.maybeVoterIds as string[]) || []) {
				allUserIdsSet.add(id);
			}
			for (const id of (agg.nopeVoterIds as string[]) || []) {
				allUserIdsSet.add(id);
			}
		}

		const allUserIdsArray = Array.from(allUserIdsSet);

		const allUserObjectIds = allUserIdsArray
			.map((idStr) => {
				try {
					return new ObjectId(idStr);
				} catch (e) {
					console.warn(`[GPPA] Invalid ObjectId string: ${idStr}`);
					return null;
				}
			})
			.filter((id) => id !== null) as ObjectId[];

		const userDetailsCursor = userCollection.find(
			{ _id: { $in: allUserObjectIds } },
			{ projection: { name: 1, _id: 1 } },
		);

		const userDetailsArrayFromDb: UserDbRecord[] =
			(await userDetailsCursor.toArray()) as UserDbRecord[];

		const userMap = new Map<string, string>();
		userDetailsArrayFromDb.forEach((u, index) => {
			if (u?._id && typeof u.name === "string" && u.name.trim() !== "") {
				const userIdStr = u._id.toString();
				userMap.set(userIdStr, u.name);
			} else {
				console.warn(
					"[GPPA Debug] Skipping user document due to missing _id or name, or empty name string:",
					JSON.stringify(u),
				);
			}
		});

		const movieIds = aggregatedRankings.map((r) => r.movieId);
		const movieDetailsArray = await moviesCollection
			.find({ id: { $in: movieIds } })
			.toArray();

		const movieDetailsMap = new Map<number, TMDBMovie>();
		for (const movie of movieDetailsArray) {
			movieDetailsMap.set(movie.id, movie);
		}

		const popsPicks: PopsPickMovie[] = aggregatedRankings
			.map((ranking) => {
				const movieDetail = movieDetailsMap.get(ranking.movieId);
				const mapIdsToVoters = (ids: string[]): VoterInfo[] =>
					(ids || [])
						.map((id) => ({ id, name: userMap.get(id) || "Unknown User" }))
						.filter((v) => v.name !== "Unknown User");

				return {
					...(movieDetail || ({} as TMDBMovie)),
					id: ranking.movieId,
					title: movieDetail?.title || "Unknown Title",
					totalScore: ranking.totalScore,
					yeahVotes: ranking.yeahVotes,
					maybeVotes: ranking.maybeVotes,
					nopeVotes: ranking.nopeVotes,
					yeahVoters: mapIdsToVoters(ranking.yeahVoterIds as string[]),
					maybeVoters: mapIdsToVoters(ranking.maybeVoterIds as string[]),
					nopeVoters: mapIdsToVoters(ranking.nopeVoterIds as string[]),
					totalUserVotes: ranking.totalUserVotes,
					overview: movieDetail?.overview || "",
					poster_path: movieDetail?.poster_path || undefined,
					release_date: movieDetail?.release_date || "",
					genre_ids: movieDetail?.genre_ids || [],
					popularity: movieDetail?.popularity || 0,
					userRank: undefined,
				};
			})
			.filter((pick) => movieDetailsMap.has(pick.id));

		popsPicks.sort((a, b) => {
			// Primary sort: totalScore (descending - most yeahs first)
			if (b.totalScore !== a.totalScore) {
				return b.totalScore - a.totalScore;
			}

			// Secondary sort: release_date (ascending - soonest first)
			const dateA = a.release_date
				? new Date(a.release_date).getTime()
				: Number.MAX_SAFE_INTEGER;
			const dateB = b.release_date
				? new Date(b.release_date).getTime()
				: Number.MAX_SAFE_INTEGER;
			if (dateA !== dateB) {
				return dateA - dateB;
			}

			// Tertiary sort: yeahVotes (descending)
			if (b.yeahVotes !== a.yeahVotes) {
				return b.yeahVotes - a.yeahVotes;
			}
			// Quaternary sort: maybeVotes (descending)
			if (b.maybeVotes !== a.maybeVotes) {
				return b.maybeVotes - a.maybeVotes;
			}
			// Quinary sort: nopeVotes (ascending - fewer is better)
			if (a.nopeVotes !== b.nopeVotes) {
				return a.nopeVotes - b.nopeVotes;
			}
			// Final tie-breaker: movie title (alphabetical)
			return (a.title || "").localeCompare(b.title || "");
		});

		return { success: true, picks: popsPicks };
	} catch (error) {
		console.error("Error in getPopsPicksAction:", error);
		return {
			success: false,
			message: "Failed to fetch Pops' Picks.",
			error: error instanceof Error ? error.message : "Unknown server error.",
		};
	}
}
