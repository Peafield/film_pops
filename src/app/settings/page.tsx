import { Container } from "@/components/pages/Container";
import { PageHeader } from "@/components/pages/PageHeader";
import { DangerZone } from "@/components/settings/DangerZone";
import { PasswordSection } from "@/components/settings/PasswordSection";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { FaUserCog } from "react-icons/fa";

export default function SettingsPage() {
	return (
		<Container>
			<PageHeader
				title="Account Settings"
				icon={<FaUserCog />}
				subtitle="Manage your profile and account preferences"
			/>
			{/* TODO: Add skeleton here */}
			<ProfileSection />
			<PasswordSection />
			<DangerZone />
		</Container>
	);
}
