type SettingsHeadingProps = {
	icon: React.ReactNode;
	title: string;
};

export function SettingsHeading({ icon, title }: SettingsHeadingProps) {
	return (
		<h2 className="text-xl font-semibold flex items-center-">
			<span className="mr-2">{icon}</span>
			{title}
		</h2>
	);
}
