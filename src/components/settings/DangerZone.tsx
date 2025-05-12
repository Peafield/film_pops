"use client";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";
import { Modal } from "../Modal";
import { SettingsContainer } from "./SettingsContainer";
import { SettingsDeleteAccount } from "./SettingsDeleteAccount";
import { SettingsHeading } from "./SettingsHeader";

export function DangerZone() {
	const { data: session } = authClient.useSession();
	const userData = session?.user;
	const router = useRouter();
	const [showDeleteUserModal, setShowDeleteModal] = useState(false);

	const openDeleteUserModal = () => {
		setShowDeleteModal(true);
	};

	const closeDeleteUserModal = () => {
		setShowDeleteModal(false);
	};

	const handleDeleteAccount = useCallback(async () => {
		try {
			await authClient.deleteUser();
			router.replace("/signin");
		} catch (e) {
			console.error("Profile Section Api Error:", e);
		}
	}, [router.replace]);

	return (
		<>
			{showDeleteUserModal &&
				createPortal(
					<Modal
						title={"Confirm Deletion"}
						icon={<FaExclamationCircle />}
						buttonTitle="Yes, Delete Account"
						isOpen={showDeleteUserModal}
						onClose={closeDeleteUserModal}
						primaryButtonOnClick={handleDeleteAccount}
						isDangerModal
					>
						<SettingsDeleteAccount />
					</Modal>,
					document.body,
				)}
			<SettingsContainer className="border border-red-900">
				<SettingsHeading
					icon={<FaExclamationTriangle />}
					title="Danger Zone"
					className="text-red-400"
				/>
				<div className="space-y-4">
					<div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-700 p-4 rounded-lg">
						<div className="mb-4 md:mb-0">
							<h3 className="font-medium text-red-400">Delete Account</h3>
							<p className="text-sm text-gray-400">
								Once you delete your account, there is no going back. Please be
								certain.
							</p>
						</div>
						<button
							type="button"
							id="deleteAccountBtn"
							onClick={() => openDeleteUserModal()}
							disabled={userData?.role === "admin"}
							className={cn(
								"bg-red-900 hover:bg-red-800 text-white px-6 py-2 rounded-lg transition whitespace-nowrap cursor-pointer",
								{
									"bg-gray-500 hover:bg-gray-500 cursor-not-allowed":
										userData?.role === "admin",
								},
							)}
						>
							Delete Account
						</button>
					</div>
				</div>
			</SettingsContainer>
		</>
	);
}
