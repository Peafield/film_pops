"use server";

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import type { TMDBMovie } from "@/types";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

const AVERAGE_FILM_RUN_WEEKS = 2.9;
const DAYS_IN_WEEK = 7;
const ARCHIVE_THRESHOLD_DAYS = Math.round(
	AVERAGE_FILM_RUN_WEEKS * DAYS_IN_WEEK,
);

export type ArchiveMoviesActionResult = {
	success: boolean;
	message: string;
	archivedCount?: number;
	error?: string;
};

export async function archiveOldMoviesAction(): Promise<ArchiveMoviesActionResult> {
	const readonlyRequestHeaders = headers();
	const requestHeaders = new Headers(await readonlyRequestHeaders);
	const session = await auth.api.getSession({ headers: requestHeaders });

	if (!session?.user?.id) {
		return {
			success: false,
			message: "Not authenticated.",
			error: "User not logged in or session invalid.",
		};
	}

	let userRole: string | undefined | null = null;

	try {
		const db = await getDb();
		const userCollection = db.collection<{ role?: string }>("user");
		const userDoc = await userCollection.findOne({
			_id: new ObjectId(session.user.id),
		});

		if (userDoc) {
			userRole = userDoc.role;
		} else {
			console.error(
				`[Archive Action] User with ID ${session.user.id} not found in database.`,
			);
			return {
				success: false,
				message: "Authorization check failed.",
				error: "User not found.",
			};
		}
	} catch (dbError) {
		console.error(
			"[Archive Action] Error fetching user for role check:",
			dbError,
		);
		return {
			success: false,
			message: "Authorization check failed.",
			error: "Could not verify user role.",
		};
	}

	if (userRole !== "admin") {
		console.log(
			`[Archive Action] Authorization failed. User role: ${userRole}`,
		);
		return {
			success: false,
			message: "Not authorized.",
			error: "User lacks admin privileges.",
		};
	}

	try {
		const db = await getDb();
		const moviesCollection = db.collection<TMDBMovie>("movies");

		const thresholdDate = new Date();
		thresholdDate.setDate(thresholdDate.getDate() - ARCHIVE_THRESHOLD_DAYS);
		const thresholdDateString = thresholdDate.toISOString().split("T")[0];

		console.log(
			`[Archive Action] User ${session.user.id} (role: ${userRole}) is archiving movies released before: ${thresholdDateString} (approx ${AVERAGE_FILM_RUN_WEEKS} weeks ago).`,
		);
		const updateResult = await moviesCollection.updateMany(
			{
				release_date: { $lt: thresholdDateString },
				$or: [{ isArchived: { $exists: false } }, { isArchived: false }],
			},
			{
				$set: {
					isArchived: true,
					archivedAt: new Date(),
				},
			},
		);

		const archivedCount = updateResult.modifiedCount;
		console.log(
			`[Archive Action] Successfully archived ${archivedCount} movies.`,
		);

		return {
			success: true,
			message: `Successfully archived ${archivedCount} movies released before ${thresholdDateString}.`,
			archivedCount: archivedCount,
		};
	} catch (error) {
		console.error("[Archive Action] Error during archiving movies:", error);
		return {
			success: false,
			message: "Failed to archive movies.",
			error: error instanceof Error ? error.message : "Unknown server error.",
		};
	}
}

export type GetArchivedMoviesResult = {
	success: boolean;
	movies?: TMDBMovie[];
	message: string;
	error?: string;
};

export async function getArchivedMoviesAction(): Promise<GetArchivedMoviesResult> {
	const readonlyRequestHeaders = headers();
	const requestHeaders = new Headers(await readonlyRequestHeaders);
	const session = await auth.api.getSession({ headers: requestHeaders });

	if (!session?.user?.id) {
		return {
			success: false,
			message: "Not authenticated.",
			error: "User not logged in or session invalid.",
		};
	}

	let userRole: string | undefined | null = null;
	try {
		const db = await getDb();
		const userCollection = db.collection<{ role?: string }>("user");
		const userDoc = await userCollection.findOne({
			_id: new ObjectId(session.user.id),
		});

		if (userDoc) {
			userRole = userDoc.role;
		} else {
			return {
				success: false,
				message: "Authorization check failed.",
				error: "User not found.",
			};
		}
	} catch (dbError) {
		return {
			success: false,
			message: "Authorization check failed.",
			error: "Could not verify user role.",
		};
	}

	if (userRole !== "admin") {
		return {
			success: false,
			message: "Not authorized.",
			error: "User lacks admin privileges.",
		};
	}

	try {
		const db = await getDb();
		const moviesCollection = db.collection<TMDBMovie>("movies");

		const archivedMoviesList = await moviesCollection
			.find({ isArchived: true })
			.sort({ archivedAt: -1 })
			.toArray();

		return {
			success: true,
			message: "Successfully retrieved archived movies.",
			movies: archivedMoviesList,
		};
	} catch (error) {
		console.error(
			"[Get Archived Action] Error fetching archived movies:",
			error,
		);
		return {
			success: false,
			message: "Failed to fetch archived movies.",
			error: error instanceof Error ? error.message : "Unknown server error.",
		};
	}
}
