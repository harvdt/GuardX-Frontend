import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { isAuthenticated } from "@/utils/twitterAuthUtils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface TwitterLoginResponse {
	success?: boolean;
	data?: {
		url: string;
		cache_id: string;
	};
	error?: string;
}

export default function Login() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated()) {
			navigate("/dashboard");
		}
	}, [navigate]);

	const handleLogin = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				"http://127.0.0.1:4000/api/auth/twitter-login",
			);

			if (!response.ok) {
				throw new Error(`Server error: ${response.status}`);
			}

			const data: TwitterLoginResponse = await response.json();

			if (data.data?.url && data.data?.cache_id) {
				// Store the cache_id in localStorage
				localStorage.setItem("twitter_cache_id", data.data.cache_id);
				console.log("Stored cache_id:", data.data.cache_id);

				// Create a window reference to keep track of it
				const authWindow = window.open(data.data.url, "_blank");

				// Show message that login window is open
				setError(
					"Login window opened. Please complete authentication in the new window.",
				);

				// Optional: Check if window was closed to detect cancellation
				const checkWindowClosed = setInterval(() => {
					if (authWindow?.closed) {
						clearInterval(checkWindowClosed);
						setError(
							"Authentication window was closed. Please try again if you didn't complete the process.",
						);
						setIsLoading(false);
					}
				}, 1000);

				// Clear the interval after a reasonable timeout (e.g., 5 minutes)
				setTimeout(() => {
					clearInterval(checkWindowClosed);
				}, 300000); // 5 minutes
			} else {
				throw new Error(
					"Invalid response from server: missing URL or cache_id",
				);
			}
		} catch (error) {
			console.error("Error during login:", error);
			setError(
				`Error: ${error instanceof Error ? error.message : String(error)}`,
			);
			setIsLoading(false);
		}
	};

	return (
		<Card className="flex flex-col gap-3 p-5 w-[400px]">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Please login using your X Accounts. Click this link below.
				</CardDescription>
			</CardHeader>
			<CardContent className="my-5">
				<Button className="w-full" onClick={handleLogin} disabled={isLoading}>
					{isLoading ? (
						<>
							<span className="animate-spin mr-2">⟳</span>
							Connecting...
						</>
					) : (
						"Login with X"
					)}
				</Button>

				{error && <p className="text-sm text-orange-600 mt-2">{error}</p>}
			</CardContent>
		</Card>
	);
}
