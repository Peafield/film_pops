import Link from "next/link";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50">
			<nav className="mx-auto flex items-center justify-between p-4">
				<Link href="/">
					<img src={"/image/film_pops_logo.png"} alt="Film pops logo" />
				</Link>
			</nav>
		</header>
	);
}
