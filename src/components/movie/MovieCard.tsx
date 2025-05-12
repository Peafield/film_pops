"use client";

import type { TMDBMovie } from "@/types";
import { useState } from "react";

type MovieCardProps = {
	movie: TMDBMovie;
	toggleOpenMovieModal: () => void;
	setSelectedMovie: (movie: TMDBMovie) => void;
};

export function MovieCard({
	movie,
	toggleOpenMovieModal,
	setSelectedMovie,
}: MovieCardProps) {
	const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	return (
		<div
			className="max-w-auto mx-auto cursor-pointer"
			onClick={() => {
				toggleOpenMovieModal();
				setSelectedMovie(movie);
			}}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					toggleOpenMovieModal;
				}
			}}
			aria-label="Movie card"
		>
			<div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
				<img
					src={imageUrl}
					alt={`Poster for ${movie.title}`}
					className="w-full h-64 object-cover"
					loading="lazy"
				/>
			</div>
		</div>
	);
}
