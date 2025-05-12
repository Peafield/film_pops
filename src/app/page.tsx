import { LoadingSkeleton } from "@/components/movie/LoadingSkeleton";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { Container } from "@/components/pages/Container";
import { PageHeader } from "@/components/pages/PageHeader";
import { Suspense } from "react";
import { MdOutlineUpcoming } from "react-icons/md";

export default function Home() {
	return (
		<Container>
			<PageHeader
				title="Upcoming Films"
				icon={<MdOutlineUpcoming />}
				subtitle="	Films out now and upcoming in the next 6 months."
			/>
			<Suspense fallback={<LoadingSkeleton count={18} />}>
				<MovieGrid />
			</Suspense>
		</Container>
	);
}

export const metadata = {
	title: "Upcoming Movies",
	description: "Upcoming cinema releases in the UK.",
};
