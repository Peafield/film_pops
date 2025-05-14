import { getAllUpComingUKMovies } from "@/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const movies = await getAllUpComingUKMovies();
		if (!movies) {
			return NextResponse.json(
				{ error: "Failed to fetch movies from TMDB." },
				{ status: 500 },
			);
		}
		return NextResponse.json({ movies });
	} catch (error) {
		console.error("API route error fetching upcoming movies:", error);
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 },
		);
	}
}
