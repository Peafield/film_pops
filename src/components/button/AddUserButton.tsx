import { FaPlus } from "react-icons/fa";

export function AddUserButton() {
	return (
		<button
			type="button"
			className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
		>
			<FaPlus className="mr-2" /> Add User
		</button>
	);
}
