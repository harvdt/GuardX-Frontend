import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

const ErrorLoadingData = ({ error }: { error: string }) => {
	return (
		<main>
			<Card className="bg-white shadow-md rounded-lg border col-span-2">
				<CardHeader>
					<CardDescription>Error loading data</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-40">
						<div className="text-center">
							<p className="text-red-500 mb-2">Failed to load data</p>
							<p className="text-sm text-gray-500">{error}</p>
							<Button
								onClick={() => window.location.reload()}
								className="mt-4 px-4 py-2 bg-zinc-950 text-white rounded"
							>
								Retry
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default ErrorLoadingData;
