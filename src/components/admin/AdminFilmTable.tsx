import type { GetPopsPicksResult, PopsPickMovie, TMDBMovie } from "@/types";

type AdminFilmActionsProps = {
	archivedMovies?: TMDBMovie[];
};

export function AdminFilmTable({ archivedMovies }: AdminFilmActionsProps) {
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
								className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
							>
								Release Date
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
							>
								Seen?
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
											{archivedMovie.seen}
										</p>
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
