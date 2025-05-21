import type { ApiRouteResponse, GetPopsPicksResult } from "@/types";
import { useCallback, useEffect, useState } from "react";

export function useGetPopsPicks() {
	const [popsPicksData, setPopsPicksData] = useState<GetPopsPicksResult | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchPopsPicks = useCallback(async () => {
		setError(null);
		try {
			const popsPicksResponse = await fetch("/api/pops-picks/");
			if (!popsPicksResponse.ok) {
				const errorData = await popsPicksResponse
					.json()
					.catch(() => ({ message: "Network response was not ok" }));
				throw new Error(
					errorData.message ||
						`HTTP error! status: ${popsPicksResponse.status}`,
				);
			}
			const responseJson: ApiRouteResponse = await popsPicksResponse.json();
			if (responseJson?.popsPicks) {
				setPopsPicksData(responseJson.popsPicks);
			} else {
				console.warn(
					"Unexpected API response structure for Pops' Picks:",
					responseJson,
				);
				setPopsPicksData({
					success: false,
					picks: [],
					message: "Unexpected data format.",
				});
			}
		} catch (err) {
			console.error("Error in useGetPopsPicks (fetchPopsPicks):", err);
			setError(
				err instanceof Error ? err.message : "Failed to load pops' picks data",
			);
			setPopsPicksData(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchPopsPicks();
	}, [fetchPopsPicks]);

	return {
		popsPicksData: popsPicksData,
		loading,
		error,
		refetchPopsPicks: fetchPopsPicks,
	};
}
