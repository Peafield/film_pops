"use client";

import { FaQuestion, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export function PopsPicksMovieCardSkeleton() {
	const VoteItemSkeleton = ({
		icon,
	}: { icon: React.ReactNode; color: string }) => (
		<div className={"flex items-center space-x-1.5 animate-pulse"}>
			{icon}
			<div className="flex-grow bg-gray-600 rounded-full h-1.5 overflow-hidden ml-1" />
			<span className="text-gray-400 w-7 text-right" />
		</div>
	);

	return (
		<div className="bg-gray-800 rounded-lg shadow-xl flex flex-col h-full">
			<div className="flex flex-grow">
				<div className="w-28 md:w-24 flex-shrink-0 bg-gray-700 rounded-l-lg animate-pulse" />

				<div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
					<div>
						<div className="h-5 bg-gray-600 rounded w-3/4 mb-2 animate-pulse" />
						<div className="h-4 bg-gray-600 rounded w-1/2 mb-1.5 animate-pulse" />

						<div className="flex flex-wrap gap-1 mb-2">
							<div className="h-3 bg-gray-700 rounded-full w-12 animate-pulse" />
							<div className="h-3 bg-gray-700 rounded-full w-16 animate-pulse" />
						</div>
						<div className="h-3 bg-gray-500 rounded w-1/4 mb-2 animate-pulse" />
					</div>
					<div className="space-y-1 text-xs animate-pulse">
						<VoteItemSkeleton
							icon={<FaThumbsUp size={12} className="text-gray-600" />}
							color="text-gray-600"
						/>
						<VoteItemSkeleton
							icon={<FaQuestion size={12} className="text-gray-600" />}
							color="text-gray-600"
						/>
						<VoteItemSkeleton
							icon={<FaThumbsDown size={12} className="text-gray-600" />}
							color="text-gray-600"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
