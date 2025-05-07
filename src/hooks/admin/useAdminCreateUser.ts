import { type CreateUserForm, CreateUserFormSchema } from "@/client-types";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

type UseAdminCreateUserState = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any | null;
	error: string[][] | null;
	isLoading: boolean;
};

export function useAdminCreateUser() {
	const [state, setState] = useState<UseAdminCreateUserState>({
		data: null,
		error: null,
		isLoading: false,
	});

	const createUser = async (payload: CreateUserForm) => {
		const validatedFields = CreateUserFormSchema.safeParse(payload);
		if (!validatedFields.success) {
			const firstError = Object.values(
				validatedFields.error.flatten().fieldErrors,
			);
			setState({
				data: null,
				error: firstError || "Validation failed. Please check the fields",
				isLoading: false,
			});
			return;
		}

		setState({ data: null, error: null, isLoading: true });

		try {
			const response = await authClient.admin.createUser({
				name: validatedFields.data.name,
				email: validatedFields.data.email,
				password: validatedFields.data.password,
				role: validatedFields.data.role,
			});

			setState({
				data: response,
				error: null,
				isLoading: false,
			});
			return response;
		} catch (error) {
			console.error("Admin create user error (hook):", error);
			throw error;
		}
	};

	return { ...state, createUser };
}
