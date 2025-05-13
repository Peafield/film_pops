import { getAllUpComingUKMovies } from "@/lib/tmdb";
import type { MoviesApiResponse, TMDBMovie } from "@/types";
import { useEffect, useState } from "react";

export function useGetAllmovies() {
	const [movieData, setMovieData] = useState<TMDBMovie[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMovies() {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch("/api/movies/upcoming");
				if (!response.ok) {
					const errorData = await response
						.json()
						.catch(() => ({ message: "Network response was not ok" }));
					throw new Error(
						errorData.message || `HTTP error! status: ${response.status}`,
					);
				}
				const data: MoviesApiResponse = await response.json();
				setMovieData(data.movies || []);
			} catch (err) {
				console.error("Error in useGetAllmovies:", err);
				setError(err instanceof Error ? err.message : "Failed to load movies");
				setMovieData([]);
			} finally {
				setLoading(false);
			}
		}
		fetchMovies();
	}, []);

	return { movieData, loading, error };
}
