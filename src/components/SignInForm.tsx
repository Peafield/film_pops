"use client";

import { submitSignInForm } from "@/app/signin/action";
import DOMPurify from "isomorphic-dompurify";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
// TODO: REFACTOR NOT DRY! (SEE SIGNUP FORM)
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
					<h1 className="text-xl">Sign in</h1>
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
				<motion.div
					variants={itemVariants}
					className="flex items-center justify-end gap-1"
				>
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
				</motion.div>

				<motion.div
					variants={itemVariants}
					className="flex items-center justify-end"
				>
					<motion.button
						variants={buttonVariants}
						initial="initial"
						whileHover="hover"
						whileTap="tap"
						type="submit"
						disabled={isPending}
						className="font-openSans px-6 py-2 rounded-lg  bg-amber-800  disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
					>
						{isPending ? "Loggin in..." : "Login"}
					</motion.button>
				</motion.div>
			</form>
			{/* Disabled for now as not necessary */}
			{/* <motion.div
				variants={itemVariants}
				className="flex items-center justify-center gap-1"
			>
				<h3 className="text-xs">Don't have an account?</h3>
				<Link
					href="/signup"
					className="text-xs text-blue-500 hover:text-amber-800"
				>
					Sign up
				</Link>
			</motion.div> */}
		</motion.div>
	);
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const errorVariants = {
	initial: {
		opacity: 0,
		y: -10,
		height: 0,
	},
	animate: {
		opacity: 1,
		y: 0,
		height: "auto",
	},
	exit: {
		opacity: 0,
		y: -10,
		height: 0,
	},
};

export const buttonVariants = {
	initial: { scale: 1 },
	hover: {
		scale: 1.05,
		backgroundColor: "#0d6e25",
		transition: { stiffness: 400, damping: 10, easeInOut },
	},
	tap: { scale: 0.95 },
};
