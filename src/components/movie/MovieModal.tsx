"use client";

import type { RankChoice, TMDBMovie } from "@/types";
import { tmdbGenreMap } from "@/utils/tmdbGenreMap";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
	FaQuestion,
	FaThumbsDown,
	FaThumbsUp,
	FaTimes,
	FaTimesCircle,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

type MovieModalProps = {
	movie: TMDBMovie;
	isOpen: boolean;
	onClose: () => void;
	onRank: (choice: RankChoice) => void;
	isRanking: boolean;
};

export function MovieModal({
	movie,
	isOpen,
	onClose,
	onRank,
	isRanking,
}: MovieModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	// Effect open and close the dialog.
	useEffect(() => {
		const dialogNode = dialogRef.current;
		if (!dialogNode) return;

		if (isOpen) {
			if (!dialogNode.hasAttribute("open")) {
				dialogNode.showModal();
			}
		} else {
			if (dialogNode.hasAttribute("open")) {
				dialogNode.close();
			}
		}
	}, [isOpen]);

	// Effect to handle outside click or escape key.
	useEffect(() => {
		const dialogNode = dialogRef.current;
		if (!dialogNode) return;

		const handleCancel = (event: Event) => {
			event.preventDefault();
			onClose();
		};
		dialogNode.addEventListener("cancel", handleCancel);

		const handleClick = (event: MouseEvent) => {
			if (event.target === dialogNode) {
				onClose();
			}
		};
		dialogNode.addEventListener("click", handleClick);

		return () => {
			dialogNode.removeEventListener("cancel", handleCancel);
			dialogNode.removeEventListener("click", handleClick);
		};
	}, [onClose]);

	const genreNames = movie.genre_ids
		?.map((id) => tmdbGenreMap[id])
		.filter((name) => name)
		.slice(0, 3);

	return createPortal(
		// Modal overlay
		<div className="fixed inset-0 z-50 p-4 backdrop-blur-sm flex items-center justify-center">
			{/* Modal Container */}
			<dialog
				ref={dialogRef}
				className="m-auto bg-gray-800 rounded-xl max-w-2xl w-full overflow-y-auto animate-fade-in transform transition-all"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors"
				>
					<FaTimesCircle size={24} />
				</button>

				<div className="overflow-y-auto flex-grow">
					<div className="flex flex-col md:flex-row">
						{/* Movie Poster */}
						<div className="w-full md:w-1/3 flex-shrink-0">
							<img
								src={posterURL}
								alt={`Post for ${movie.title}`}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Movie Details */}
						<div className="p-4 md:p-6 space-y-4 md:w-2/3">
							<div className="mb-0">
								<h2 className="text-2xl font-bold mb-1 text-white">
									{movie.title}
								</h2>
								<div className="flex items-center text-gray-400 text-sm mb-4">
									<span className="mr-3">
										{movie.release_date
											? new Date(movie.release_date).toLocaleDateString(
													"en-GB",
													{ year: "numeric", month: "long", day: "numeric" },
												)
											: "N/A"}
									</span>
								</div>
							</div>

							{/* Movie Overview */}
							<div>
								<h3 className="font-semibold mb-1 text-gray-300">Synopsis</h3>
								<div className="max-h-32 overflow-y-auto pr-2 text-gray-300 text-sm">
									{movie.overview}
								</div>
							</div>
							{genreNames && genreNames.length > 0 && (
								<div className="flex flex-wrap gap-2 mb-3">
									{genreNames.map((genre) => (
										<span
											key={genre}
											className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
										>
											{genre}
										</span>
									))}
								</div>
							)}
							<Link
								href={`https://www.themoviedb.org/movie/${movie.id}`}
								className="font-semibold mb-2 text-gray-300 hover:text-gray-500 flex items-center"
								target="_blank"
								rel="noopener noreferrer"
							>
								<FaCircleInfo className="mr-2" />
								More info
							</Link>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<footer className="flex flex-col sm:flex-row justify-around items-center p-4 border-t border-gray-700 space-y-3 sm:space-y-0 sm:space-x-3">
					<button
						type="button"
						onClick={() => onRank("yeah")}
						disabled={isRanking}
						className="w-full sm:flex-1 flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						<FaThumbsUp className="mr-2" />
						<span>Yeah!</span>
					</button>
					<button
						type="button"
						onClick={() => onRank("maybe")}
						disabled={isRanking}
						className="w-full sm:flex-1 flex items-center justify-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						<FaQuestion className="mr-2" />
						<span>Maybe</span>
					</button>
					<button
						type="button"
						onClick={() => onRank("nope")}
						disabled={isRanking}
						className="w-full sm:flex-1 flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						<FaThumbsDown className="mr-2" />
						<span>Nope</span>
					</button>
				</footer>
			</dialog>
		</div>,
		document.body,
	);
}
