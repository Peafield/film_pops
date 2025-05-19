"use client";

import { LiaUsersCogSolid } from "react-icons/lia";
import { PiFilmStrip } from "react-icons/pi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AdminFilmPanel } from "./AdminFilmPanel";
import { AdminUserPanel } from "./AdminUserPanel";

export function Admin() {
	return (
		<section className="container mx-auto p-4">
			<Tabs className="md:flex">
				<TabList className="flex-column space-y space-y-4 text-sm font-medium text-gray-400 md:me-4 mb-4 md:mb-0">
					<Tab className="inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer text-white ">
						<LiaUsersCogSolid className="size-4 me-2 text-white" />
						Users
					</Tab>
					<Tab className="inline-flex items-center px-4 py-3 rounded-lg w-full cursor-pointer text-white">
						<PiFilmStrip className="size-4 me-2 text-white" />
						Films
					</Tab>
				</TabList>

				<TabPanel>
					<AdminUserPanel />
				</TabPanel>

				<TabPanel>
					<AdminFilmPanel />
				</TabPanel>
			</Tabs>
		</section>
	);
}
