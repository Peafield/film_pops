import type { TMDBMovie } from "@/types";

type MovieCardProps = {
	movie: TMDBMovie;
};

export function MovieCard({ movie }: MovieCardProps) {
	return (
		<div className="border-amber-600 m-2.5 p-2.5 w-3xs">
			<img
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				alt={`${movie.title}`}
				className="w-full"
			/>
			<h3>{movie.title}</h3>
			<p>{movie.overview}</p>
			<p>Release Date: {movie.release_date} </p>
		</div>
	);
}
