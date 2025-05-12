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
		await auth.api.signInEmail({
			body: {
				email,
				password,
				rememberMe,
			},
			asResponse: true,
		});
	} catch (error) {
		console.error("Sign in error:", error);
		return {
			values: formValues,
			message: "Something went wrong during login.",
			errors: { credentials: ["An unexpected error occurred."] },
		};
	}
	redirect("/");
}
