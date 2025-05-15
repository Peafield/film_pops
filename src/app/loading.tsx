import ClapperboardLoader from "@/components/ClapperBoardLoader";
import { Container } from "@/components/layout/Container";

export default function Loading() {
	return (
		<Container>
			<div className="flex flex-col h-full items-center justify-center mt-48">
				<ClapperboardLoader
					width="200px"
					height="200px"
					className="w-48 h-48 text-white"
				/>
			</div>
		</Container>
	);
}
