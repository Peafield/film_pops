type SettingsContainerProps = {
	children: React.ReactNode;
};

export function SettingsContainer({ children }: SettingsContainerProps) {
	return (
		<section className="bg-gray-800 rounded-lg p-6 mb-8">{children}</section>
	);
}
