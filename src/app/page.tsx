import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { MovieGrid } from "@/components/MovieGrid";
import { Suspense } from "react";

export default function Home() {
	return (
		<section className="container mx-auto px-2 sm:px-4 py-8 min-h-screen text-white">
			<h1 className="text-center text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
				Upcoming UK Cinema Releases (Next 6 Months)
			</h1>
			<Suspense fallback={<LoadingSkeleton count={18} />}>
				<MovieGrid />
			</Suspense>
		</section>
	);
}

export const metadata = {
	title: "Upcoming Movies",
	description: "Upcoming cinema releases in the UK.",
};
