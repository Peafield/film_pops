import { PiFilmStrip } from "react-icons/pi";

type FilmPopsLogoProps = {
	title?: string;
};

export function FilmPopsLogo({ title }: FilmPopsLogoProps) {
	if (!title) {
		title = "Film Pops";
	}
	return (
		<span className="flex items-center justify-center gap-1">
			<PiFilmStrip className="text-2xl" />
			<h1 className="font-bold text-lg">{title}</h1>
		</span>
	);
}
