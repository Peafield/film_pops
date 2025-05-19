import { ObjectId } from "mongodb";
import { z } from "zod";

const BaseUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	createdAt: z.date(),
});

export type UserDocument = z.infer<typeof BaseUserSchema>;

export const UserSchema = BaseUserSchema.extend({
	_id: z.instanceof(ObjectId).transform((id) => id.toString()),
});
export type UserProfile = z.infer<typeof UserSchema>;

export const SignUpFormSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(2, { message: "Please enter your name" })
			.transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
		email: z.string().email(),
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

export const SignInFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Please enter your password",
	}),
	rememberMe: z.boolean().optional(),
});

export const TMDBMovieSchema = z.object({
	id: z.number(),
	genre_ids: z.array(z.number()).optional(),
	title: z.string().optional(),
	overview: z.string().optional(),
	popularity: z.number().optional(),
	poster_path: z.string().optional(),
	release_date: z.string().optional(),
	userRank: z.enum(["yeah", "maybe", "nope"]).optional().nullable(),
	isArchived: z.boolean().default(false),
});

export type TMDBMovie = z.infer<typeof TMDBMovieSchema>;

export const TMDBMovieReponseSchema = z.object({
	page: z.number(),
	results: z.array(TMDBMovieSchema),
	total_pages: z.number(),
	total_results: z.number(),
});

export type TMDBMovieReponse = z.infer<typeof TMDBMovieReponseSchema>;

export interface MoviesApiResponse {
	movies: TMDBMovie[];
}

export const RankChoiceSchema = z.enum(["yeah", "maybe", "nope"]);
export type RankChoice = z.infer<typeof RankChoiceSchema>;

export const MovieRankingSchema = z.object({
	userId: z.string(),
	movieId: z.number(),
	rank: RankChoiceSchema,
	rankedAt: z.date(),
});

export type MovieRanking = z.infer<typeof MovieRankingSchema>;

export const RankMovieActionSchema = z.object({
	movieJSON: z.string(),
	choice: RankChoiceSchema,
});

export type UserRankingsMap = Record<number, RankChoice>;

export type MovieGridFilter = "all" | "yeah" | "maybe" | "nope" | "toRank";

export const VoterInfoSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export type VoterInfo = z.infer<typeof VoterInfoSchema>;

export interface UserDbRecord {
	_id: import("mongodb").ObjectId;
	name?: string;
}

export const PopsPickMovieSchema = TMDBMovieSchema.extend({
	totalScore: z.number(),
	yeahVotes: z.number(),
	maybeVotes: z.number(),
	nopeVotes: z.number(),
	yeahVoters: z.array(VoterInfoSchema),
	maybeVoters: z.array(VoterInfoSchema),
	nopeVoters: z.array(VoterInfoSchema),
	totalUserVotes: z.number(),
});

export type PopsPickMovie = z.infer<typeof PopsPickMovieSchema>;

export type GetPopsPicksResult = {
	success: boolean;
	picks?: PopsPickMovie[];
	message?: string;
	error?: string;
};

export const SCORE_WEIGHTS: Record<RankChoice, number> = {
	yeah: 2,
	maybe: 1,
	nope: -1,
};
