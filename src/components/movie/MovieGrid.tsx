"use client";

import { getAllUpComingUKMovies } from "@/lib/tmdb";
import type { TMDBMovie } from "@/types";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { MovieModal } from "./MovieModal";

type MovieGridProps = {
	movieData: TMDBMovie[] | null;
};

export function MovieGrid({ movieData }: MovieGridProps) {
	const [showMovieModal, setShowMovieModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | undefined>(
		undefined,
	);

	// Effect to stop scroll when model is open.
	useEffect(() => {
		if (showMovieModal) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showMovieModal]);

	if (!movieData) {
		return (
			<p className="text-center text-red-500 col-span-full">
				Failed to load movie data.
			</p>
		);
	}

	if (movieData.length === 0) {
		return (
			<p className="text-center text-gray-400 col-span-full">
				No upcoming movies found matching the criteria.
			</p>
		);
	}

	const openMovieModal = (movie: TMDBMovie) => {
		setSelectedMovie(movie);
		setShowMovieModal(true);
	};

	const closeMovieModal = () => {
		setShowMovieModal(false);
		setSelectedMovie(undefined);
	};

	return (
		<>
			{showMovieModal && selectedMovie && (
				<MovieModal
					isOpen={showMovieModal}
					onClose={closeMovieModal}
					movie={selectedMovie}
				/>
			)}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{movieData.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						onCardClick={() => openMovieModal(movie)}
					/>
				))}
			</div>
		</>
	);
}
