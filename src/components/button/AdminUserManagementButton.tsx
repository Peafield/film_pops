import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

type AdminUserManagementButtonProps = {
	title: string;
	icon: React.ReactNode;
	onClick?: () => void;
};

// TODO: find a better fix for rending icon and title!
export function AdminUserManagementButton({
	title,
	icon,
	onClick,
}: AdminUserManagementButtonProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	});
	return (
		<button
			type="button"
			onClick={onClick}
			className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
		>
			<span className="md:mr-2">{icon}</span>
			{isMounted ? (isMobile ? null : title) : null}
		</button>
	);
}
