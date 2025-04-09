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
	{ month: "January", detected: 50 },
	{ month: "February", detected: 35 },
	{ month: "March", detected: 137 },
	{ month: "April", detected: 23 },
	{ month: "May", detected: 109 },
	{ month: "June", detected: 4 },
];
const chartConfig = {
	detected: {
		label: "Detected",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export default function SexualHarassment() {
	const totalDetectedReplies = chartData.reduce(
		(acc, curr) => acc + curr.detected,
		0,
	);

	const totalDetectedThisMonth =
		chartData.find(
			(item) =>
				item.month === new Date().toLocaleString("default", { month: "long" }),
		)?.detected || 0;

	return (
		<main>
			<Card className="bg-white shadow-md rounded-lg border col-span-2">
				<CardHeader>
					<CardTitle>Total Detected Sexual Harassment Chart</CardTitle>
					<CardDescription>
						Showing chart of total detected Sexual Harassment replies all time
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
								dataKey="detected"
								type="linear"
								fill="var(--color-detected)"
								fillOpacity={0.4}
								stroke="var(--color-detected)"
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 rounded-b-lg">
					<div className="flex flex-col items-center sm:items-start">
						<p className="text-sm font-medium text-gray-700">
							Total Detected Sexual Harassment Replies All Time
						</p>
						<p className="text-lg font-bold text-gray-900">
							{totalDetectedReplies}
						</p>
					</div>

					<div className="flex flex-col items-center sm:items-end">
						<p className="text-sm font-medium text-gray-700">
							Total Dectected Sexual Harassment Replies This Month
						</p>
						<p className="text-lg font-bold text-gray-900">
							{totalDetectedThisMonth}
						</p>
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
