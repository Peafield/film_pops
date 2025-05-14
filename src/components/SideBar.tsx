"use client";

import { authClient } from "@/lib/auth-client";
import { InferUserFromClient } from "better-auth";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineAdminPanelSettings, MdOutlineUpcoming } from "react-icons/md";
import { PiRanking } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { useClickAway } from "react-use";
import { FilmPopsLogo } from "./FilmPopsLogo";

export const Sidebar = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const { data: session } = authClient.useSession();
	const userData = session?.user;
	useClickAway(ref, () => setOpen(false));
	const handleToggleSidebar = () => setOpen((prev) => !prev);
	const handleSignOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login");
				},
			},
		});
	};

	return (
		<>
			<button
				type="button"
				onClick={handleToggleSidebar}
				className="p-3 border-2 border-zinc-800 rounded-xl"
				aria-label="toggle sidebar"
			>
				<GiHamburgerMenu />
			</button>
			<AnimatePresence mode="wait" initial={false}>
				{open && (
					<>
						<motion.div
							{...framerSidebarBackground}
							aria-hidden="true"
							className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
						/>
						<motion.div
							{...framerSidebarPanel}
							className="fixed top-0 bottom-0 left-0 z-50 w-full h-screen max-w-xs border-r-2 border-zinc-800 bg-zinc-900"
							ref={ref}
							aria-label="Sidebar"
						>
							<div className="flex items-center justify-between p-5 border-b-2 border-zinc-800">
								<FilmPopsLogo title={userData?.name} />
								<button
									type="button"
									onClick={handleToggleSidebar}
									className="p-3 border-2 border-zinc-800 rounded-xl"
									aria-label="close sidebar"
								>
									<AiOutlineRollback />
								</button>
							</div>
							<ul>
								{items.map((item, idx) => {
									const { title, href, Icon } = item;
									const clickHandler =
										item.action === "signout"
											? handleSignOut
											: handleToggleSidebar;
									if (title === "Admin" && userData?.role !== "admin") {
										return null;
									}
									return (
										<li key={title}>
											<a
												onClick={clickHandler}
												href={href}
												className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:ring-2 hover:ring-amber-600 border-zinc-800 cursor-pointer"
											>
												<motion.span {...framerText(idx)}>{title}</motion.span>
												<motion.div {...framerIcon}>
													<Icon className="text-2xl" />
												</motion.div>
											</a>
										</li>
									);
								})}
							</ul>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

const items = [
	{
		title: "Admin",
		Icon: MdOutlineAdminPanelSettings,
		href: "/admin",
		action: "toggle",
	},
	{
		title: "Upcoming Films",
		Icon: MdOutlineUpcoming,
		href: "/",
		action: "toggle",
	},
	{
		title: "Pops' Picks",
		Icon: PiRanking,
		href: "/pops-picks",
		action: "toggle",
	},
	{
		title: "Settings",
		Icon: RiUserSettingsLine,
		href: "/settings",
		action: "toggle",
	},
	{ title: "Sign Out", Icon: BiLogOut, action: "signout" },
];

const framerSidebarBackground = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0, transition: { delay: 0.2 } },
	transition: { duration: 0.2 },
};

const framerSidebarPanel = {
	initial: { x: "-100%" },
	animate: { x: 0 },
	exit: { x: "-100%" },
	transition: { duration: 0.1 },
};

const framerText = (delay: number) => {
	return {
		initial: { opacity: 0, x: -50 },
		animate: { opacity: 1, x: 0 },
		transition: {
			delay: 0.2 + delay / 5,
		},
	};
};

const framerIcon = {
	initial: { scale: 0 },
	animate: { scale: 1 },
	transition: {
		type: "spring",
		stiffness: 260,
		damping: 20,
		delay: 1.5,
	},
};

// Code based on https://www.freecodecamp.org/news/create-a-fully-animated-sidebar/
