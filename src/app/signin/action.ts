"use server";

import { auth } from "@/lib/auth";
import { SignInFormSchema } from "@/types";
import { redirect } from "next/navigation";

export type SignInFormState = {
	errors?: {
		email?: string[];
		password?: string[];
		rememberMe?: string[];
		credentials?: string[];
	};
	values?: {
		email?: string;
		password?: string;
		rememberMe?: boolean;
	};
	message?: string | null;
};

export async function submitSignInForm(
	_prevState: SignInFormState,
	formData: FormData,
): Promise<SignInFormState> {
	const formValues = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		rememberMe: formData.get("rememberMe") === "true",
	};

	const validatedFields = SignInFormSchema.safeParse(formValues);

	if (!validatedFields.success) {
		console.error(
			"Form validation failed:",
			validatedFields.error.flatten().fieldErrors,
		);
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			values: formValues,
			message: "Validation failed. Please check the fields.",
		};
	}

	const { email, password, rememberMe } = validatedFields.data;

	try {
		const response = await auth.api.signInEmail({
			body: {
				email,
				password,
				rememberMe,
			},
			asResponse: true,
		});
		if (response.ok) {
		} else {
			let errorMessage = "Invalid email or password.";
			try {
				const errorData = await response.json();
				if (errorData?.message) {
					errorMessage = errorData.message;
				} else if (response.status === 401 || response.status === 400) {
					errorMessage = "Invalid email or password.";
				}
				console.error("Authentication failed:", response.status, errorData);
			} catch (jsonError) {
				console.error("Error parsing auth error response:", jsonError);
				if (response.status === 401 || response.status === 400) {
					errorMessage = "Invalid email or password.";
				} else {
					errorMessage = `Login failed with status: ${response.status}`;
				}
			}
			return {
				values: formValues,
				message: errorMessage,
				errors: { credentials: [errorMessage] },
			};
		}
	} catch (error) {
		console.error("Unexpected sign in error:", error);
		return {
			values: formValues,
			message: "Something went wrong during login. Please try again.",
			errors: { credentials: ["An unexpected server error occurred."] },
		};
	}
	redirect("/");
}
