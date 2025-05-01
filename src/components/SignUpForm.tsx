"use client";

import { submitSignUpForm } from "@/app/signup/action";
import {
	containerVariants,
	errorVariants,
	itemVariants,
} from "@/utils/motionVariants";
import DOMPurify from "isomorphic-dompurify";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { buttonVariants } from "./SignInForm";

// TODO: REFACTOR NOT DRY! (SEE SIGNIN FORM)
export function SignUp() {
	const initialState = {
		errors: {
			name: undefined,
			email: undefined,
			password: undefined,
			confirmPassword: undefined,
		},
		values: {
			name: "",
			email: "",
			password: "",
			confirmPassowrd: undefined,
		},
		success: undefined,
	};
	const [state, formAction, isPending] = useActionState(
		submitSignUpForm,
		initialState,
	);

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handlePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};
	return (
		<motion.div variants={containerVariants} initial="hidden" animate="visible">
			<form
				action={formAction}
				className="w-3xs mx-auto space-y-6 mb-4 border border-gray-800 p-4 rounded-xl"
				noValidate
			>
				<motion.div variants={itemVariants} className="text-start">
					<h1 className="text-xl">Sign up</h1>
				</motion.div>
				<motion.div variants={itemVariants} className="relative">
					<input
						type="text"
						id="name"
						name="name"
						required
						defaultValue={DOMPurify.sanitize(state?.values?.name || "")}
						className="w-full px-4 py-3 bg-gray-800 peer placeholder-transparent rounded-lg"
						placeholder="Name"
						aria-label="Enter your name"
						autoComplete="off"
					/>
					<label
						htmlFor="name"
						aria-label="name"
						className="absolute left-4 -top-2.5 rounded-lg bg-gray-800 px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
					>
						Name
					</label>
					<AnimatePresence mode="wait">
						{state?.errors?.name && (
							<motion.p
								variants={errorVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="mt-1 text-sm text-error overflow-hidden"
								aria-live="polite"
							>
								{state.errors.name}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>
				<motion.div variants={itemVariants} className="relative">
					<input
						type="email"
						id="email"
						name="email"
						required
						defaultValue={DOMPurify.sanitize(state?.values?.email || "")}
						className="w-full px-4 py-3 bg-gray-800 peer placeholder-transparent rounded-lg"
						placeholder="Email"
						aria-label="Enter your email"
						autoComplete="off"
					/>
					<label
						htmlFor="email"
						aria-label="email"
						className="absolute left-4 -top-2.5 rounded-lg bg-gray-800 px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
					>
						Email
					</label>
					<AnimatePresence mode="wait">
						{state?.errors?.email && (
							<motion.p
								variants={errorVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="mt-1 text-sm text-error overflow-hidden"
								aria-live="polite"
							>
								{state.errors.email}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>
				<motion.div variants={itemVariants} className="relative">
					<input
						type={isPasswordVisible ? "text" : "password"}
						id="password"
						name="password"
						required
						defaultValue={DOMPurify.sanitize(state?.values?.password || "")}
						className="w-full px-4 py-3 bg-gray-800 peer placeholder-transparent rounded-lg"
						placeholder="Password"
						aria-label="Enter your password"
						autoComplete="current-password"
					/>
					<label
						htmlFor="password"
						aria-label="password"
						className="absolute left-4 -top-2.5 rounded-lg bg-gray-800  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
					>
						Password
					</label>
					<button
						type="button"
						onClick={handlePasswordVisibility}
						aria-label={isPasswordVisible ? "Hide password" : "Show password"}
						className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-200 focus:outline-none"
					>
						{isPasswordVisible ? <FiEyeOff /> : <FiEye />}
					</button>
					<AnimatePresence mode="wait">
						{state?.errors?.password && (
							<motion.p
								variants={errorVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="mt-1 text-sm text-error overflow-hidden cursor-pointer"
								aria-live="polite"
							>
								{state.errors.password}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>
				<motion.div variants={itemVariants} className="relative">
					<input
						type={isPasswordVisible ? "text" : "password"}
						id="confirmPassword"
						name="confirmPassword"
						required
						defaultValue={DOMPurify.sanitize(
							state?.values?.confirmPassword || "",
						)}
						className="w-full px-4 py-3 bg-gray-800 peer placeholder-transparent rounded-lg"
						placeholder="confirmPassword"
						aria-label="Confirm your password"
						autoComplete="current-password"
					/>
					<label
						htmlFor="confirmPassword"
						aria-label="confirmPassword"
						className="absolute left-4 -top-2.5 rounded-lg bg-gray-800  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
					>
						Confirm password
					</label>
					<AnimatePresence mode="wait">
						{state?.errors?.confirmPassword && (
							<motion.p
								variants={errorVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="mt-1 text-sm text-error overflow-hidden"
								aria-live="polite"
							>
								{state.errors.confirmPassword}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>

				<motion.div variants={itemVariants} className="flex justify-end">
					<motion.button
						variants={buttonVariants}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
						type="submit"
						disabled={isPending}
						className="font-openSans px-6 py-2 rounded-lg  bg-amber-800  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						{isPending ? "Submitting..." : "Submit"}
					</motion.button>
				</motion.div>
			</form>
			<motion.div
				variants={itemVariants}
				className="flex items-center justify-center gap-1"
			>
				<h3 className="text-xs">Already have an account?</h3>
				<Link
					href="/signin"
					className="text-xs text-blue-500 hover:text-amber-800"
				>
					Sign in
				</Link>
			</motion.div>
		</motion.div>
	);
}
