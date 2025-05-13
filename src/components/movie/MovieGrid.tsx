"use client";

import { rankMovieAction } from "@/app/actions/rankMovieAction";
import { useGetAllmovies } from "@/hooks/movie/useGetAllMovies";
import type { MovieGridFilter, RankChoice, TMDBMovie } from "@/types";
import Link from "next/link";
import {
	useActionState,
	useEffect,
	useMemo,
	useOptimistic,
	useState,
	useTransition,
} from "react";
import toast from "react-hot-toast";
import { CustomToast } from "../CustomToast";
import { FilterButtons } from "./FilterButtons";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { MovieCard } from "./MovieCard";
import { MovieModal } from "./MovieModal";

export function MovieGrid() {
	const {
		movieData: actualMovieData,
		loading,
		error,
		refetchMoviesAndRankings,
	} = useGetAllmovies();
	const [showMovieModal, setShowMovieModal] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | undefined>(
		undefined,
	);
	const [activeFilter, setActiveFilter] = useState<MovieGridFilter>("all");
	const [rankState, submitRankForm, isRankingPending] = useActionState(
		rankMovieAction,
		null,
	);
	const [isTransitioning, startTransition] = useTransition();

	const [optimisticMovieData, setOptimisticMovieRank] = useOptimistic(
		actualMovieData,
		(
			currentMovies: TMDBMovie[] | null,
			{ movieId, newRank }: { movieId: number; newRank: RankChoice },
		) => {
			if (!currentMovies) return null;
			return currentMovies.map((movie) =>
				movie.id === movieId ? { ...movie, userRank: newRank } : movie,
			);
		},
	);

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
			refetchMoviesAndRankings();
			closeMovieModal();
		}
	}, [rankState, refetchMoviesAndRankings]);

	const sortByReleaseDate = (a: TMDBMovie, b: TMDBMovie) => {
		return (
			new Date(a.release_date || 0).getTime() -
			new Date(b.release_date || 0).getTime()
		);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const filteredAndSortedMovies = useMemo(() => {
		if (!optimisticMovieData) return [];

		let processedMovies: TMDBMovie[] = [];

		switch (activeFilter) {
			case "yeah":
				processedMovies = optimisticMovieData.filter(
					(m) => m.userRank === "yeah",
				);
				break;
			case "maybe":
				processedMovies = optimisticMovieData.filter(
					(m) => m.userRank === "maybe",
				);
				break;
			case "nope":
				processedMovies = optimisticMovieData.filter(
					(m) => m.userRank === "nope",
				);
				break;
			case "toRank":
				processedMovies = optimisticMovieData.filter((m) => !m.userRank);
				break;
			default:
				processedMovies = [...optimisticMovieData];
				break;
		}

		processedMovies.sort(sortByReleaseDate);

		return processedMovies;
	}, [optimisticMovieData, activeFilter]);

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

	if (loading && !optimisticMovieData) {
		return (
			<>
				<FilterButtons
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
				/>
				<LoadingSkeleton count={18} />
			</>
		);
	}

	if (error) {
		return (
			<>
				<FilterButtons
					activeFilter={activeFilter}
					setActiveFilter={setActiveFilter}
				/>
				<p className="text-center text-red-500 col-span-full">
					Error loading movies: {error}
				</p>
			</>
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
			setOptimisticMovieRank({ movieId: selectedMovie.id, newRank: choice });
			submitRankForm(formData);
		});
	};

	return (
		<>
			{showMovieModal && selectedMovie && (
				<MovieModal
					isOpen={showMovieModal}
					onClose={closeMovieModal}
					movie={
						optimisticMovieData?.find((m) => m.id === selectedMovie.id) ||
						selectedMovie
					}
					onRank={handleRank}
					isRanking={isRankingPending || isTransitioning}
				/>
			)}

			<FilterButtons
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
			/>
			{filteredAndSortedMovies.length === 0 && !loading ? (
				<>
					{activeFilter === "toRank" ? (
						<div className="flex flex-col items-center justify-center  text-gray-400">
							<p>You've ranked all the films! 😀</p>
							<Link
								href={"/pops-picks"}
								className="text-indigo-400 hover:text-indigo-600"
							>
								Check you what the other pops have chosen
							</Link>
						</div>
					) : (
						<p className="text-center text-gray-400">
							No movies match your current filter.
						</p>
					)}
				</>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{filteredAndSortedMovies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							onCardClick={() => openMovieModal(movie)}
						/>
					))}
				</div>
			)}
		</>
	);
}
