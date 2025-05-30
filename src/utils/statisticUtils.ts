import type { ApiResponse } from "@/types/helper";
import type { MutedChart, MutedUser } from "@/types/muted";
import { ensureValidBackendToken } from "@/utils/twitterAuthUtils";

type fetchMutedStatisticsProps = {
	filter?: "sexual_harassment" | "cyber_bully";
};

export const fetchMutedStatistics = async ({
	filter,
}: fetchMutedStatisticsProps) => {
	const backendToken = await ensureValidBackendToken();

	if (!backendToken) {
		throw new Error("Authentication failed. Please login again.");
	}

	const headers = {
		Authorization: `Bearer ${backendToken}`,
		"Content-Type": "application/json",
	};

	const [chartResponse, usersResponse] = await Promise.all([
		fetch(
			filter
				? `http://localhost:4000/api/statistic/muted-monthly?filter=${filter}`
				: "http://localhost:4000/api/statistic/muted-monthly",
			{
				method: "GET",
				headers,
			},
		),
		fetch(
			filter
				? `http://localhost:4000/api/statistic/muted-user?filter=${filter}`
				: "http://localhost:4000/api/statistic/muted-user",
			{
				method: "GET",
				headers,
			},
		),
	]);

	if (!chartResponse.ok) {
		throw new Error(`Chart API error! status: ${chartResponse.status}`);
	}
	if (!usersResponse.ok) {
		throw new Error(`Users API error! status: ${usersResponse.status}`);
	}

	const chartData: ApiResponse<MutedChart[]> = await chartResponse.json();
	const usersData: ApiResponse<MutedUser[]> = await usersResponse.json();

	if (chartData.statusCode !== 200) {
		throw new Error(chartData.message || "Failed to fetch chart data");
	}

	if (usersData.statusCode !== 200) {
		throw new Error(usersData.message || "Failed to fetch users data");
	}

	return {
		chartData: chartData.data,
		usersData: usersData.data,
	};
};

export type { MutedUser, MutedChart };
