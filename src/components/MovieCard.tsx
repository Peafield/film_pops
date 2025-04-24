"use client";

import type { TMDBMovie } from "@/types";
import { motion } from "framer-motion"; // Using framer-motion based on syntax
import { useState } from "react";

type MovieCardProps = {
	movie: TMDBMovie;
};

export function MovieCard({ movie }: MovieCardProps) {
	const [isFlipped, setIsFlipped] = useState(false);

	const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	return (
		<div
			className="w-full aspect-[2/3] perspective-distant cursor-pointer group"
			onClick={() => setIsFlipped((prev) => !prev)}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") setIsFlipped((prev) => !prev);
			}}
			title={`Click to see details for ${movie.title}`}
		>
			{/* Inner container for 3D transform */}
			<motion.div
				animate={{ rotateY: isFlipped ? 180 : 0 }}
				transition={{ duration: 0.6, ease: "easeInOut" }}
				className="relative w-full h-full transform-3d rounded-lg shadow-lg"
			>
				{/* --- Front Side --- */}
				<motion.div className="absolute inset-0 backface-hidden overflow-hidden rounded-lg">
					<img
						src={imageUrl}
						alt={`${movie.title} Poster`}
						className="w-full h-full object-cover"
						loading="lazy"
					/>
				</motion.div>

				{/* --- Back Side --- */}
				<motion.div className="absolute inset-0 backface-hidden transform rotate-y-180 flex flex-col justify-between items-center p-3 sm:p-4 bg-gray-800 text-white rounded-lg overflow-hidden">
					<h3 className="text-base sm:text-lg font-bold text-center mb-1 sm:mb-2 line-clamp-2">
						{movie.title}
					</h3>
					{/* Scrollable overview area */}
					<p className="text-xs sm:text-sm text-center overflow-y-auto flex-grow mb-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700 max-h-[50%] sm:max-h-[60%]">
						{movie.overview || "No overview available."}
					</p>
					{/* Release Date */}
					<p className="text-xs sm:text-sm font-light mb-2">
						Release: {movie.release_date || "N/A"}
					</p>
				</motion.div>
			</motion.div>
		</div>
	);
}
