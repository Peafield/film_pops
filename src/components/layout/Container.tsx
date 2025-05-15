import { cn } from "@/utils/cn";

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
};

export function Container({ children, className }: ContainerProps) {
	return (
		<section
			className={cn("container mx-auto px-4 py-8 min-h-screen max-w-6xl", {
				[className as string]: !!className,
			})}
		>
			{children}
		</section>
	);
}
