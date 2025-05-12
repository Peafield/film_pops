"use client";

import { authClient } from "@/lib/auth-client";
import type { UserWithRole } from "better-auth/plugins";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus, FaUserCog } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiFilmStrip } from "react-icons/pi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Modal } from "../Modal";
import { AdminUserManagementButton } from "../button/AdminUserManagementButton";
import { CreateUserAdminForm } from "../forms/CreateUserAdminForm";
import { AdminDashboardPanel } from "./AdminDashboardPanel";
import { AdminDashBoardPanelTitle } from "./AdminDashboardPanelTitle";
import { AdminUsersTable } from "./AdminUsersTable";

export function Admin() {
	const [usersData, setUserData] = useState<
		UserWithRole[] | never[] | undefined
	>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [showAddUserModal, setShowAddUserModal] = useState(false);

	const refetchAllUsers = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await authClient.admin.listUsers({
				query: {
					limit: 10,
				},
			});
			setUserData(response.data?.users);
		} catch (err) {
			console.error("refetchAllUsers error:", err);
			if (err instanceof Error) {
				setError(err);
			} else {
				setError(new Error("An unknown error occurred"));
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		refetchAllUsers();
	}, [refetchAllUsers]);

	const closeAddUserModal = () => {
		setShowAddUserModal(false);
	};

	return (
		<>
			{showAddUserModal &&
				createPortal(
					<Modal
						title={"Add User"}
						icon={<FaUserCog />}
						buttonTitle="Add user"
						isOpen={showAddUserModal}
						onClose={closeAddUserModal}
						formId="admin-create-user-form"
						isDangerModal={false}
					>
						<CreateUserAdminForm
							formId="admin-create-user-form"
							onClose={closeAddUserModal}
							refetchAllUsers={refetchAllUsers}
						/>
					</Modal>,
					document.body,
				)}
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

					<TabPanel className={"w-full"}>
						<AdminDashboardPanel>
							<div className="flex justify-between items-center mb-6">
								<AdminDashBoardPanelTitle title="User Management" />
								<AdminUserManagementButton
									title="Refresh"
									icon={<FaRotate />}
									onClick={refetchAllUsers}
									type="button"
								/>
								<AdminUserManagementButton
									title="Add user"
									icon={<FaPlus />}
									onClick={() => setShowAddUserModal(true)}
									type="button"
								/>
							</div>
							{isLoading && <div>Loading users...</div>}
							{error && (
								<div className="text-red-500">Error: {error.message}</div>
							)}
							{!isLoading && !error && (
								<AdminUsersTable
									users={usersData}
									refetchAllUsers={refetchAllUsers}
								/>
							)}
						</AdminDashboardPanel>
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
								The tab JavaScript swaps classes to control the content
								visibility and styling.
							</p>
						</section>
					</TabPanel>
				</Tabs>
			</section>
		</>
	);
}
