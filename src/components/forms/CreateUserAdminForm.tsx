import type { CreateUserForm } from "@/client-types";
import { useAdminCreateUser } from "@/hooks/admin/useAdminCreateUser";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { CustomToast } from "../CustomToast";

type CreateUserAdminFormProps = {
	formId: string;
	onClose: () => void;
	refetchAllUsers: () => void;
};
export function CreateUserAdminForm({
	formId,
	onClose,
	refetchAllUsers,
}: CreateUserAdminFormProps) {
	const {
		createUser,
		error: apiError,
		data: successData,
	} = useAdminCreateUser();
	const [userData, setUserData] = useState<CreateUserForm>({
		name: "",
		email: "",
		password: "",
		role: "user",
	});
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			await createUser(userData);
			toast.custom(
				<CustomToast
					variant="success"
					message={`User ${userData.email} created sucessfully!`}
				/>,
			);
			refetchAllUsers();
			onClose();
		} catch (e) {
			toast.custom(
				<CustomToast
					variant="error"
					message={`Something's gone wrong: ${apiError}`}
				/>,
			);
			console.error(e);
		}
	};

	return (
		<form id={formId} onSubmit={handleSubmit} className="space-y-4 p-5">
			<div className="space-y-1">
				<label htmlFor="name" className="text-sm font-medium text-gray-400">
					Name
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
						<FaUser />
					</div>
					<input
						type="text"
						id="name"
						value={userData?.name}
						onChange={(e) => setUserData({ ...userData, name: e.target.value })}
						required
						placeholder="Poppa Film"
						className="w-full pl-10 pr-3 py-2 text-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
					/>
				</div>
			</div>
			<div className="space-y-1">
				<label htmlFor="email" className="text-sm font-medium text-gray-400">
					Email
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
						<FaEnvelope />
					</div>
					<input
						type="email"
						id="email"
						value={userData.email}
						onChange={(e) =>
							setUserData({ ...userData, email: e.target.value })
						}
						required
						placeholder="poppafilm@filmpops.com"
						className="w-full pl-10 pr-3 py-2 text-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
					/>
				</div>
			</div>
			<div className="space-y-1">
				<label htmlFor="password" className="text-sm font-medium text-gray-400">
					Password
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
						<FaLock />
					</div>
					<input
						type="password"
						id="password"
						value={userData.password}
						onChange={(e) =>
							setUserData({ ...userData, password: e.target.value })
						}
						required
						placeholder="password123"
						className="w-full pl-10 pr-3 py-2 text-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
					/>
				</div>
			</div>
		</form>
	);
}
