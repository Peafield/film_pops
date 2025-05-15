import type { PopsPickMovie } from "@/types";
import { tmdbGenreMap } from "@/utils/tmdbGenreMap";
import {
	FaQuestion,
	FaStar,
	FaThumbsDown,
	FaThumbsUp,
	FaVoteYea,
} from "react-icons/fa";
import { VoteItem } from "./PopsPicksVoteItem";

type PopsPicksMovieCardProps = {
	movie: PopsPickMovie;
};

export function PopsPicksMovieCard({ movie }: PopsPicksMovieCardProps) {
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

	return (
		<div className="bg-gray-800 rounded-lg shadow-xl flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
			<div className="flex flex-grow">
				<div className="w-28 md:w-24 flex-shrink-0">
					<img
						src={posterUrl}
						alt={`Poster for ${movie.title}`}
						className="w-full h-full object-cover rounded-l-lg"
						loading="lazy"
					/>
				</div>
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
