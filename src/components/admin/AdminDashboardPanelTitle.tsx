type AdminDashboardPanelTitleProps = {
	title: string;
};

export function AdminDashBoardPanelTitle({
	title,
}: AdminDashboardPanelTitleProps) {
	return <h3 className="md:text-2xl font-bold text-white mb-2">{title}</h3>;
}
