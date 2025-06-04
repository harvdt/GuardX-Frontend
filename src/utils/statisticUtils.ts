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

	const groupedUsersMap = new Map<string, MutedUser>();

	for (const user of usersData.data) {
		const key = `${user.blocked_user_id}|${user.blocked_username}`;

		if (!groupedUsersMap.has(key)) {
			groupedUsersMap.set(key, {
				...user,
				count: 1,
			});
		} else {
			const existing = groupedUsersMap.get(key);

			if (existing) {
				if (new Date(user.created_at) > new Date(existing.created_at)) {
					existing.created_at = user.created_at;
					existing.blocked_tweet_id = user.blocked_tweet_id;
				}

				existing.count += 1;
			}
		}
	}

	return {
		chartData: chartData.data,
		usersData: Array.from(groupedUsersMap.values()),
	};
};

export type { MutedUser, MutedChart };
