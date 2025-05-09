import { z } from "zod";

export const CreateUserFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, { message: "Please enter the name of the user." })
		.transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Please enter a simple starter password.",
	}),
	role: z.literal("user"),
});

export type CreateUserForm = z.infer<typeof CreateUserFormSchema>;

export const UserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	role: z.enum(["user", "admin"]),
});

export type User = z.infer<typeof UserSchema>;

export const UpdateUserFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, {
			message: "Please enter a name that is greater than 2 characters.",
		})
		.transform((val) => val.charAt(0).toUpperCase() + val.slice(1))
		.optional(),
	email: z.string().email().optional(),
});

export type UpdateUserForm = z.infer<typeof UpdateUserFormSchema>;
