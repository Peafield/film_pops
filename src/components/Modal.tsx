import { FaTimes, FaUserCog } from "react-icons/fa";
import { AdminUserManagementButton } from "./button/AdminUserManagementButton";
import { CreateUserAdminForm } from "./forms/CreateUserAdminForm";

type ModalProps = {
	title?: string;
	icon?: React.ReactNode;
	onClose?: () => void;
	children?: React.ReactNode;
	buttonTitle?: string;
	formId?: string;
	isSubmitting?: boolean;
};

export function Modal({
	title,
	icon,
	onClose,
	children,
	buttonTitle,
	formId,
	isSubmitting,
}: ModalProps) {
	return (
		// Modal overlay
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
			{/* Modal Content */}
			<div className="bg-gray-800 rounded-xl w-full max-w-md animate-fade-in shadow-2xl">
				{/* Modal Header */}
				<header className="flex items-center justify-between p-5 border-b border-gray-700">
					<div className=" flex items-center space-x-3 text-xl">
						<div className="p-2 rounded-lg bg-indigo-900/30 text-indigo-400 ">
							{icon}
						</div>
						<h3 className="font-semibold">{title}</h3>
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
					/>
				</div>
			</div>
		</div>
	);
}
