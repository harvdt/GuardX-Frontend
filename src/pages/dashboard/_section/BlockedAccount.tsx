import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
	{ month: "January", blocked: 186 },
	{ month: "February", blocked: 305 },
	{ month: "March", blocked: 237 },
	{ month: "April", blocked: 73 },
	{ month: "May", blocked: 209 },
	{ month: "June", blocked: 214 },
];
const chartConfig = {
	blocked: {
		label: "Blocked",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export default function BlockedAccount() {
	const totalBlockedAccounts = chartData.reduce(
		(acc, curr) => acc + curr.blocked,
		0,
	);

	const totalBlockedThisMonth =
		chartData.find(
			(item) =>
				item.month === new Date().toLocaleString("default", { month: "long" }),
		)?.blocked || 0;

	return (
		<main>
			<Card className="bg-white shadow-md rounded-lg border col-span-2">
				<CardHeader>
					<CardTitle>Total Blocked Accounts Chart</CardTitle>
					<CardDescription>
						Showing chart of total Blocked Accounts all time
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<AreaChart
							accessibilityLayer
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="dot" hideLabel />}
							/>
							<Area
								dataKey="blocked"
								type="linear"
								fill="var(--color-blocked)"
								fillOpacity={0.4}
								stroke="var(--color-blocked)"
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 rounded-b-lg">
					<div className="flex flex-col items-center sm:items-start">
						<p className="text-sm font-medium text-gray-700">
							Total Blocked Accounts All Time
						</p>
						<p className="text-lg font-bold text-gray-900">
							{totalBlockedAccounts}
						</p>
					</div>

					<div className="flex flex-col items-center sm:items-end">
						<p className="text-sm font-medium text-gray-700">
							Total Blocked Accounts This Month
						</p>
						<p className="text-lg font-bold text-gray-900">
							{totalBlockedThisMonth}
						</p>
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
