import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { LoadingSkeleton } from "@/components/movie/LoadingSkeleton";
import { PopsPicks } from "@/components/popsPicks/PopsPicks";
import { Suspense } from "react";
import { FaRankingStar } from "react-icons/fa6";

export default async function PopsPicksPage() {
	return (
		<Container>
			<PageHeader
				title="Pops' Picks"
				icon={<FaRankingStar />}
				subtitle="Highest voted films out now or soon."
			/>
			<Suspense fallback={<LoadingSkeleton />}>
				<PopsPicks />
			</Suspense>
		</Container>
	);
}

export const metadata = {
	title: "Pops' Picks",
	description: "Highest voted on films.",
};
