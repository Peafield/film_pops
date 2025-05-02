"use server";

import { auth } from "@/lib/auth";
import { SignUpFormSchema } from "@/types";
import { redirect } from "next/navigation";

export type SignUpFormState = {
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
		credentials?: string[];
	};
	values?: {
		name?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
	};
	message?: string | null;
};

export async function submitSignUpForm(
	_prevState: SignUpFormState,
	formData: FormData,
): Promise<SignUpFormState> {
	const formValues = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		confirmPassword: formData.get("confirmPassword") as string,
	};

	const validatedFields = SignUpFormSchema.safeParse(formValues);

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

	const { name, email, password } = validatedFields.data;

	try {
		await auth.api.signUpEmail({
			body: {
				name,
				email,
				password,
			},
		});
	} catch (error) {
		console.error("Sign in error:", error);
		return {
			values: formValues,
			message: "Something went wrong during login.",
			errors: { credentials: ["An unexpected error occurred."] },
		};
	}
	const params = new URLSearchParams();
	params.set("username", name);
	redirect(`/pending-approval?${params.toString()}`);
}
