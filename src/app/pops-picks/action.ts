"use server";

import { getDb } from "@/lib/mongodb";
import {
	type GetPopsPicksResult,
	type MovieRanking,
	type PopsPickMovie,
	SCORE_WEIGHTS,
	type TMDBMovie,
} from "@/types";

export async function getPopsPicksAction(): Promise<GetPopsPicksResult> {
	try {
		const db = await getDb();
		const rankingsCollection = db.collection<MovieRanking>("movieRankings");
		const moviesCollection = db.collection<TMDBMovie>("movies");

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
						voters: { $addToSet: "$userId" },
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
						yeahVotes: 1,
						maybeVotes: 1,
						nopeVotes: 1,
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
				return {
					...(movieDetail || ({} as TMDBMovie)),
					id: ranking.movieId,
					title: movieDetail?.title || "Unknown Title",
					totalScore: ranking.totalScore,
					yeahVotes: ranking.yeahVotes,
					maybeVotes: ranking.maybeVotes,
					nopeVotes: ranking.nopeVotes,
					totalUserVotes: ranking.totalUserVotes,
					overview: movieDetail?.overview || "",
					poster_path: movieDetail?.poster_path,
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
