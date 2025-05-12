"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { SettingsContainer } from "./SettingsContainer";
import { SettingsHeading } from "./SettingsHeader";

export function PasswordSection() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handlePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};
	return (
		<SettingsContainer>
			<div className="flex items-center justify-between mb-6">
				<SettingsHeading icon={<FaKey />} title="Change Password" />
			</div>
			<form id="passwordChangeForm" className="space-y-6">
				<div className="relative">
					<label
						htmlFor="currentPassword"
						aria-label="Current password"
						className="block text-gray-300 mb-2"
					>
						Current Password
					</label>
					<input
						type={isPasswordVisible ? "text" : "password"}
						id="currentPassword"
						required
						name="currentPassword"
						className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-12"
						placeholder="Current password"
						aria-label="Enter your current password."
						autoComplete="current-password"
					/>
					<button
						type="button"
						className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200 focus:outline-none"
						onClick={handlePasswordVisibility}
						aria-label={isPasswordVisible ? "Hide password" : "Show password"}
					>
						{isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
					</button>
				</div>
			</form>
		</SettingsContainer>
	);
}
