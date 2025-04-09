import { Frown } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
	return (
		<div className="flex flex-col justify-center items-center h-screen gap-5">
			<Frown size={100} />
			<p className="text-red-600 font-bold text-9xl">404</p>

			<p className="font-semibold text-2xl">Page Not Found</p>

			<Link
				to={"/dashboard"}
				className="rounded-2xl bg-zinc-950 px-4 py-2 text-white"
			>
				Take me back
			</Link>
		</div>
	);
}
