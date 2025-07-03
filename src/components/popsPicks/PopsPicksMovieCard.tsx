import type { PopsPickMovie } from "@/types";
import { tmdbGenreMap } from "@/utils/tmdbGenreMap";
import { useEffect, useRef, useState } from "react";
import {
	FaQuestion,
	FaStar,
	FaThumbsDown,
	FaThumbsUp,
	FaVoteYea,
} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { VoteItem } from "./PopsPicksVoteItem";
import { PopsPicksVoterList } from "./PopsPicksVoterList";

type PopsPicksMovieCardProps = {
	movie: PopsPickMovie;
};

export function PopsPicksMovieCard({ movie }: PopsPicksMovieCardProps) {
	const [showVotersPopup, setShowVotersPopup] = useState(false);
	const popupRef = useRef<HTMLDivElement>(null);
	const iconRef = useRef<HTMLButtonElement>(null);

	const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	const genreNames = movie.genre_ids
		?.map((id) => tmdbGenreMap[id])
		.filter((name) => name)
		.slice(0, 3);

	const totalVotes = movie.totalUserVotes || 0;
	const yeahPercentage =
		totalVotes > 0 ? Math.round((movie.yeahVotes / totalVotes) * 100) : 0;
	const maybePercentage =
		totalVotes > 0 ? Math.round((movie.maybeVotes / totalVotes) * 100) : 0;
	const nopePercentage =
		totalVotes > 0 ? Math.round((movie.nopeVotes / totalVotes) * 100) : 0;

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				popupRef.current &&
				!popupRef.current.contains(event.target as Node) &&
				iconRef.current &&
				!iconRef.current.contains(event.target as Node)
			) {
				setShowVotersPopup(false);
			}
		}
		if (showVotersPopup) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showVotersPopup]);

	return (
		<div className="relative bg-gray-800 rounded-lg shadow-xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
			<button
				ref={iconRef}
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setShowVotersPopup(!showVotersPopup);
				}}
				className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 cursor-pointer"
				aria-label="Show voters"
			>
				<FaCircleInfo size={16} />
			</button>

			{showVotersPopup && (
				<div
					ref={popupRef}
					className="absolute top-10 right-2 z-20 w-56 p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-xl space-y-2 animate-fade-in-fast"
				>
					<h4 className="text-sm font-semibold text-white border-b border-gray-600 pb-1 mb-2">
						Who Voted:
					</h4>
					<PopsPicksVoterList
						icon={<FaThumbsUp size={12} />}
						iconColor="yeah"
						voters={movie.yeahVoters}
					/>
					<PopsPicksVoterList
						icon={<FaQuestion size={12} />}
						iconColor="maybe"
						voters={movie.maybeVoters}
					/>
					<PopsPicksVoterList
						icon={<FaThumbsDown size={12} />}
						iconColor="nope"
						voters={movie.nopeVoters}
					/>
					{movie.yeahVoters.length === 0 &&
						movie.maybeVoters.length === 0 &&
						movie.nopeVoters.length === 0 && (
							<p className="text-xs text-gray-400">
								No votes recorded yet for this movie.
							</p>
						)}
				</div>
			)}
			<div className="flex flex-grow">
				{movie.poster_path && (
					<div className="w-28 md:w-24 flex-shrink-0">
						<img
							src={posterUrl}
							alt={`Poster for ${movie.title}`}
							className="w-full h-full object-cover rounded-l-lg"
							loading="lazy"
						/>
					</div>
				)}

				<div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
					<div>
						<h3 className="font-bold text-md sm:text-lg text-white mb-1 line-clamp-2 leading-tight">
							{movie.title}
						</h3>
						<p className="text-xs text-gray-400 mb-1.5">
							{movie.release_date
								? new Date(movie.release_date).toLocaleDateString("en-GB", {
										year: "numeric",
										month: "short",
									})
								: "N/A"}
							{genreNames && genreNames.length > 0 && (
								<span className="ml-2 pl-2 border-l border-gray-700">
									{genreNames.join(", ")}
								</span>
							)}
						</p>
						<div className="flex items-center gap-4 ">
							<p
								className="text-xs text-gray-500 mb-2 flex items-center"
								title="Total votes"
							>
								<FaVoteYea className="mr-2" />
								<span className="font-semibold">{movie.totalUserVotes}</span>
							</p>
							<p
								className="text-xs text-gray-500 mb-2 flex items-center"
								title="Voting score"
							>
								<FaStar className="mr-2" />
								<span className="font-semibold">{movie.totalScore}</span>
							</p>
						</div>
					</div>

					<div className="space-y-1 text-xs">
						<VoteItem
							icon={<FaThumbsUp />}
							color="yeah"
							percentage={yeahPercentage}
						/>
						<VoteItem
							icon={<FaQuestion />}
							color="maybe"
							percentage={maybePercentage}
						/>
						<VoteItem
							icon={<FaThumbsDown />}
							color="nope"
							percentage={nopePercentage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
