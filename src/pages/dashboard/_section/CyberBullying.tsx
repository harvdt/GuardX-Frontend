import Chart from "@/components/layout/Chart";
import ErrorLoadingData from "@/components/layout/ErrorLoadingData";
import Loading from "@/components/layout/Loading";
import TotalSection from "@/components/layout/TotalSection";
import UserTable from "@/components/layout/UserTable";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { MutedChart, MutedUser } from "@/types/muted";
import { fetchMutedStatistics } from "@/utils/statisticUtils";
import { useEffect, useState } from "react";

export default function CyberBullying() {
	const [chartData, setChartData] = useState<MutedChart[]>([]);
	const [mutedUsers, setMutedUsers] = useState<MutedUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const { chartData, usersData } = await fetchMutedStatistics({
					filter: "cyber_bully",
				});

				setChartData(chartData);
				setMutedUsers(usersData);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err instanceof Error ? err.message : "Unknown error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const totalDetectedReplies = chartData.reduce(
		(acc: number, curr: MutedChart) => acc + curr.amount,
		0,
	);

	const now = new Date();
	const currentMonthYear = now.toLocaleString("default", {
		month: "long",
		year: "numeric",
	});

	const totalDetectedThisMonth =
		chartData.find((item: MutedChart) => item.month === currentMonthYear)
			?.amount || 0;

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorLoadingData error={error} />;
	}

	return (
		<main>
			<Card className="bg-white shadow-md rounded-lg border col-span-2">
				<CardHeader>
					<CardTitle>Total Detected Hate Speech Chart</CardTitle>
					<CardDescription>
						Showing chart of total detected Hate Speech replies all time
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Chart data={chartData} />

					<TotalSection
						firstTitle="Total Detected Hate Speech Replies All Time"
						totalAccounts={totalDetectedReplies}
						secondTitle="Total Dectected Hate Speech Replies This Month"
						totalThisMonth={totalDetectedThisMonth}
					/>
				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 rounded-b-lg">
					<UserTable data={mutedUsers} type="hate_speech" />
				</CardFooter>
			</Card>
		</main>
	);
}
