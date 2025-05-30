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
import { getUserData, logout } from "@/utils/twitterAuthUtils";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
	Computer,
	LogOut,
	ShieldAlert,
	ShieldBan,
	ShieldEllipsis,
	ShieldX,
} from "lucide-react";
import { Link } from "react-router";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const items = [
	{
		title: "Muted Account",
		url: "/dashboard#mutedAccount",
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
	const userData = getUserData();

	console.log("User Data:", userData);

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
								<Link
									to="https://chromewebstore.google.com/category/extensions"
									target="_blank"
									className="flex items-center gap-2"
								>
									<Computer size={16} />
									Desktop
								</Link>
							</Button>
						</SidebarGroupContent>
					</SidebarGroup>
				)}
			</SidebarContent>

			<SidebarFooter className="bg-gray-50 border-t border-gray-200 ">
				<DropdownMenu>
					<DropdownMenuTrigger className="flex flex-col items-center gap-2 p-4">
						<Avatar className="w-12 h-12">
							<AvatarImage className="rounded-full" />
							<AvatarFallback className="bg-zinc-950 text-white">
								X
							</AvatarFallback>
						</Avatar>
						<div className="text-center">
							<p className="font-medium text-gray-800">
								{userData.twitter_username}
							</p>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Button
								onClick={() => {
									logout();
									window.location.reload();
								}}
								className="bg-transparent hover:bg-transparent text-gray-800"
							>
								<LogOut size={16} className="mr-2" />
								Logout
							</Button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
