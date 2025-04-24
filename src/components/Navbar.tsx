import Link from "next/link";

// TODO: Make sidebar!
export function Navbar() {
	return (
		<header className="sticky top-0 z-50">
			<nav className="mx-auto flex items-center justify-between p-4">
				<Link href="/">
					<img
						src={"/images/film_pops_logo.png"}
						alt="Film pops logo"
						className="size-16"
					/>
					<h1>Film Pops</h1>
				</Link>
			</nav>
		</header>
	);
}
