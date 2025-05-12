"use client";

import type { TMDBMovie } from "@/types";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaQuestion, FaThumbsDown, FaThumbsUp, FaTimes } from "react-icons/fa";

type MovieModalProps = {
	movie: TMDBMovie;
	isOpen: boolean;
	onClose: () => void;
};

export function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
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
	return createPortal(
		// Modal overlay
		<div className="fixed inset-0 z-50 p-4 backdrop-blur-sm flex items-center justify-center">
			{/* Modal Container */}
			<dialog
				ref={dialogRef}
				className="m-auto bg-gray-800 rounded-xl max-w-2xl w-full overflow-hidden animate-fade-in transform transition-all"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors"
				>
					<FaTimes />
				</button>

				<div className="md:flex">
					{/* Movie Poster */}
					<div className="md: w-1/3">
						<img
							src={posterURL}
							alt={`Post for ${movie.title}`}
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Movie Details */}
					<div className="p-6 md:w-2/3">
						<div className="mb-4">
							<h2 className="text-2xl font-bold mb-1 text-white">
								{movie.title}
							</h2>
							<div className="flex items-center text-gray-400 text-sm mb-4">
								{/* TODO: Convert release date to 'Thursday, 24th April' or something similar */}
								<span className="mr-3">{movie.release_date}</span>
								{/* TODO: Add rating, length... */}
							</div>
						</div>

						{/* Movie Overview */}
						<div className="mb-6">
							<h3 className="font-semibold mb-2 text-gray-300">Synopsis</h3>
							<div className="max-h-32 overflow-y-auto pr-2 text-gray-300 text-sm">
								{movie.overview}
							</div>
						</div>

						{/* TODO: Add genres... */}

						{/* Action Buttons */}
						<div className="flex justify-between gap-3">
							<button
								type="button"
								className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
							>
								<FaThumbsUp className="mr-2" />
								<span>Yeah!</span>
							</button>
							<button
								type="button"
								className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
							>
								<FaQuestion className="mr-2" />
								<span>Maybe</span>
							</button>
							<button
								type="button"
								className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
							>
								<FaThumbsDown className="mr-2" />
								<span>Nope</span>
							</button>
						</div>
					</div>
				</div>
			</dialog>
		</div>,
		document.body,
	);
}
