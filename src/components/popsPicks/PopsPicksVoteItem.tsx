import { cn } from "@/utils/cn";

type VoteItemProps = {
	icon: React.ReactNode;
	color: "yeah" | "maybe" | "nope";
	percentage: number;
};

export function VoteItem({ icon, color, percentage }: VoteItemProps) {
	return (
		<div
			className={cn(
				"flex items-center space-x-1.5",
				{
					"text-green-400": color === "yeah",
				},
				{
					"text-yellow-400": color === "maybe",
				},
				{
					"text-red-400": color === "nope",
				},
			)}
		>
			{icon}
			<div className="flex-grow bg-gray-600 rounded-full h-1.5 overflow-hidden ml-1">
				<div
					className={cn(
						"h-1.5 rounded-full",
						{
							"text-green-400 bg-green-400": color === "yeah",
						},
						{
							"text-yellow-400 bg-yellow-400": color === "maybe",
						},
						{
							"text-red-400 bg-red-400": color === "nope",
						},
					)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<span className="text-gray-400 w-7 text-right">{percentage}%</span>
		</div>
	);
}
