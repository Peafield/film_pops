import type {
	ArchiveMoviesActionResult,
	MarkMovieAsSeenResult,
} from "@/app/admin/action";
import { useCallback, useState } from "react";

export function useMarkMovieAsSeen() {
	const [markMovieAsSeenResult, setMarkMovieAsSeenResult] =
		useState<MarkMovieAsSeenResult | null>(null);
	const [isMarkingAsSeen, setIsMarkingAsSeen] = useState(false);
	const [markingAsSeenError, setMarkingAsSeenError] = useState<string | null>(
		null,
	);

	const triggerMarkMovieAsSeen = useCallback(
		async ({ movieId }: { movieId: number }) => {
			setIsMarkingAsSeen(true);
			setMarkingAsSeenError(null);
			setMarkMovieAsSeenResult(null);
			const url = `/api/admin/mark-movie-as-seen?movieId=${movieId}`;
			try {
				const response = await fetch(url, {
					method: "POST",
				});

				const responseJson: MarkMovieAsSeenResult = await response.json();

				if (!response.ok || !responseJson.success) {
					const errorMessage =
						responseJson.message ||
						responseJson.error ||
						"Failed to mark movie as seen.";
					throw new Error(errorMessage);
				}

				setMarkMovieAsSeenResult(responseJson);
			} catch (err) {
				console.error(
					"Error in useMarkMovieAsSeen (triggerMarkMovieAsSeen):",
					err,
				);
				const message =
					err instanceof Error
						? err.message
						: "An unknown error occurred while marking movie as seen.";
				setMarkingAsSeenError(message);
				setMarkMovieAsSeenResult({ success: false, message: message });
			} finally {
				setIsMarkingAsSeen(false);
			}
		},
		[],
	);

	return {
		markMovieAsSeenResult,
		isMarkingAsSeen,
		markingAsSeenError,
		triggerMarkMovieAsSeen,
	};
}
