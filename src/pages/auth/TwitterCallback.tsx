import { Card, CardContent } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router";

interface TwitterCallbackData {
	statusCode: number;
	message: string;
	data?: {
		twitter_user_id?: string;
		twitter_username?: string;
		access_token?: string;
		refresh_token?: string;
		backend_token?: string;
		expire_in?: string;
		backend_token_expire_in?: string;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		[key: string]: any;
	};
	error?: string;
}

export default function TwitterCallback() {
	const [status, setStatus] = useState("Initializing authentication...");

	useEffect(() => {
		const handleCallback = async () => {
			try {
				const currentUrl = new URL(window.location.href);
				const urlParams = currentUrl.searchParams;
				const state = urlParams.get("state");
				const code = urlParams.get("code");

				if (!state || !code) {
					setStatus("Authentication failed: Missing state or code parameters");
					return;
				}

				let cacheId = urlParams.get("cache_id");

				if (!cacheId) {
					cacheId = localStorage.getItem("twitter_cache_id");

					if (!cacheId) {
						setStatus("Authentication failed: No cache ID found in storage");
						return;
					}

					currentUrl.searchParams.append("cache_id", cacheId);
					window.history.replaceState({}, "", currentUrl.toString());

					setStatus("Added cache_id to URL, continuing authentication...");

					await new Promise((resolve) => setTimeout(resolve, 500));
				}

				setStatus("Processing authentication with server...");

				const response = await fetch(
					`http://127.0.0.1:4000/api/auth/twitter-callback?code=${code}&state=${state}&cache_id=${cacheId}`,
					{
						method: "GET",
					},
				);

				if (!response.ok) {
					const errorData = await response.text();
					throw new Error(`Server error: ${response.status} ${errorData}`);
				}

				const responseData: TwitterCallbackData = await response.json();

				if (responseData.statusCode === 200 && responseData.data) {
					localStorage.setItem("twitter_authenticated", "true");

					if (responseData.data) {
						const userData = {
							twitter_user_id: responseData.data.twitter_user_id,
							twitter_username: responseData.data.twitter_username,
						};
						localStorage.setItem("twitter_user_data", JSON.stringify(userData));

						if (responseData.data.access_token) {
							const expireInSeconds =
								Number.parseInt(responseData.data.expire_in || "7200s", 10) ||
								7200;
							Cookies.set(
								"twitter_access_token",
								responseData.data.access_token,
								{
									expires: expireInSeconds / (60 * 60 * 24),
									secure: window.location.protocol === "https:",
									sameSite: "Lax",
								},
							);
						}

						if (responseData.data.backend_token) {
							const backendExpireInSeconds =
								Number.parseInt(
									responseData.data.backend_token_expire_in || "604800",
									10,
								) || 604800;

							Cookies.set("backend_token", responseData.data.backend_token, {
								expires: backendExpireInSeconds / (60 * 60 * 24),
								secure: window.location.protocol === "https:",
								sameSite: "Lax",
							});
						}

						if (responseData.data.refresh_token) {
							localStorage.setItem(
								"twitter_refresh_token",
								responseData.data.refresh_token,
							);
						}
					}

					localStorage.removeItem("twitter_cache_id");

					setStatus("Authentication successful!");
				} else {
					console.error("Authentication response:", responseData);
					setStatus(
						responseData.message.includes("No cache ID")
							? "Authentication successful!"
							: `Authentication failed: ${
									responseData.message || "Unknown error"
								}`,
					);
				}
			} catch (error) {
				console.error("Error during Twitter callback:", error);
				setStatus(
					`Error: ${error instanceof Error ? error.message : String(error)}`,
				);
			}
		};

		handleCallback();
	}, []);

	return (
		<Card className="w-full max-w-md mx-auto mt-8">
			<CardContent className="pt-6">
				<div className="flex flex-col items-center justify-center space-y-4">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
					<p className="text-center">{status}</p>
				</div>

				<div className="flex flex-col items-center justify-center space-y-4 mt-4">
					<Link
						to={"/dashboard"}
						className="text-blue-500 hover:underline mt-4"
					>
						Go to Dashboard
					</Link>

					<p className="font-bold text-center text-red-500">
						Re-open your GuardX Extension if the extension doesn't reload.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
