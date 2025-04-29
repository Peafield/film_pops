import { PiFilmStrip } from "react-icons/pi";

export function FilmPopsLogo() {
	return (
		<span className="flex items-center justify-center gap-1">
			<PiFilmStrip className="text-2xl" />
			<h1 className="font-bold text-lg">Film Pops</h1>
		</span>
	);
}
