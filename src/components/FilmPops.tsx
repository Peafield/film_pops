import { FilmPopsLogo } from "./FilmPopsLogo";

type FilmPopsLogoProps = {
	name?: string;
};

export function FilmPops({ name }: FilmPopsLogoProps) {
	if (!name) {
		name = "";
	}
	return (
		<span className="flex items-center justify-center">
			<FilmPopsLogo className="size-10 mr-4" />
			<h1 className="font-bold text-lg">{name}</h1>
		</span>
	);
}
