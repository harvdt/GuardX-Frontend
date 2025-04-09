import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./_section/Login";
import Register from "./_section/Register";

export default function Auth() {
	return (
		<main className="flex flex-col justify-center items-center h-screen">
			<Tabs defaultValue="login" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Login />
				</TabsContent>
				<TabsContent value="register">
					<Register />
				</TabsContent>
			</Tabs>
		</main>
	);
}
