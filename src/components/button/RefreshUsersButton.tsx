import { MdRefresh } from "react-icons/md";

type RefreshAllUsersButtonProps = {
	refreshAllUsers: () => void;
};

export function RefreshAllUsersButton({
	refreshAllUsers,
}: RefreshAllUsersButtonProps) {
	return (
		<button
			type="button"
			onClick={refreshAllUsers}
			className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg flex items-center"
		>
			<MdRefresh className="mr-2" /> Refresh Users
		</button>
	);
}
