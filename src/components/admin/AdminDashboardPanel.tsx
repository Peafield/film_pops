type AdminDashboardPanelProps = {
	children: React.ReactNode;
};

export function AdminDashboardPanel({ children }: AdminDashboardPanelProps) {
	return (
		<section className="overflow-y-auto p-6 bg-gray-800 text-medium rounded-lg">
			{children}
		</section>
	);
}
