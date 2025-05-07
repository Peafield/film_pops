import type { CreateUserForm } from "@/client-types";
import { useAdminCreateUser } from "@/hooks/admin/useAdminCreateUser";
import { type FormEvent, useState } from "react";

export function CreateUserAdminForm() {
	const {
		createUser,
		isLoading,
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
		<form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
			<h2>Create New User (Admin)</h2>
			<div>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					value={userData?.name}
					onChange={(e) => setUserData({ ...userData, name: e.target.value })}
					required
					className="border p-2 w-full bg-gray-700"
				/>
			</div>
			<div>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					value={userData.email}
					onChange={(e) => setUserData({ ...userData, email: e.target.value })}
					required
					className="border p-2 w-full bg-gray-700"
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					value={userData.password}
					onChange={(e) =>
						setUserData({ ...userData, password: e.target.value })
					}
					required
					className="border p-2 w-full bg-gray-700"
				/>
			</div>
			{apiError && <p className="text-red-500">{apiError}</p>}
			{successData && (
				<p className="text-green-500">User created successfully!</p>
			)}{" "}
			<button
				type="submit"
				disabled={isLoading}
				className="bg-blue-600 text-white p-2 rounded"
			>
				{isLoading ? "Creating User..." : "Create User"}
			</button>
		</form>
	);
}
