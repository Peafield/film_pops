"use client";

import type { RankChoice, TMDBMovie } from "@/types";
import { cn } from "@/utils/cn";
import { h1 } from "motion/react-client";
import { FaQuestion, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

type MovieCardProps = {
	movie: TMDBMovie;
	onCardClick: () => void;
};

const RankIndicatorIcon = ({ rank }: { rank: RankChoice }) => {
	let icon = null;
	let color = "";
	switch (rank) {
		case "yeah":
			icon = <FaThumbsUp />;
			color = "text-green-500";
			break;
		case "maybe":
			icon = <FaQuestion />;
			color = "text-yellow-500";
			break;
		case "nope":
			icon = <FaThumbsDown />;
			color = "text-red-500";
			break;
		default:
			return null;
	}
	return (
		<div
			className={`absolute top-2 right-2 p-1.5 bg-gray-900 bg-opacity-70 rounded-full ${color}`}
		>
			{icon}
		</div>
	);
};

export function MovieCard({ movie, onCardClick }: MovieCardProps) {
	const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	return (
		<div
			className="w-full cursor-pointer group relative"
			onClick={onCardClick}
			onKeyUp={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onCardClick();
				}
			}}
			aria-label="Movie card"
		>
			<div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
				{movie.poster_path ? (
					<img
						src={imageUrl}
						alt={`Poster for ${movie.title}`}
						className={cn("w-full h-auto aspect-[2/3] object-cover", {
							"grayscale-100": movie.userRank === "nope",
						})}
						loading="lazy"
					/>
				) : (
					<div
						className={cn(
							"w-full h-auto aspect-[2/3] object-cover flex items-center justify-center",
							{
								"grayscale-100": movie.userRank === "nope",
							},
						)}
					>
						<h1>{movie.title}</h1>
					</div>
				)}

				{movie.userRank && <RankIndicatorIcon rank={movie.userRank} />}
			</div>
		</div>
	);
}
