import type { VoterInfo } from "@/types";
import { cn } from "@/utils/cn";

type PopsPicksVoterListProps = {
	voters: VoterInfo[];
	icon: React.ReactNode;
	iconColor: string;
};

export function PopsPicksVoterList({
	voters,
	icon,
	iconColor,
}: PopsPicksVoterListProps) {
	if (voters.length === 0) return null;
	return (
		<div
			className={cn(
				"flex items-start text-xs",
				{
					"text-green-400": iconColor === "yeah",
				},
				{
					"text-yellow-400": iconColor === "maybe",
				},
				{
					"text-red-400": iconColor === "nope",
				},
			)}
		>
			<span className="mr-1.5 flex-shrink-0 mt-0.5">{icon}</span>
			<div className="flex flex-col">
				<span className="text-gray-300 text-xs leading-tight">
					{voters.map((v) => v.name).join(", ")}
				</span>
			</div>
		</div>
	);
}
