import { useMarkMovieAsSeen } from "@/hooks/admin/useAdminMarkMovieAsSeen";
import { useGetArchivedMovies } from "@/hooks/admin/useGetArchivedMovies";
import type { TMDBMovie } from "@/types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { CustomToast } from "../CustomToast";

type AdminFilmActionsProps = {
	archivedMovies?: TMDBMovie[];
	refetchArchivedMovies: () => Promise<void>;
};

export function AdminFilmTable({
	archivedMovies,
	refetchArchivedMovies,
}: AdminFilmActionsProps) {
	const {
		triggerMarkMovieAsSeen,
		isMarkingAsSeen,
		markMovieAsSeenResult,
		markingAsSeenError,
	} = useMarkMovieAsSeen();

	useEffect(() => {
		if (markMovieAsSeenResult) {
			if (!markMovieAsSeenResult.success) {
				toast.custom(
					<CustomToast
						variant="error"
						message={
							markMovieAsSeenResult.message ||
							markingAsSeenError ||
							"Oops, something went wrong marking the movie as seeen."
						}
					/>,
				);
			} else {
				toast.custom(
					<CustomToast
						variant="success"
						message={
							markMovieAsSeenResult.message ||
							"Successfully marked movie as seen."
						}
					/>,
				);
				if (refetchArchivedMovies) {
					refetchArchivedMovies();
				}
			}
		}
	}, [markMovieAsSeenResult, markingAsSeenError, refetchArchivedMovies]);

	return (
		<div className="rounded-lg shadow">
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-900">
					<thead className="bg-gray-900">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
							>
								Title
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
							>
								Release Date
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
							>
								Seen?
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody id="user-table-body" className="divide-y divide-gray-900">
						{archivedMovies?.map((archivedMovie) => {
							return (
								<tr key={archivedMovie.id} className="hover:bg-gray-900">
									<td className="px-6 py-4 whitespace-nowrap">
										<p className="text-sm font-medium text-white">
											{archivedMovie.title}
										</p>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<p className="text-sm text-gray-300">
											{archivedMovie.release_date}
										</p>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<p className="text-sm text-gray-300">
											{archivedMovie.seen ? "Yes" : "No"}
										</p>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button
											type="button"
											onClick={() =>
												triggerMarkMovieAsSeen({ movieId: archivedMovie.id })
											}
											className="text-indigo-400 hover:text-indigo-600 cursor-pointer"
											disabled={archivedMovie.seen}
										>
											<FaEye />
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
