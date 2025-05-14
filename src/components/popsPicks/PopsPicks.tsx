"use client";

import { useGetPopsPicks } from "@/hooks/popsPicks/useGetPopsPicks";

export function PopsPicks() {
	const { popsPicksData, loading, error } = useGetPopsPicks();
	return <h1>Pops' Picks</h1>;
}
