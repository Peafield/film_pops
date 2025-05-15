type VoteItemProps = {
	icon: React.ReactNode;
	color: string;
	percentage: number;
};

export function VoteItem({ icon, color, percentage }: VoteItemProps) {
	return (
		<div className={`flex items-center ${color} space-x-1.5`}>
			{icon}
			<div className="flex-grow bg-gray-600 rounded-full h-1.5 overflow-hidden ml-1">
				<div
					className={`${color.replace("text-", "bg-")} h-1.5 rounded-full`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<span className="text-gray-400 w-7 text-right">{percentage}%</span>
		</div>
	);
}
