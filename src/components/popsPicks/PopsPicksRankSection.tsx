import type { PopsPickMovie } from "@/types";
import { useMemo, useState as useSectionState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { PopsPicksMovieCard } from "./PopsPicksMovieCard";
import { PopsPicksRankSectionHeader } from "./PopsPicksRankSectionHeader";

type PopsPicksRankSectionProps = {
	title: string;
	icon: React.ReactElement;
	movies?: PopsPickMovie[];
	defaultOpen: boolean;
};

export function PopsPicksRankSection({
	title,
	icon,
	movies,
	defaultOpen = false,
}: PopsPicksRankSectionProps) {
	const [isOpen, setIsOpen] = useSectionState(defaultOpen);
	if (!movies) {
		return null;
	}
	return (
		<section className="mb-12">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex justify-between items-center text-sm md:text-xl  font-semibold  mb-4 pb-2 border-b-2 border-gray-700 hover:text-indigo-300 transition-colors"
				aria-expanded={isOpen}
				aria-controls={`section-content-${title.replace(/\s+/g, "-")}`}
			>
				<PopsPicksRankSectionHeader title={title} icon={icon} />
				{isOpen ? <FaChevronDown /> : <FaChevronRight />}
			</button>
			{isOpen && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{movies.map((movie) => (
						<PopsPicksMovieCard key={movie.id} movie={movie} />
					))}
				</div>
			)}
		</section>
	);
}
