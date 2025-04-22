import { getUpComingUKMovies } from "@/lib/tmdb";

export default async function Home() {
	const data = await getUpComingUKMovies();
	if (data) console.log(data.results);
	return <div>home</div>;
}
