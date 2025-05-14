import { getPopsPicksAction } from "@/app/pops-picks/action";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const popsPicks = await getPopsPicksAction();
		if (!popsPicks) {
			return NextResponse.json(
				{
					error: "Failed to fetch pops' picks",
				},
				{ status: 500 },
			);
		}
		return NextResponse.json({ popsPicks });
	} catch (error) {
		console.error("API route error fetching pops' picks:", error);
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 },
		);
	}
}
