"use client";

import { type ApiError, UpdateUserFormSchema } from "@/client-types";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/utils/cn";
import { type FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPen, FaUserEdit } from "react-icons/fa";
import { CustomToast } from "../CustomToast";
import { SettingsContainer } from "./SettingsContainer";
import { SettingsHeading } from "./SettingsHeader";

export function ProfileSection() {
	const { data: session } = authClient.useSession();
	const user = session?.user;
	const [updatedUserData, setUpdatedUserData] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		if (user) {
			setUpdatedUserData({ name: user.name, email: user.email });
		}
	}, [user]);
	const [isEditProfileClicked, setIsEditProfileClicked] = useState(false);
	const [isPending, setIsPending] = useState(false);

	const handleEditProfileToggle = () => {
		setIsEditProfileClicked((prev) => !prev);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsPending(true);
		const formValues = {
			name: updatedUserData.name,
			email: updatedUserData.email,
		};

		const validatedFormValues = UpdateUserFormSchema.safeParse(formValues);

		if (!validatedFormValues.success) {
			console.error(
				"Update user form validation failed:",
				validatedFormValues.error.flatten().fieldErrors,
			);
			toast.custom(
				<CustomToast
					variant="error"
					message="Please check what you entered and try again."
				/>,
			);
			setIsPending(false);
			return;
		}

		const { name, email } = validatedFormValues.data;

		let updateUserError: ApiError;

		let changeEmailError: ApiError;

		try {
			if (name && name !== user?.name) {
				const { error: updateUserError } = await authClient.updateUser({
					name: name,
				});
			}
			if (email && email !== user?.email) {
				const { error: changeEmailError } = await authClient.changeEmail({
					newEmail: email,
				});
			}
			if (updateUserError) {
				toast.custom(
					<CustomToast
						variant="error"
						message={`Something went wrong: ${updateUserError.message}`}
					/>,
				);
			} else if (changeEmailError) {
				toast.custom(
					<CustomToast
						variant="error"
						message={`Something went wrong: ${changeEmailError.message}`}
					/>,
				);
			} else {
				toast.custom(
					<CustomToast
						variant="success"
						message={"You've successfully updated your profile."}
					/>,
				);
			}
		} catch (e) {
			console.error("Profile Section Api Error:", e);
			toast.custom(
				<CustomToast variant="error" message={"Something's gone wrong!"} />,
			);
			console.error(e);
		}
		setIsPending(false);
	};
	return (
		<SettingsContainer>
			<div className="flex items-center justify-between mb-6">
				<SettingsHeading icon={<FaUserEdit />} title="Profile Information" />
				<button
					type="button"
					aria-label="Edit profile button"
					className={cn(
						"bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition flex items-center",
						{
							collapse: isEditProfileClicked,
						},
					)}
					onClick={handleEditProfileToggle}
				>
					<FaPen className="mr-2" />
					Edit Profile
				</button>
			</div>
			<form id="profileForm" onSubmit={handleSubmit} className="space-y-6">
				<div className="flex flex-col md:flex-row gap-6">
					<div className="flex-1">
						<label htmlFor="name" className="block text-gray-300 mb-2">
							Full Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={updatedUserData.name}
							onChange={(e) =>
								setUpdatedUserData({ ...updatedUserData, name: e.target.value })
							}
							className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
							disabled={!isEditProfileClicked}
						/>
					</div>
					<div className="flex-1">
						<label htmlFor="Email" className="block text-gray-300 mb-2">
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={updatedUserData.email}
							onChange={(e) =>
								setUpdatedUserData({
									...updatedUserData,
									email: e.target.value,
								})
							}
							className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
							disabled={!isEditProfileClicked}
						/>
					</div>
				</div>
				<div
					className={cn({
						hidden: !isEditProfileClicked,
						visible: isEditProfileClicked,
					})}
				>
					<div className="flex justify-end gap-4 pt-4">
						<button
							type="button"
							aria-label="Cancel button"
							className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition"
							onClick={handleEditProfileToggle}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
						>
							{isPending ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</div>
			</form>
		</SettingsContainer>
	);
}
