import { getUserRankingsAction } from "@/app/actions/getUserRankingsAction";
import type { MoviesApiResponse, TMDBMovie } from "@/types";
import { useCallback, useEffect, useState } from "react";

export function useGetAllmovies() {
	const [actualMovieData, setActualMovieData] = useState<TMDBMovie[] | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchMoviesAndRankings = useCallback(async () => {
		setError(null);
		try {
			const moviesResponse = await fetch("/api/movies/upcoming");
			if (!moviesResponse.ok) {
				const errorData = await moviesResponse
					.json()
					.catch(() => ({ message: "Network response was not ok" }));
				throw new Error(
					errorData.message || `HTTP error! status: ${moviesResponse.status}`,
				);
			}
			const moviesApiData: MoviesApiResponse = await moviesResponse.json();
			const rawMovies = moviesApiData.movies || [];

			const userRankingsMap = await getUserRankingsAction();

			const mergedMovies = rawMovies.map((movie) => ({
				...movie,
				userRank: userRankingsMap ? userRankingsMap[movie.id] : undefined,
			}));
			setActualMovieData(mergedMovies);
		} catch (err) {
			console.error("Error in useGetAllmovies (fetchMoviesAndRankings):", err);
			setError(
				err instanceof Error
					? err.message
					: "Failed to load movie data or rankings",
			);
			setActualMovieData([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchMoviesAndRankings();
	}, [fetchMoviesAndRankings]);

	return {
		movieData: actualMovieData,
		loading,
		error,
		refetchMoviesAndRankings: fetchMoviesAndRankings,
	};
}
