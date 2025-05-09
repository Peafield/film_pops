type PageHeaderProps = {
	title: string;
	icon: React.ReactNode;
	subtitle: string;
};

export function PageHeader({ title, icon, subtitle }: PageHeaderProps) {
	return (
		<header className="mb-8">
			<h1 className="text-3xl font-bold text-indigo-400 flex items-center">
				<span className="mr-3">{icon}</span>
				{title}
			</h1>
			<p className="text-gray-400 mt-2">{subtitle}</p>
		</header>
	);
}
6;
