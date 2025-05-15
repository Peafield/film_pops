"use client";

import { useGetPopsPicks } from "@/hooks/popsPicks/useGetPopsPicks";
import type { PopsPickMovie } from "@/types";
import { useMemo } from "react";
import { FaQuestion, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { LoadingSkeleton } from "../movie/LoadingSkeleton";
import { PopsPicksMovieCard } from "./PopsPicksMovieCard";
import { PopsPicksMovieCardSkeleton } from "./PopsPicksMovieCardSkeleton";
import { PopsPicksRankSection } from "./PopsPicksRankSection";

export function PopsPicks() {
	const { popsPicksData, loading, error } = useGetPopsPicks();

	const { yeahMovies, maybeMovies, nopeMovies, otherMovies } = useMemo(() => {
		if (!popsPicksData?.picks || !popsPicksData.success) {
			return {
				yeahMovies: [],
				maybeMovies: [],
				nopeMovies: [],
				otherMovies: [],
			};
		}

		const allPicks = popsPicksData.picks;
		const yeah: PopsPickMovie[] = [];
		const maybe: PopsPickMovie[] = [];
		const nope: PopsPickMovie[] = [];
		const others: PopsPickMovie[] = [];

		for (const movie of allPicks) {
			const { yeahVotes, maybeVotes, nopeVotes, totalScore, totalUserVotes } =
				movie;

			// Rule 1: Clear "Yeah" - Positive score, yeahs are dominant or only positive votes
			if (
				totalScore >= 2 &&
				(yeahVotes > nopeVotes ||
					(yeahVotes > 0 && maybeVotes === 0 && nopeVotes === 0))
			) {
				yeah.push(movie);
			}
			// Rule 2: Clear "Nope" - Negative score, nopes are dominant or only negative votes
			else if (
				totalScore <= -1 &&
				(nopeVotes > yeahVotes ||
					(nopeVotes > 0 && maybeVotes === 0 && yeahVotes === 0))
			) {
				nope.push(movie);
			}
			// Rule 3: "Maybe" candidates - includes balanced votes (e.g., 1 yeah, 1 nope = score 1)
			else if (totalUserVotes > 0) {
				if (maybeVotes > yeahVotes && maybeVotes > nopeVotes) {
					maybe.push(movie);
				}
				// If scores are neutral (0) or slightly positive (1) due to balanced yeah/nope
				else if (
					totalScore === 0 ||
					(totalScore === 1 && yeahVotes === nopeVotes + 1) ||
					(totalScore === 1 && yeahVotes > 0 && yeahVotes === nopeVotes)
				) {
					maybe.push(movie);
				}
				// If score is positive but not overwhelmingly "Yeah" (e.g. 1 yeah, many maybes)
				else if (
					totalScore > 0 &&
					yeahVotes <= nopeVotes &&
					yeahVotes <= maybeVotes
				) {
					maybe.push(movie);
				}
				// Fallback for remaining positive scores to Yeah
				else if (totalScore > 0) {
					yeah.push(movie);
				}
				// Fallback for remaining negative scores to Nope
				else if (totalScore < 0) {
					nope.push(movie);
				}
				// Default to others if still uncategorized with votes (should be rare)
				else {
					others.push(movie);
				}
			} else {
				others.push(movie);
			}
		}

		const uniqueYeah = Array.from(new Set(yeah.map((m) => m.id)))
			.map((id) => yeah.find((m) => m.id === id))
			.filter((m): m is PopsPickMovie => m !== undefined);

		const uniqueMaybe = Array.from(new Set(maybe.map((m) => m.id)))
			.map((id) => maybe.find((m) => m.id === id))
			.filter((m): m is PopsPickMovie => m !== undefined)
			.filter((m) => !uniqueYeah.some((uy) => uy.id === m.id));

		const uniqueNope = Array.from(new Set(nope.map((m) => m.id)))
			.map((id) => nope.find((m) => m.id === id))
			.filter((m): m is PopsPickMovie => m !== undefined)
			.filter(
				(m) =>
					!uniqueYeah.some((uy) => uy.id === m.id) &&
					!uniqueMaybe.some((um) => um.id === m.id),
			);

		const uniqueOthers = Array.from(new Set(others.map((m) => m.id)))
			.map((id) => others.find((m) => m.id === id))
			.filter((m): m is PopsPickMovie => m !== undefined)
			.filter((m): m is PopsPickMovie => m !== undefined)
			.filter(
				(m) =>
					!uniqueYeah.some((uy) => uy.id === m.id) &&
					!uniqueMaybe.some((um) => um.id === m.id) &&
					!uniqueNope.some((un) => un.id === m.id),
			);

		return {
			yeahMovies: uniqueYeah,
			maybeMovies: uniqueMaybe,
			nopeMovies: uniqueNope,
			otherMovies: uniqueOthers,
		};
	}, [popsPicksData]);

	if (loading) {
		return (
			<div className="container mx-auto p-4">
				<h1 className="text-3xl font-bold text-white mb-8 text-center">
					Pops' Picks
				</h1>
				{/* Render a grid of skeletons */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{Array.from({ length: 12 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<PopsPicksMovieCardSkeleton key={index} />
					))}
				</div>
			</div>
		);
	}

	if (error || !popsPicksData?.success) {
		return (
			<div className="container mx-auto p-4 text-center">
				<h1 className="text-3xl font-bold text-white mb-8">Pops' Picks</h1>
				<p className="text-red-500 p-4">
					Something's gone wrong loading Pops' Picks:{" "}
					{error || popsPicksData?.message}
				</p>
			</div>
		);
	}

	const noPicksAtAll =
		yeahMovies.length === 0 &&
		maybeMovies.length === 0 &&
		nopeMovies.length === 0 &&
		otherMovies.length === 0;

	if (noPicksAtAll) {
		return (
			<div className="container mx-auto p-4 text-center">
				<h1 className="text-3xl font-bold text-white mb-8">Pops' Picks</h1>
				<p className="text-gray-400 p-4">
					{popsPicksData.message || "No movies have been ranked yet!"}
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<PopsPicksRankSection
				title="Films We Definitely Want To See!"
				icon={<FaThumbsUp />}
				movies={yeahMovies}
				defaultOpen={true}
			/>
			<PopsPicksRankSection
				title="Maybes - Worth Considering"
				icon={<FaQuestion />}
				movies={maybeMovies}
				defaultOpen={false}
			/>
			<PopsPicksRankSection
				title="Probably Not This Time"
				icon={<FaThumbsDown />}
				movies={nopeMovies}
				defaultOpen={false}
			/>
		</div>
	);
}
