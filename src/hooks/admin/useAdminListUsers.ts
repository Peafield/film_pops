import { authClient } from "@/lib/auth-client";
import type { UserWithRole } from "better-auth/plugins";
import { useCallback, useState } from "react";

export type ListUsersReponse = {
	data: UserWithRole[] | never[] | undefined;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error?: any;
	isLoading: boolean;
};

export function useAdminListUsers() {
	const [state, setState] = useState<ListUsersReponse>({
		data: undefined,
		error: null,
		isLoading: false,
	});
	const refetchUsers = useCallback(async () => {
		setState({ data: undefined, error: null, isLoading: true });
		try {
			const response = await authClient.admin.listUsers({
				query: {
					limit: 10,
				},
			});
			const usersData = response.data?.users;
			setState({
				data: usersData,
				error: null,
				isLoading: false,
			});
			return response;
		} catch (error) {
			setState({
				data: undefined,
				error: error,
				isLoading: false,
			});
			console.error("Admin list users (hook):", error);
			throw error;
		}
	}, []);

	return { ...state, refetchUsers };
}
