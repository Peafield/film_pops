import type { TMDBMovieReponse } from "@/types";
import { formatDate } from "@/utils/formatData";

const tmdbKey = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

export async function getUpComingUKMovies() {
	if (!tmdbKey) {
		console.error("TMDB_API_KEY is not set.");
		return null;
	}

	const today = new Date();
	const year = today.getFullYear();
	const sixMonthsFromNow = new Date(today);
	sixMonthsFromNow.setMonth(today.getMonth() + 6);

	const todayFormatted = formatDate(today);
	const sixMonthsFormatted = formatDate(sixMonthsFromNow);

	const params = new URLSearchParams({
		include_adult: "false",
		include_video: "false",
		language: "en-GB",
		page: "1",
		region: "GB",
		primary_release_year: year.toString(),
		sort_by: "popularity.desc",
		"primary_release_date.gte": todayFormatted,
		"primary_release_date.lte": sixMonthsFormatted,
		watch_region: "GB",
	});

	const fullUrl = `${BASE_URL}?${params}`;

	try {
		const res = await fetch(fullUrl, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${tmdbKey}`,
			},
		});

		if (!res.ok) {
			const errorData = await res.text();
			console.error(
				`TMDb API Error: ${res.status} ${res.statusText}`,
				errorData,
			);
			return null;
		}

		const data: TMDBMovieReponse = await res.json();
		return data;
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		console.error("Error fetching movies:", errorMessage);
		return null;
	}
}
