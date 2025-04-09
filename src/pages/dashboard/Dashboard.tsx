import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useLocation } from "react-router";
import BlockedAccount from "./_section/BlockedAccount";
import CyberBullying from "./_section/CyberBullying";
import SexualHarassment from "./_section/SexualHarassment";

export default function DashboardLayout() {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const el = document.querySelector(location.hash);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			}
		}
	}, [location]);

	return (
		<SidebarProvider>
			<AppSidebar />

			<main className="w-full p-4 bg-zinc-100">
				<SidebarTrigger className="z-50 absolute" />

				<div className="space-y-5 mt-8">
					<div id="blockedAccount">
						<BlockedAccount />
					</div>

					<div id="sexualHarassment">
						<SexualHarassment />
					</div>

					<div id="cyberBullying">
						<CyberBullying />
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
}
