import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { AdminUserManagementButton } from "./button/AdminUserManagementButton";

type ModalProps = {
	title?: string;
	icon?: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	children?: React.ReactNode;
	buttonTitle?: string;
	formId?: string;
	primaryButtonOnClick?: () => void | Promise<void>;
};

export function Modal({
	title,
	icon,
	isOpen = false,
	onClose,
	children,
	buttonTitle,
	formId,
	primaryButtonOnClick,
}: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	// Effect open and close the dialog.
	useEffect(() => {
		const dialogNode = dialogRef.current;
		if (!dialogNode) return;

		if (isOpen) {
			if (!dialogNode.hasAttribute("open")) {
				dialogNode.showModal();
			}
		} else {
			if (dialogNode.hasAttribute("open")) {
				dialogNode.close();
			}
		}
	}, [isOpen]);

	// Effect to handle outside click or escape key.
	useEffect(() => {
		const dialogNode = dialogRef.current;
		if (!dialogNode) return;

		const handleCancel = (event: Event) => {
			event.preventDefault();
			onClose();
		};
		dialogNode.addEventListener("cancel", handleCancel);

		const handleClick = (event: MouseEvent) => {
			if (event.target === dialogNode) {
				onClose();
			}
		};
		dialogNode.addEventListener("click", handleClick);

		return () => {
			dialogNode.removeEventListener("cancel", handleCancel);
			dialogNode.removeEventListener("click", handleClick);
		};
	}, [onClose]);

	return (
		// Modal overlay
		<div className="fixed inset-0 z-50 p-4 backdrop-blur-sm">
			{/* Modal Content */}
			<dialog
				ref={dialogRef}
				className="m-auto bg-gray-800 rounded-xl w-full max-w-md animate-fade-in shadow-2xl"
			>
				{/* Modal Header */}
				<header className="flex items-center justify-between p-5 border-b border-gray-700">
					<div className=" flex items-center space-x-3 text-xl">
						<div className="p-2 rounded-lg bg-indigo-900/30 text-indigo-400 ">
							{icon}
						</div>
						<h3 className="font-semibold text-white">{title}</h3>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="text-gray-400 hover:text-gray-200 transition-colors"
					>
						<FaTimes />
					</button>
				</header>

				{/* Modal Body */}
				{children}
				{/* Modal Footer */}
				<div className="flex justify-end space-x-3 p-5 border-t border-gray-700">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 text-gray-300 hover:text-gray-100 font-medium rounded-lg transition-colors"
					>
						Cancel
					</button>
					<AdminUserManagementButton
						title={buttonTitle || "Save Changes"}
						isModal={true}
						type="submit"
						form={formId}
						onClick={primaryButtonOnClick}
					/>
				</div>
			</dialog>
		</div>
	);
}
