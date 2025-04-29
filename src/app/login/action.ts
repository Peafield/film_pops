"use server";

import { signIn } from "@/lib/auth";
import { LoginFormSchema } from "@/types";
import AuthError from "next-auth";

export type LoginFormState = {
	errors?: {
		username?: string[];
		password?: string[];
		confirmPassword?: string[];
		credentials?: string[];
	};
	values?: {
		username?: string;
		password?: string;
		confirmPassword?: string;
	};
	message?: string | null;
};

export async function submitLoginForm(
	_prevState: LoginFormState,
	formData: FormData,
): Promise<LoginFormState> {
	const formValues = {
		username: formData.get("username") as string,
		password: formData.get("password") as string,
		confirmPassword: formData.get("confirmPassword") as string,
	};

	const validatedFields = LoginFormSchema.safeParse(formValues);

	if (!validatedFields.success) {
		console.log(
			"Form validation failed:",
			validatedFields.error.flatten().fieldErrors,
		);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			values: formValues,
			message: "Validation failed. Please check the fields.",
		};
	}

	const { username, password } = validatedFields.data;

	try {
		console.log(`Attempting sign in for user: ${username}`);
		await signIn("credentials", {
			username,
			password,
			redirect: false,
		});
		console.log(`Sign in successful (or threw error) for user: ${username}`);
		return { message: "Login successful (check if redirect happens)" };
	} catch (error) {
		console.error("Sign in error:", error);
		if (error instanceof AuthError) {
			return {
				values: formValues,
				message: "Invalid username or password.",
				errors: { credentials: ["Invalid username or password."] },
			};
		}
		return {
			values: formValues,
			message: "Something went wrong during login.",
			errors: { credentials: ["An unexpected error occurred."] },
		};
	}
}
