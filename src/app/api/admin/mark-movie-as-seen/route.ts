import { markMovieAsSeen } from "@/app/admin/action";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("movieId");

	const movieId = Number.parseInt(query || "", 10);

	if (Number.isNaN(movieId)) {
		return NextResponse.json(
			{
				success: false,
				message: "Invalid movieId format. Must be a number.",
				error: "Bad Request",
			},
			{ status: 400 },
		);
	}

	const result = await markMovieAsSeen({ movieId: movieId });

	if (!result.success) {
		let status = 400;
		if (result.error === "User not logged in or session invalid.") status = 401;
		if (
			result.error === "User lacks admin privileges." ||
			result.error === "Could not verify user role." ||
			result.error === "User not found."
		)
			status = 403;
		if (result.message === "Failed to mark movie as seen.") status = 500;

		return NextResponse.json(
			{ success: false, message: result.message, error: result.error },
			{ status: status },
		);
	}

	return NextResponse.json({
		success: true,
		message: result.message,
	});
}
