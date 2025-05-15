"use client";

import { submitSignInForm } from "@/app/signin/action";
import DOMPurify from "isomorphic-dompurify";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { CustomToast } from "../CustomToast";
import { PrimaryButton } from "../button/PrimaryButton";
import { SettingsContainer } from "../settings/SettingsContainer";
import { SettingsHeading } from "../settings/SettingsHeader";

export function SignIn() {
	const initialState = {
		errors: {
			email: undefined,
			password: undefined,
			rememberMe: undefined,
		},
		values: {
			email: "",
			password: "",
			rememberMe: true,
		},
		success: undefined,
	};
	const [state, formAction, isPending] = useActionState(
		submitSignInForm,
		initialState,
	);

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	useEffect(() => {
		if (state?.message) {
			toast.custom(
				<CustomToast
					variant={
						state.errors?.credentials ||
						state.errors?.email ||
						state.errors?.password
							? "error"
							: "info"
					}
					message={state.message}
				/>,
			);
		}
	}, [state]);

	return (
		<SettingsContainer>
			<SettingsHeading icon={<FaCircleUser />} title="Sign in" />
			<form
				id="signInform"
				action={formAction}
				className="space-y-6"
				noValidate
			>
				<div className="flex flex-col gap-6">
					<div className="flex-1">
						<label htmlFor="email" className="block text-gray-300 mb-2">
							Email
						</label>
						<div className="relative">
							<input
								type="email"
								id="email"
								name="email"
								required
								defaultValue={DOMPurify.sanitize(state?.values?.email || "")}
								className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
								placeholder="Email"
								aria-label="Enter your email"
								autoComplete="off"
							/>
							<span className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200 focus:outline-none">
								<FaEnvelope />
							</span>
						</div>
					</div>
					{state.errors?.email && (
						<p className="text-red-400">{state.errors.email}</p>
					)}
					<div className="flex-1">
						<label htmlFor="password" className="block text-gray-300 mb-2">
							Password
						</label>
						<div className="relative">
							<input
								type={isPasswordVisible ? "text" : "password"}
								id="password"
								name="password"
								required
								defaultValue={DOMPurify.sanitize(state?.values?.password || "")}
								className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pr-12"
								placeholder="Password"
								aria-label="Enter your password"
								autoComplete="current-password"
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200 focus:outline-none cursor-pointer"
								onClick={togglePasswordVisibility}
							>
								{isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
							</button>
						</div>
					</div>
					{state.errors?.password && (
						<p className="text-red-400">{state.errors.password}</p>
					)}
					<div className="flex-1 flex items-center justify-end gap-1">
						<input
							type="checkbox"
							id="rememberMe"
							name="rememberMe"
							aria-label="Click to be remembered"
						/>
						<label
							htmlFor="rememberMe"
							aria-label="rememberMe"
							className="text-xs"
						>
							Remember me?
						</label>
					</div>
					<div className="flex-1 flex items-center justify-end">
						<PrimaryButton
							type="submit"
							title={isPending ? "Logging in..." : "Login"}
							form="signInform"
							isModal={true}
						/>
					</div>
				</div>
			</form>
		</SettingsContainer>
	);
}
