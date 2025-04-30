import { ObjectId } from "mongodb";
import { z } from "zod";

const BaseUserSchema = z.object({
	username: z.string(),
	hashedPassword: z.string(),
	createdAt: z.date(),
});

export type UserDocument = z.infer<typeof BaseUserSchema>;

export const UserSchema = BaseUserSchema.extend({
	_id: z.instanceof(ObjectId).transform((id) => id.toString()),
});
export type UserProfile = z.infer<typeof UserSchema>;

export const LoginFormSchema = z
	.object({
		username: z.string().min(2, { message: "Please enter your username" }),
		password: z.string().min(8, {
			message: "Please enter your password",
		}),
		confirmPassword: z.string().min(8),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
			});
		}
	});

export const TMDBMovieSchema = z.object({
	id: z.number(),
	title: z.string(),
	overview: z.string(),
	popularity: z.number(),
	poster_path: z.string(),
	release_date: z.string(),
});

export type TMDBMovie = z.infer<typeof TMDBMovieSchema>;

export const TMDBMovieReponseSchema = z.object({
	page: z.number(),
	results: z.array(TMDBMovieSchema),
	total_pages: z.number(),
	total_results: z.number(),
});

export type TMDBMovieReponse = z.infer<typeof TMDBMovieReponseSchema>;
