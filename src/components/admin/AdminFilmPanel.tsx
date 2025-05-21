"use client";

import { useAdminArchiveOldMovies } from "@/hooks/admin/useAdminArchiveMovies";
import { useGetArchivedMovies } from "@/hooks/admin/useGetArchivedMovies";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaArchive } from "react-icons/fa";
import { CustomToast } from "../CustomToast";
import { PrimaryButton } from "../button/PrimaryButton";
import { AdminDashboardPanel } from "./AdminDashboardPanel";
import { AdminDashBoardPanelTitle } from "./AdminDashboardPanelTitle";
import { AdminFilmTable } from "./AdminFilmTable";

export function AdminFilmPanel() {
	const { archiveResult, isArchiving, archiveError, triggerArchiveOldMovies } =
		useAdminArchiveOldMovies();
	const { archivedMovieData, loading, error, refetchArchivedMovies } =
		useGetArchivedMovies();

	useEffect(() => {
		if (archiveResult) {
			if (!archiveResult.success) {
				toast.custom(
					<CustomToast
						variant="error"
						message={
							archiveResult.message ||
							archiveError ||
							"Oops, something went wrong with archiving."
						}
					/>,
				);
			} else {
				toast.custom(
					<CustomToast
						variant="success"
						message={archiveResult.message || "Successfully archived movies."}
					/>,
				);
				if (refetchArchivedMovies) {
					refetchArchivedMovies();
				}
			}
		}
	}, [archiveResult, archiveError, refetchArchivedMovies]);

	return (
		<AdminDashboardPanel>
			<div className="flex justify-between items-center mb-6">
				<AdminDashBoardPanelTitle title="User Management" />
				<PrimaryButton
					title={isArchiving ? "Archiving movies..." : "Archive Old Movies"}
					icon={<FaArchive />}
					onClick={triggerArchiveOldMovies}
					type="button"
				/>
			</div>
			{loading && <div>Loading archived films...</div>}
			{!loading && !error && archivedMovieData && (
				<AdminFilmTable
					archivedMovies={archivedMovieData.movies}
					refetchArchivedMovies={refetchArchivedMovies}
				/>
			)}
		</AdminDashboardPanel>
	);
}
