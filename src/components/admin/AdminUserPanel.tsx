import { authClient } from "@/lib/auth-client";
import type { UserWithRole } from "better-auth/plugins";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus, FaUserCog } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { Modal } from "../Modal";
import { PrimaryButton } from "../button/PrimaryButton";
import { CreateUserAdminForm } from "../forms/CreateUserAdminForm";
import { AdminDashboardPanel } from "./AdminDashboardPanel";
import { AdminDashBoardPanelTitle } from "./AdminDashboardPanelTitle";
import { AdminUsersTable } from "./AdminUsersTable";

export function AdminUserPanel() {
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
			<AdminDashboardPanel>
				<div className="flex justify-between items-center mb-6">
					<AdminDashBoardPanelTitle title="User Management" />
					<PrimaryButton
						title="Refresh"
						icon={<FaRotate />}
						onClick={refetchAllUsers}
						type="button"
					/>
					<PrimaryButton
						title="Add user"
						icon={<FaPlus />}
						onClick={() => setShowAddUserModal(true)}
						type="button"
					/>
				</div>
				{isLoading && <div>Loading users...</div>}
				{error && <div className="text-red-500">Error: {error.message}</div>}
				{!isLoading && !error && (
					<AdminUsersTable
						users={usersData}
						refetchAllUsers={refetchAllUsers}
					/>
				)}
			</AdminDashboardPanel>
		</>
	);
}
