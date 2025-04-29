import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { MovieGrid } from "@/components/MovieGrid";
import { Suspense } from "react";
import { MdOutlineUpcoming } from "react-icons/md";

export default function Home() {
	return (
		<section className="container mx-auto px-2 sm:px-4 py-8 min-h-screen text-white">
			<div className="flex items-start justify-start gap-1.5">
				<MdOutlineUpcoming className="text-2xl" />
				<h1 className="text-xl mb-6 sm:mb-8">Upcoming Films</h1>
			</div>

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
