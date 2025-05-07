import type { UserWithRole } from "better-auth/plugins";
import { FaEdit, FaTrash } from "react-icons/fa";

type AdminUsersTableProps = {
	users?: UserWithRole[] | never[] | undefined;
};

export function AdminUsersTable({ users }: AdminUsersTableProps) {
	return (
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
											// onclick="editUser(${user.id})"
											className="text-primary-500 hover:text-primary-600 mr-3"
										>
											<FaEdit />
										</button>
										<button
											type="button"
											// onclick="confirmDeleteUser(${user.id})"
											className="text-red-500 hover:text-red-600"
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
	);
}
