import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
	Computer,
	ShieldAlert,
	ShieldBan,
	ShieldEllipsis,
	ShieldX,
} from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const items = [
	{
		title: "Blocked Account",
		url: "/dashboard#blockedAccount",
		icon: ShieldBan,
	},
	{
		title: "Sexual Harassment",
		url: "/dashboard#sexualHarassment",
		icon: ShieldAlert,
	},
	{
		title: "Cyber Bullying",
		url: "/dashboard#cyberBullying",
		icon: ShieldEllipsis,
	},
];

export function AppSidebar() {
	const { state } = useSidebar();

	return (
		<Sidebar collapsible="icon" className="bg-white">
			<SidebarContent className="bg-white">
				{state === "expanded" && (
					<SidebarHeader className="flex items-center bg-white pt-4">
						<ShieldX />
						<p className="text-xl font-semibold">GuardX</p>
					</SidebarHeader>
				)}

				<SidebarGroup className="bg-white">
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent className="bg-white">
						<SidebarMenu className="bg-white">
							{items.map((item) => (
								<SidebarMenuItem key={item.title} className="bg-white">
									<SidebarMenuButton asChild className="bg-white">
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{state === "expanded" && (
					<SidebarGroup className="bg-white">
						<SidebarGroupLabel>Download</SidebarGroupLabel>
						<SidebarGroupContent className="bg-white px-2">
							<Button className="w-full">
								<Computer size={16} />
								Desktop
							</Button>
						</SidebarGroupContent>
					</SidebarGroup>
				)}
			</SidebarContent>

			<SidebarFooter className="bg-gray-50 border-t border-gray-200 flex flex-col items-center gap-2 p-4">
				<Avatar className="w-12 h-12">
					<AvatarImage
						src="https://github.com/shadcn.png"
						className="rounded-full"
					/>
					<AvatarFallback>X</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<p className="font-medium text-gray-800">Yoga Hartono Supriadi</p>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
