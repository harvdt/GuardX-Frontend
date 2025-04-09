import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
	return (
		<div className="flex flex-col justify-center items-center h-screen gap-3">
			<p className="text-6xl">Welcome to GuardX</p>

			<p>A place where you can be safe from all the "HELL" in X</p>

			<Button className="my-5">
				<Link to={"/auth"}>Get started</Link>
				<ArrowRight size={16} />
			</Button>
		</div>
	);
}
