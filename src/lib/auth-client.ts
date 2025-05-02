import { adminClient, customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { authInit } from "./auth";

export const authClient = createAuthClient({
	plugins: [adminClient(), customSessionClient<typeof authInit>()],
});
