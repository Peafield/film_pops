"use client";

import { LiaUsersCogSolid } from "react-icons/lia";
import { PiFilmStrip } from "react-icons/pi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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
					<section className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
						<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
							Profile Tab
						</h3>
						<p className="mb-2">
							This is some placeholder content the Profile tab's associated
							content, clicking another tab will toggle the visibility of this
							one for the next.
						</p>
						<p>
							The tab JavaScript swaps classes to control the content visibility
							and styling.
						</p>
					</section>
				</TabPanel>
				<TabPanel>
					<section className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
						<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
							Films Tab
						</h3>
						<p className="mb-2">
							This is some placeholder content the Profile tab's associated
							content, clicking another tab will toggle the visibility of this
							one for the next.
						</p>
						<p>
							The tab JavaScript swaps classes to control the content visibility
							and styling.
						</p>
					</section>
				</TabPanel>
			</Tabs>
		</section>
	);
}
