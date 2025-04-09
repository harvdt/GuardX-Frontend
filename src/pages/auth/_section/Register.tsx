import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function Register() {
	return (
		<Card className="flex flex-col gap-3 p-5">
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>
					Please enter your email and password to create a new account.
				</CardDescription>
				<CardContent className="my-5 space-y-6">
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
						<Link to="/dashboard">Register</Link>
					</Button>
				</CardContent>
			</CardHeader>
		</Card>
	);
}
