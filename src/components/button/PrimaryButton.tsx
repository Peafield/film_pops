import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

type PrimaryButtonProps = {
	title: string;
	type: "submit" | "button";
	icon?: React.ReactNode;
	onClick?: () => void | Promise<void>;
	isModal?: boolean;
	form?: string;
	isDangerModal?: boolean;
};

export function PrimaryButton({
	title,
	icon,
	onClick,
	isModal = false,
	type,
	form,
	isDangerModal = false,
}: PrimaryButtonProps) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	});

	const handleClick = async () => {
		if (onClick) await onClick();
	};

	return (
		<button
			form={form}
			type={type}
			onClick={handleClick}
			className={cn(
				"bg-indigo-500 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg flex items-center cursor-pointer",
				{
					"bg-red-600 hover:bg-red-900": isDangerModal,
				},
			)}
		>
			{icon && <span className="md:mr-2">{icon}</span>}
			{isMounted ? (isMobile && !isModal ? null : title) : null}
		</button>
	);
}
