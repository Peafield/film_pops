import { cn } from "@/utils/cn";

type SettingsContainerProps = {
	children: React.ReactNode;
	className?: string;
};

export function SettingsContainer({
	children,
	className,
}: SettingsContainerProps) {
	return (
		<section
			className={cn("bg-gray-800 rounded-lg p-6 mb-8", {
				[className as string]: !!className,
			})}
		>
			{children}
		</section>
	);
}
