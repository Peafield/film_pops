import type { GetArchivedMoviesResult } from "@/app/admin/action";
import { useCallback, useEffect, useState } from "react";

export function useGetArchivedMovies() {
	const [acrhivedMoviesData, setArchivedMovies] =
		useState<GetArchivedMoviesResult | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchArchivedMovies = useCallback(async () => {
		setError(null);
		try {
			const acrhivedMoviesDataReponse = await fetch(
				"/api/admin/get-archived-movies/",
			);
			if (!acrhivedMoviesDataReponse.ok) {
				const errorData = await acrhivedMoviesDataReponse
					.json()
					.catch(() => ({ message: "Network response was not ok" }));
				throw new Error(
					errorData.message ||
						`HTTP error! status: ${acrhivedMoviesDataReponse.status}`,
				);
			}
			const responseJson: GetArchivedMoviesResult =
				await acrhivedMoviesDataReponse.json();
			if (responseJson) {
				setArchivedMovies(responseJson);
			} else {
				console.warn(
					"Unexpected API response structure for Admin Achived Movies:",
					responseJson,
				);
				setArchivedMovies({
					success: false,
					movies: [],
					message: "Unexpected data format.",
				});
			}
		} catch (err) {
			console.error(
				"Error in useGetArchivedMovies (fetchArchivedMovies):",
				err,
			);
			setError(
				err instanceof Error
					? err.message
					: "Failed to load archived movie data",
			);
			setArchivedMovies(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchArchivedMovies();
	}, [fetchArchivedMovies]);

	return {
		archivedMovieData: acrhivedMoviesData,
		loading,
		error,
		refetchArchivedMovies: fetchArchivedMovies,
	};
}
