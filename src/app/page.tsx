import { MovieCard } from "@/components/MovieCard";
import { getAllUpComingUKMovies } from "@/lib/tmdb";

export default async function Home() {
	const movieData = await getAllUpComingUKMovies();
	if (!movieData) {
		return (
			<div>
				<h1>Failed to load movies. Please try again later</h1>
			</div>
		);
	}
	return (
		<section className="p-4">
			<h1 className="text-center text-2xl font-bold mb-6">
				Upcoming UK Cinema Releases (Next 6 Months)
			</h1>
			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				{movieData.length > 0 ? (
					movieData.map((movie) => <MovieCard key={movie.id} movie={movie} />)
				) : (
					<p>No upcoming movies available</p>
				)}
			</div>
		</section>
	);
}
