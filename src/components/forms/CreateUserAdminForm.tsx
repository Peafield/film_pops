import type { CreateUserForm } from "@/client-types";
import { useAdminCreateUser } from "@/hooks/admin/useAdminCreateUser";
import { type FormEvent, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

type CreateUserAdminFormProps = {
	formId: string;
};
export function CreateUserAdminForm({ formId }: CreateUserAdminFormProps) {
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
		} catch (e) {
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
						className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
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
						className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
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
						className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
					/>
				</div>
			</div>
			{apiError && <p className="text-red-500">{apiError}</p>}
			{successData && (
				<p className="text-green-500">User created successfully!</p>
			)}
		</form>
	);
}
