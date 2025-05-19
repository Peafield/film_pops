import { getArchivedMoviesAction } from "@/app/admin/action";
import { NextResponse } from "next/server"; // Aliased

export async function GET() {
	const result = await getArchivedMoviesAction();

	if (!result.success) {
		let status = 400;
		if (result.error === "User not logged in or session invalid.") status = 401;
		if (
			result.error === "User lacks admin privileges." ||
			result.error === "Could not verify user role." ||
			result.error === "User not found."
		)
			status = 403;
		if (result.message === "Failed to fetch archived movies.") status = 500;
		return NextResponse.json(
			{ success: false, message: result.message, error: result.error },
			{ status: status },
		);
	}
	return NextResponse.json(result);
}
