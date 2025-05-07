type AdminDashboardPanelProps = {
	children: React.ReactNode;
};

export function AdminDashboardPanel({ children }: AdminDashboardPanelProps) {
	return (
		<section className="overflow-y-auto p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg">
			{children}
		</section>
	);
}
