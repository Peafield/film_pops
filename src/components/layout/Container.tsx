type ContainerProps = {
	children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
	return (
		<section className="container mx-auto px-4 py-8 min-h-screen max-w-6xl">
			{children}
		</section>
	);
}
