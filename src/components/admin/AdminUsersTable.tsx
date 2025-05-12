import { authClient } from "@/lib/auth-client";
import type { UserWithRole } from "better-auth/plugins";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaUserMinus } from "react-icons/fa";
import { CustomToast } from "../CustomToast";
import { Modal } from "../Modal";
import { DeleteUser } from "./DeleteUser";

type AdminUsersTableProps = {
	refetchAllUsers: () => void;
	users?: UserWithRole[] | never[] | undefined;
};

export function AdminUsersTable({
	users,
	refetchAllUsers,
}: AdminUsersTableProps) {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const selectedUser = users?.find((user) => user.id === selectedUserId);

	const handleDeleteUser = useCallback(async () => {
		if (!selectedUserId) return;
		try {
			await authClient.admin.removeUser({
				userId: selectedUserId,
			});
			toast.custom(
				<CustomToast
					variant="info"
					message={`User ${selectedUser?.email} successfully deleted`}
				/>,
			);
			setShowDeleteModal(false);
			setSelectedUserId(null);
			refetchAllUsers();
		} catch (err) {
			console.error("Error deleting users:", err);
			setShowDeleteModal(false);
			setSelectedUserId(null);
		}
	}, [selectedUserId, selectedUser?.email, refetchAllUsers]);

	const openDeleteModal = (userId: string) => {
		setSelectedUserId(userId);
		setShowDeleteModal(true);
	};

	const closeDeleteModal = () => {
		setShowDeleteModal(false);
		setSelectedUserId(null);
	};

	return (
		<>
			{showDeleteModal &&
				selectedUser &&
				createPortal(
					<Modal
						title={"Delete User Account"}
						icon={<FaUserMinus />}
						buttonTitle="Delete"
						isOpen={showDeleteModal}
						onClose={closeDeleteModal}
						primaryButtonOnClick={handleDeleteUser}
						isDangerModal
					>
						<DeleteUser user={selectedUser} />
					</Modal>,
					document.body,
				)}
			<div className="rounded-lg shadow">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-900">
						<thead className="bg-gray-900">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
								>
									Name
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
								>
									Email
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
								>
									Role
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody id="user-table-body" className="divide-y divide-gray-900">
							{users?.map((user) => {
								return (
									<tr key={user.name} className="hover:bg-gray-900">
										<td className="px-6 py-4 whitespace-nowrap">
											<p className="text-sm font-medium text-white">
												{user.name}
											</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<p className="text-sm text-gray-300">{user.email}</p>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													user.role === "admin"
														? "bg-purple-500 text-white"
														: user.role === "user"
															? "bg-blue-500 text-white"
															: "bg-gray-500 text-white"
												}`}
											>
												{user.role}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<button
												type="button"
												onClick={() => openDeleteModal(user.id)}
												className="text-red-500 hover:text-red-600 cursor-pointer"
												disabled={user.role === "admin"}
											>
												<FaTrash />
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
