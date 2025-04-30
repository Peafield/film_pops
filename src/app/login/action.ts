"use server";

import { authPromise } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { LoginFormSchema } from "@/types";

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
	const auth = await authPromise;

	try {
		console.log(`Attempting sign in for user: ${username}`);
		const data = await authClient.signUp.email({
			email: "email@domain.com",
			name: "Test User",
			password: "password1234",
			username: "test",
		});
		await auth.api.signInUsername({
			body: {
				username,
				password,
			},
			asResponse: true,
		});
		console.log(`Sign in successful (or threw error) for user: ${username}`);
		return { message: "Login successful (check if redirect happens)" };
	} catch (error) {
		console.error("Sign in error:", error);
		return {
			values: formValues,
			message: "Something went wrong during login.",
			errors: { credentials: ["An unexpected error occurred."] },
		};
	}
}
