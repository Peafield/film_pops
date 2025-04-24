import { getAllUpComingUKMovies } from "@/lib/tmdb";
import type { TMDBMovie } from "@/types";
import { MovieCard } from "./MovieCard";

export async function MovieGrid() {
	const movieData: TMDBMovie[] | null = await getAllUpComingUKMovies();
	if (!movieData) {
		return (
			<p className="text-center text-red-500 col-span-full">
				Failed to load movie data.
			</p>
		);
	}

	if (movieData.length === 0) {
		return (
			<p className="text-center text-gray-400 col-span-full">
				No upcoming movies found matching the criteria.
			</p>
		);
	}

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
			{movieData.map((movie) => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
}
