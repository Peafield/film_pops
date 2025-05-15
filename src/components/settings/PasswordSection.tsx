"use client";

import { ChangePasswordSchema } from "@/client-types";
import { authClient } from "@/lib/auth-client";
import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { CustomToast } from "../CustomToast";
import { PrimaryButton } from "../button/PrimaryButton";
import { SettingsContainer } from "./SettingsContainer";
import { SettingsHeading } from "./SettingsHeader";

export function PasswordSection() {
	const [changePasswordData, setChangePasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	});
	const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
		useState(false);
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const [isPending, setIsPending] = useState(false);

	const toggleCurrentPasswordVisibility = () => {
		setIsCurrentPasswordVisible((prev) => !prev);
	};

	const toggleNewPasswordVisibility = () => {
		setIsNewPasswordVisible((prev) => !prev);
	};

	const toggleConfirmPasswordVisibility = () => {
		setIsConfirmPasswordVisible((prev) => !prev);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsPending(true);
		const formValues = {
			currentPassword: changePasswordData.currentPassword,
			newPassword: changePasswordData.newPassword,
			confirmNewPassword: changePasswordData.confirmNewPassword,
		};

		const validatedFormValues = ChangePasswordSchema.safeParse(formValues);

		if (!validatedFormValues.success) {
			const fieldErrors = validatedFormValues.error.flatten().fieldErrors;
			const displayedErrorMessages = new Set<string>();

			for (const fieldName in fieldErrors) {
				const messages = fieldErrors[fieldName as keyof typeof fieldErrors];
				if (messages && messages.length > 0) {
					const firstMessage = messages[0];
					if (!displayedErrorMessages.has(firstMessage)) {
						toast.custom(
							<CustomToast variant="error" message={`${messages[0]}`} />,
						);
					}
					displayedErrorMessages.add(firstMessage);
				}
			}
			setIsPending(false);
			return;
		}

		const { currentPassword, newPassword } = validatedFormValues.data;

		try {
			const { error } = await authClient.changePassword({
				newPassword: newPassword,
				currentPassword: currentPassword,
				revokeOtherSessions: true,
			});
			if (error && error.code === "INVALID_PASSWORD") {
				toast.custom(
					<CustomToast
						variant="error"
						message={"Current password is not valid"}
					/>,
				);
			} else {
				toast.custom(
					<CustomToast
						variant="success"
						message={"You've successfully changed your password."}
					/>,
				);
			}
		} catch (e) {
			console.error("Change Password Api Error:", e);
			toast.custom(
				<CustomToast variant="error" message={"Something's gone wrong!"} />,
			);
		}
		setIsPending(false);
	};

	return (
		<SettingsContainer>
			<SettingsHeading icon={<FaKey />} title="Change Password" />
			<form
				id="changePasswordForm"
				onSubmit={handleSubmit}
				className="space-y-6"
			>
				<div>
					<label
						htmlFor="currentPassword"
						className="block text-gray-300 mb-2"
						aria-label="Current password"
					>
						Current Password
					</label>
					<div className="relative">
						<input
							type={isCurrentPasswordVisible ? "text" : "password"}
							id="currentPassword"
							name="currentPassword"
							aria-label="Enter your current password."
							onChange={(e) =>
								setChangePasswordData({
									...changePasswordData,
									currentPassword: e.target.value,
								})
							}
							className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-12"
						/>
						<button
							type="button"
							className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
							onClick={toggleCurrentPasswordVisibility}
						>
							{isCurrentPasswordVisible ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>
				</div>

				<div>
					<label htmlFor="newPassword" className="block text-gray-300 mb-2">
						New Password
					</label>
					<div className="relative">
						<input
							type={isNewPasswordVisible ? "text" : "password"}
							id="newPassword"
							name="newPassword"
							onChange={(e) =>
								setChangePasswordData({
									...changePasswordData,
									newPassword: e.target.value,
								})
							}
							className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-12"
						/>
						<button
							type="button"
							className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
							onClick={toggleNewPasswordVisibility}
						>
							{isNewPasswordVisible ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>
					<p className="text-xs text-gray-400 mt-1">
						Must be at least 8 characters long
					</p>
				</div>

				<div>
					<label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
						Confirm New Password
					</label>
					<div className="relative">
						<input
							type={isConfirmPasswordVisible ? "text" : "password"}
							id="confirmPassword"
							name="confirmPassword"
							onChange={(e) =>
								setChangePasswordData({
									...changePasswordData,
									confirmNewPassword: e.target.value,
								})
							}
							className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-12"
						/>
						<button
							type="button"
							className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
							onClick={toggleConfirmPasswordVisibility}
						>
							{isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>
				</div>

				<div className="flex justify-end pt-4">
					<PrimaryButton
						type="submit"
						title={isPending ? "Updating..." : "Update Password"}
						form="changePasswordForm"
						icon={<FaArrowsRotate />}
					/>
				</div>
			</form>
		</SettingsContainer>
	);
}
