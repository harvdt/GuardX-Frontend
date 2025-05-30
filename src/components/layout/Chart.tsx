import type { MutedChart } from "@/types/muted";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
			<AreaChart
				accessibilityLayer
				data={data}
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
					dataKey="amount"
					type="linear"
					fill="var(--color-blocked)"
					fillOpacity={0.4}
					stroke="var(--color-blocked)"
				/>
			</AreaChart>
		</ChartContainer>
	);
};

export default Chart;
