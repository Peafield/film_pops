import { ObjectId } from "mongodb";
import { z } from "zod";

export const UserSchema = z.object({
	_id: z.instanceof(ObjectId).transform((id) => id.toString()),
	username: z.string(),
	hashedPassword: z.string(),
	createdAt: z.date(),
});

export type UserProfile = z.infer<typeof UserSchema>;

export const LoginFormSchema = z
	.object({
		username: z
			.string()
			.min(2, { message: "It seems your missing some letters..." }),
		password: z.string().min(8, {
			message:
				"You must enter your original password or new one if you have updated it",
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
