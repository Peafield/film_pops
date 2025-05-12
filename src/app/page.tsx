import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { MovieGrid } from "@/components/movie/MovieGrid";
import { getAllUpComingUKMovies } from "@/lib/tmdb";
import type { TMDBMovie } from "@/types";
import { MdOutlineUpcoming } from "react-icons/md";

export default async function Home() {
	const movieData: TMDBMovie[] | null = await getAllUpComingUKMovies();
	return (
		<Container>
			<PageHeader
				title="Upcoming Films"
				icon={<MdOutlineUpcoming />}
				subtitle="	Films out now and upcoming in the next 6 months."
			/>
			<MovieGrid movieData={movieData} />
		</Container>
	);
}

export const metadata = {
	title: "Upcoming Movies",
	description: "Upcoming cinema releases in the UK.",
};
