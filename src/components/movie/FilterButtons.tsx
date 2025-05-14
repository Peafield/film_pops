import type { MovieGridFilter } from "@/types";
import { cn } from "@/utils/cn";
import type { SetStateAction } from "react";
import {
	FaFilter,
	FaList,
	FaQuestion,
	FaThumbsDown,
	FaThumbsUp,
} from "react-icons/fa";

type FilterButtonsProps = {
	activeFilter: MovieGridFilter;
	setActiveFilter: (value: SetStateAction<MovieGridFilter>) => void;
};

const filterButtons: {
	label: string;
	value: MovieGridFilter;
	icon?: React.ReactNode;
}[] = [
	{ label: "All", value: "all", icon: <FaList /> },
	{ label: "To Rank", value: "toRank", icon: <FaFilter /> },
	{ label: "Yeah!", value: "yeah", icon: <FaThumbsUp /> },
	{ label: "Maybe", value: "maybe", icon: <FaQuestion /> },
	{ label: "Nope", value: "nope", icon: <FaThumbsDown /> },
];

export function FilterButtons({
	activeFilter,
	setActiveFilter,
}: FilterButtonsProps) {
	return (
		<div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
			{filterButtons.map((filter) => (
				<button
					type="button"
					key={filter.value}
					onClick={() => setActiveFilter(filter.value)}
					className={cn(
						"px-3 py-2 text-xs sm:text-sm font-medium rounded-lg flex items-center transition-colors duration-150 ease-in-out",
						{
							"bg-indigo-600 text-white shadow-md":
								activeFilter === filter.value,
						},
						{
							"bg-gray-700 text-gray-300 hover:bg-gray-600":
								activeFilter !== filter.value,
						},
					)}
				>
					{filter.icon && <span className="mr-1.5 sm:mr-2">{filter.icon}</span>}
					{filter.label}
				</button>
			))}
		</div>
	);
}
