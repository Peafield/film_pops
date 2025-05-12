"use client";

import type { TMDBMovie } from "@/types";

type MovieCardProps = {
	movie: TMDBMovie;
	onCardClick: () => void;
};

export function MovieCard({ movie, onCardClick }: MovieCardProps) {
	const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	return (
		<div
			className="w-full cursor-pointer group"
			onClick={onCardClick}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onCardClick();
				}
			}}
			aria-label="Movie card"
		>
			<div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
				<img
					src={imageUrl}
					alt={`Poster for ${movie.title}`}
					className="w-full h-auto aspect-[2/3] object-cover"
					loading="lazy"
				/>
			</div>
		</div>
	);
}
