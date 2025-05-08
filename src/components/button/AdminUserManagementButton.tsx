import { useAdminCreateUser } from "@/hooks/admin/useAdminCreateUser";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

type AdminUserManagementButtonProps = {
	title: string;
	type: "submit" | "button";
	icon?: React.ReactNode;
	onClick?: () => void;
	isModal?: boolean;
	form?: string;
};

export function AdminUserManagementButton({
	title,
	icon,
	onClick,
	isModal = false,
	type,
	form,
}: AdminUserManagementButtonProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	});
	return (
		<button
			form={form}
			type={type}
			onClick={onClick}
			className="bg-indigo-500 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer"
		>
			{icon && <span className="md:mr-2">{icon}</span>}
			{isMounted ? (isMobile && !isModal ? null : title) : null}
		</button>
	);
}
