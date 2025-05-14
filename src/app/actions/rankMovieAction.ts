"use server";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import {
	type RankChoice,
	RankMovieActionSchema,
	type TMDBMovie,
	TMDBMovieSchema,
} from "@/types";
import { headers } from "next/headers";

type RankMovieActionResult = {
	success: boolean;
	message: string;
	error?: string;
	movieId?: number;
	newRank?: RankChoice;
};

export async function rankMovieAction(
	_prevState: RankMovieActionResult | null,
	formData: FormData,
): Promise<RankMovieActionResult> {
	const readonlyRequestHeaders = headers();
	const requestHeaders = new Headers(await readonlyRequestHeaders);
	const session = await auth.api.getSession({ headers: requestHeaders });

	if (!session?.user) {
		return {
			success: false,
			message: "Not authenticated.",
			error: "User not logged in.",
		};
	}

	const rawData = {
		movieJSON: formData.get("movieJSON") as string,
		choice: formData.get("choice") as string,
	};

	const validation = RankMovieActionSchema.safeParse(rawData);

	if (!validation.success) {
		console.error("Rank movie validation error:", validation.error.flatten());
		return {
			success: false,
			message: "Invalid input.",
			error:
				validation.error.flatten().fieldErrors.choice?.[0] ||
				"Validation failed",
		};
	}

	let movieObject: TMDBMovie;
	try {
		const parsedMovieData = JSON.parse(validation.data.movieJSON);
		const movieValidation = TMDBMovieSchema.safeParse(parsedMovieData);
		if (!movieValidation.success) {
			return {
				success: false,
				message: "Invalid movie data.",
				error: "Invalid movie data format.",
			};
		}
		movieObject = movieValidation.data;
	} catch (e) {
		return {
			success: false,
			message: "Invalid movie data format.",
			error: "JSON parsing failed.",
		};
	}

	const { choice } = validation.data;
	const userId = session.user.id;
	const movieId = movieObject.id;

	try {
		const db = await getDb();
		const moviesCollection = db.collection("movies");
		const rankingsCollection = db.collection("movieRankings");

		await moviesCollection.updateOne(
			{ id: movieId },
			{
				$set: movieObject,
			},
			{ upsert: true },
		);

		const rankingResult = await rankingsCollection.updateOne(
			{ userId: userId, movieId: movieId },
			{
				$set: {
					rank: choice,
					rankedAt: new Date(),
				},
				$setOnInsert: {
					userId: userId,
					movieId: movieId,
				},
			},
			{ upsert: true },
		);

		if (rankingResult.modifiedCount > 0 || rankingResult.upsertedCount > 0) {
			return {
				success: true,
				message: `Movie '${movieObject.title}' ranked as '${choice}'!`,
			};
		}
		return {
			success: true,
			message: `Movie '${movieObject.title}' already ranked as '${choice}'.`,
		};
	} catch (error) {
		console.error("Error ranking movie:", error);
		return {
			success: false,
			message: "Failed to save ranking.",
			error: error instanceof Error ? error.message : "Database error",
		};
	}
}
