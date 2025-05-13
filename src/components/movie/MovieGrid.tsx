"use client";

import { rankMovieAction } from "@/app/actions/rankMovieAction";
import { useGetAllmovies } from "@/hooks/movie/useGetAllMovies";
import type { RankChoice, TMDBMovie } from "@/types";
import { useActionState, useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { CustomToast } from "../CustomToast";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { MovieCard } from "./MovieCard";
import { MovieModal } from "./MovieModal";

export function MovieGrid() {
	const { movieData, loading, error } = useGetAllmovies();
	const [showMovieModal, setShowMovieModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | undefined>(
		undefined,
	);
	const [rankState, submitRankForm, isRankingPending] = useActionState(
		rankMovieAction,
		null,
	);

	const [isTransitioning, startTransition] = useTransition();

	useEffect(() => {
		if (rankState?.message) {
			toast.custom(
				<CustomToast
					variant={rankState.success ? "success" : "error"}
					message={rankState.message}
				/>,
			);
		}
		if (rankState?.success) {
			closeMovieModal();
		}
	}, [rankState]);

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

	if (loading) {
		return <LoadingSkeleton count={18} />;
	}

	if (error) {
		return (
			<p className="text-center text-red-500 col-span-full">
				Error loading movies: {error}
			</p>
		);
	}

	if (!movieData || movieData.length === 0) {
		return (
			<p className="text-center text-gray-400 col-span-full">
				No upcoming movies found.
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

	const handleRank = (choice: RankChoice) => {
		if (!selectedMovie) return;
		const formData = new FormData();
		formData.append("movieJSON", JSON.stringify(selectedMovie));
		formData.append("choice", choice);
		startTransition(() => {
			submitRankForm(formData);
		});
	};

	return (
		<>
			{showMovieModal && selectedMovie && (
				<MovieModal
					isOpen={showMovieModal}
					onClose={closeMovieModal}
					movie={selectedMovie}
					onRank={handleRank}
					isRanking={isRankingPending}
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
