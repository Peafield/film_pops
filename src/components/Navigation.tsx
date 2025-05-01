"use client";

import { usePathname } from "next/navigation";
import { FilmPopsLogo } from "./FilmPopsLogo";
import { Sidebar } from "./SideBar";

export function Navigation() {
	const pathname = usePathname();
	const hideSidebarOnRoutes = ["/signin", "/signup", "/pending-approval"];
	const shouldShowSidebar = !hideSidebarOnRoutes.includes(pathname);
	return (
		<nav className="px-5 py-2 border-b-2 border-zinc-800">
			<div className="flex items-center justify-between gap-3">
				{shouldShowSidebar && <Sidebar />}
				<FilmPopsLogo />
			</div>
		</nav>
	);
}
