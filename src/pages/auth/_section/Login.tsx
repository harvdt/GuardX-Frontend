import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function Login() {
	return (
		<Card className="flex flex-col gap-3 p-5">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Please enter your email and password to login to your account.
				</CardDescription>
				<CardContent className="space-y-6 my-5">
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 border rounded"
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-2 border rounded"
					/>

					<Button className="w-full">
						<Link to="/dashboard">Login</Link>
					</Button>
				</CardContent>
			</CardHeader>
		</Card>
	);
}
