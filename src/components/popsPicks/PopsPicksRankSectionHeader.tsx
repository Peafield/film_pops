import { cn } from "@/utils/cn";

type PopsPicksRankSectionHeaderProps = {
	icon: React.ReactNode;
	title: string;
	className?: string;
};

export function PopsPicksRankSectionHeader({
	icon,
	title,
	className,
}: PopsPicksRankSectionHeaderProps) {
	return (
		<h3
			className={cn("text-lg md:text-xl font-semibold flex items-center", {
				[className as string]: !!className,
			})}
		>
			<span className="mr-2 text-indigo-400">{icon}</span>
			{title}
		</h3>
	);
}
