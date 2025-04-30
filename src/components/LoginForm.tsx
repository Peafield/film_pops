"use client";

import { submitLoginForm } from "@/app/login/action";
import { FilmPopsLogo } from "@/components/FilmPopsLogo";
import DOMPurify from "isomorphic-dompurify";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { useActionState } from "react";

export function Login() {
	const initialState = {
		errors: {
			username: undefined,
			password: undefined,
			confirmPassword: undefined,
		},
		values: {
			username: "",
			password: "",
			confirmPassword: "",
		},
		success: undefined,
	};
	const [state, formAction, isPending] = useActionState(
		submitLoginForm,
		initialState,
	);
	return (
		<motion.div variants={containerVariants} initial="hidden" animate="visible">
			<form action={formAction} className="w-3xs mx-auto space-y-6" noValidate>
				<motion.div variants={itemVariants} className="text-start">
					<h1 className="text-xl">Login</h1>
				</motion.div>
				<motion.div variants={itemVariants} className="relative">
					<input
						type="text"
						id="username"
						name="username"
						required
						defaultValue={DOMPurify.sanitize(state?.values?.username || "")}
						className="w-full px-4 py-3 bg-gray-800 peer placeholder-transparent rounded-lg"
						placeholder="Username"
						aria-label="Enter your username"
					/>
					<label
						htmlFor="username"
						aria-label="username"
						className="absolute left-4 -top-2.5 rounded-lg bg-gray-800 px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
					>
						Username
					</label>
					<AnimatePresence mode="wait">
						{state?.errors?.username && (
							<motion.p
								variants={errorVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="mt-1 text-sm text-error overflow-hidden"
								aria-live="polite"
							>
								{state.errors.username}
							</motion.p>
						)}
					</AnimatePresence>
				</motion.div>
				<motion.div variants={itemVariants} className="relative">
					<input
						type="password"
						id="password"
						name="password"
						required
						defaultValue={DOMPurify.sanitize(state?.values?.password || "")}
						className="w-full px-4 py-3 bg-gray-800 peer placeholder-transparent rounded-lg"
						placeholder="Password"
						aria-label="Enter your password"
					/>
					<label
						htmlFor="password"
						aria-label="password"
						className="absolute left-4 -top-2.5 rounded-lg bg-gray-800  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
					>
						Password
					</label>
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
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						required
						defaultValue={DOMPurify.sanitize(
							state?.values?.confirmPassword || "",
						)}
						className="w-full px-4 py-3 bg-gray-800 peer placeholder-transparent rounded-lg"
						placeholder="confirmPassword"
						aria-label="Confirm your password"
					/>
					<label
						htmlFor="confirmPassword"
						aria-label="confirmPassword"
						className="absolute left-4 -top-2.5 rounded-lg bg-gray-800  px-1 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm"
					>
						Confirm
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
						{isPending ? "Loggin in..." : "Login"}
					</motion.button>
				</motion.div>
			</form>
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
