import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

const Loading = () => {
	return (
		<main>
			<Card className="bg-white shadow-md rounded-lg border col-span-2">
				<CardHeader>
					<CardDescription>Loading accounts data...</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-40">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default Loading;
