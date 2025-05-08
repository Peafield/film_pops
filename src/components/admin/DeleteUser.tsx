import type { UserWithRole } from "better-auth/plugins";
import { FaInfoCircle } from "react-icons/fa";

type DeleteUserProps = {
	user: UserWithRole | never | undefined;
};

export function DeleteUser({ user }: DeleteUserProps) {
	return (
		<div className="p-6">
			<p className="text-gray-400 text-center mb-6">
				Are you sure you want to delete{" "}
				<span className="font-medium text-white">{user?.email}</span>? This
				action cannot be undone
			</p>
			<div className="bg-gray-700/50 border-l-4 border-red-500 p-3 mb-6 rounded">
				<div className="flex items-start">
					<div className="flex-shrink-0 text-red-400 mr-2 mt-0.5">
						<FaInfoCircle />
					</div>
					<p className="text-sm text-gray-300">
						All user data, including activity history and preferences, will be
						permanently deleted.
					</p>
				</div>
			</div>
		</div>
	);
}
