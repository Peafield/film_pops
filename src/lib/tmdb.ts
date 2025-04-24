import type { TMDBMovie, TMDBMovieReponse } from "@/types";
import { formatDate } from "@/utils/formatData";

const tmdbKey = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/discover/movie";

export async function fetchSingleMoviePage(
	page: string,
	startDate: string,
	endDate: string,
): Promise<TMDBMovie[] | null> {
	if (!tmdbKey) return null;

	const params = new URLSearchParams({
		include_adult: "false",
		include_video: "false",
		language: "en-GB",
		with_original_language: "en",
		page: page,
		region: "GB",
		sort_by: "popularity.desc",
		"primary_release_date.gte": startDate,
		"primary_release_date.lte": endDate,
		with_release_type: "3",
		without_genres: "99",
	});

	const fullUrl = `${BASE_URL}?${params}`;

	try {
		const res = await fetch(fullUrl, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${tmdbKey}`,
			},
			next: { revalidate: 3600 },
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
		return data.results || [];
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		console.error("Error fetching single page movies:", errorMessage);
		return null;
	}
}

export async function getAllUpComingUKMovies() {
	if (!tmdbKey) {
		console.error("TMDB_API_KEY is not set.");
		return null;
	}

	const today = new Date();
	const twoWeeksAgoStartDate = new Date(today);
	twoWeeksAgoStartDate.setDate(today.getDate() - 14);
	const sixMonthsFromNow = new Date(today);
	sixMonthsFromNow.setMonth(today.getMonth() + 6);

	const startDate = formatDate(twoWeeksAgoStartDate);
	const endDate = formatDate(sixMonthsFromNow);

	const pageNumbers: string[] = ["1", "2", "3"];

	const pagePromises = pageNumbers.map((page) => {
		return fetchSingleMoviePage(page, startDate, endDate);
	});

	const resultsPerPage: TMDBMovie[] = (await Promise.all(pagePromises)).flatMap(
		(results) => results || [],
	);
	let allMoviesForNext6Months: TMDBMovie[] = [];
	for (const results of resultsPerPage) {
		if (results) {
			allMoviesForNext6Months = allMoviesForNext6Months.concat(results);
		}
	}

	const uniqueMoviesMap = new Map<number, TMDBMovie>();
	for (const movie of allMoviesForNext6Months) {
		uniqueMoviesMap.set(movie.id, movie);
	}

	const uniqueMovies = Array.from(uniqueMoviesMap.values());

	uniqueMovies.sort((a, b) => {
		if (a.release_date < b.release_date) return -1;
		if (a.release_date > b.release_date) return 1;
		return 0;
	});

	return uniqueMovies;
}
