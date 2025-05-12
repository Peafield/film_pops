import { cn } from "@/utils/cn";

type SettingsHeadingProps = {
	icon: React.ReactNode;
	title: string;
	className?: string;
};

export function SettingsHeading({
	icon,
	title,
	className,
}: SettingsHeadingProps) {
	return (
		<h2
			className={cn("text-xl font-semibold flex items-center mb-6", {
				[className as string]: !!className,
			})}
		>
			<span className="mr-2">{icon}</span>
			{title}
		</h2>
	);
}
