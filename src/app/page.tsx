import { MovieCard } from "@/components/MovieCard";
import { getUpComingUKMovies } from "@/lib/tmdb";

export default async function Home() {
	const movieData = await getUpComingUKMovies();
	if (!movieData || !movieData.results) {
		return (
			<div>
				<h1>Failed to load movies. Please try again later</h1>
			</div>
		);
	}
	return (
		<section>
			<h1>Upcoming UK Cinema Releases (Next 6 Months)</h1>
			<div className="flex flex-wrap">
				{movieData?.results.length > 0 ? (
					movieData.results.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))
				) : (
					<p>No upcoming movies available</p>
				)}
			</div>
		</section>
	);
}
