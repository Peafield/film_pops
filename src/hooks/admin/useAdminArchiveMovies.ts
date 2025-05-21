import type { ArchiveMoviesActionResult } from "@/app/admin/action";
import { useCallback, useState } from "react";

export function useAdminArchiveOldMovies() {
	const [archiveResult, setArchiveResult] =
		useState<ArchiveMoviesActionResult | null>(null);
	const [isArchiving, setIsArchiving] = useState(false);
	const [archiveError, setArchiveError] = useState<string | null>(null);

	const triggerArchiveOldMovies = useCallback(async () => {
		setIsArchiving(true);
		setArchiveError(null);
		setArchiveResult(null);
		try {
			const response = await fetch("/api/admin/archive-movies", {
				method: "POST",
			});

			const responseJson: ArchiveMoviesActionResult = await response.json();

			if (!response.ok || !responseJson.success) {
				const errorMessage =
					responseJson.message ||
					responseJson.error ||
					"Failed to archive movies.";
				throw new Error(errorMessage);
			}

			setArchiveResult(responseJson);
		} catch (err) {
			console.error(
				"Error in useAdminArchiveOldMovies (triggerArchiveOldMovies):",
				err,
			);
			const message =
				err instanceof Error
					? err.message
					: "An unknown error occurred during archiving.";
			setArchiveError(message);
			setArchiveResult({ success: false, message: message });
		} finally {
			setIsArchiving(false);
		}
	}, []);

	return {
		archiveResult,
		isArchiving,
		archiveError,
		triggerArchiveOldMovies,
	};
}
