import type { MutedChart } from "@/types/muted";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import type { ChartConfig } from "../ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";

type ChartProps = {
	data: MutedChart[];
};

const chartConfig = {
	blocked: {
		label: "Blocked",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

const Chart = ({ data }: ChartProps) => {
	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Bar
					dataKey="amount"
					fill="var(--color-blocked)"
					radius={8}
					barSize={100}
				/>
			</BarChart>
		</ChartContainer>
	);
};

export default Chart;
