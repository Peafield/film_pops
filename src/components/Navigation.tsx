import { PiFilmStrip } from "react-icons/pi";
import { FilmPopsLogo } from "./FilmPopsLogo";
import { Sidebar } from "./SideBar";

export function Navigation() {
	return (
		<nav className="px-5 py-2 border-b-2 border-zinc-800">
			<div className="flex items-center justify-between gap-3">
				<Sidebar />
				<FilmPopsLogo />
			</div>
		</nav>
	);
}
