import type { User } from "@/types/user";
import Cookies from "js-cookie";

interface BackendTokenData {
	token: string;
	expires_at: number;
}

export const isAuthenticated = (): boolean => {
	return (
		localStorage.getItem("twitter_authenticated") === "true" &&
		!!Cookies.get("twitter_access_token")
	);
};

export const getTwitterTokens = () => {
	return {
		access_token: Cookies.get("twitter_access_token") || null,
		refresh_token: localStorage.getItem("twitter_refresh_token") || null,
	};
};

export const getBackendToken = (): string | null => {
	try {
		const backendTokenFromCookie = Cookies.get("backend_token");
		if (backendTokenFromCookie) {
			return backendTokenFromCookie;
		}

		const backendTokenDataStr = localStorage.getItem("backend_token_data");
		if (!backendTokenDataStr) return null;

		const backendTokenData: BackendTokenData = JSON.parse(backendTokenDataStr);

		if (Date.now() >= backendTokenData.expires_at - 60000) {
			localStorage.removeItem("backend_token_data");
			return null;
		}

		return backendTokenData.token;
	} catch (error) {
		console.error("Error parsing backend token data:", error);
		localStorage.removeItem("backend_token_data");
		return null;
	}
};

export const isBackendTokenExpired = (): boolean => {
	try {
		const backendTokenFromCookie = Cookies.get("backend_token");
		if (backendTokenFromCookie) {
			return false;
		}

		const backendTokenDataStr = localStorage.getItem("backend_token_data");
		if (!backendTokenDataStr) return true;

		const backendTokenData: BackendTokenData = JSON.parse(backendTokenDataStr);

		return Date.now() >= backendTokenData.expires_at - 60000;
	} catch (error) {
		console.error("Error checking backend token expiration:", error);
		return true;
	}
};

export const refreshBackendToken = async (): Promise<boolean> => {
	try {
		const response = await fetch(
			"http://localhost:4000/api/auth/refresh-backend-token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (!response.ok) {
			console.error("Backend token refresh failed:", response.status);
			return false;
		}

		const data = await response.json();

		if (data.statusCode === 200 && data.data && data.data.backend_token) {
			const backendExpireInSeconds =
				Number.parseInt(data.data.backend_token_expire_in || "604800", 10) ||
				604800;

			Cookies.set("backend_token", data.data.backend_token, {
				expires: backendExpireInSeconds / (60 * 60 * 24),
				secure: window.location.protocol === "https:",
				sameSite: "Lax",
			});

			const backendTokenData = {
				token: data.data.backend_token,
				expires_at: Date.now() + backendExpireInSeconds * 1000,
			};

			localStorage.setItem(
				"backend_token_data",
				JSON.stringify(backendTokenData),
			);
			return true;
		}

		return false;
	} catch (error) {
		console.error("Error refreshing backend token:", error);
		return false;
	}
};

export const ensureValidBackendToken = async (): Promise<string | null> => {
	const currentToken = getBackendToken();
	if (currentToken && !isBackendTokenExpired()) {
		return currentToken;
	}

	const refreshSuccess = await refreshBackendToken();
	if (refreshSuccess) {
		return getBackendToken();
	}

	return null;
};

export const getUserData = (): User => {
	let userDataObject = {};
	try {
		const storedData = localStorage.getItem("twitter_user_data");
		if (storedData) {
			userDataObject = JSON.parse(storedData);
		}
	} catch (error) {
		console.error("Error parsing user data:", error);
	}

	return userDataObject as User;
};

export const logout = () => {
	localStorage.removeItem("twitter_authenticated");
	Cookies.remove("twitter_access_token");
	Cookies.remove("backend_token");
	localStorage.removeItem("twitter_refresh_token");
	localStorage.removeItem("twitter_user_data");
	localStorage.removeItem("backend_token_data");
};

export const refreshToken = async (): Promise<boolean> => {
	try {
		const refreshToken = localStorage.getItem("twitter_refresh_token");
		if (!refreshToken) {
			return false;
		}

		const response = await fetch(
			"http://127.0.0.1:4000/api/auth/refresh-token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					refresh_token: refreshToken,
				}),
			},
		);

		if (!response.ok) {
			return false;
		}

		const data = await response.json();

		if (data.statusCode === 200 && data.data && data.data.access_token) {
			const expireInSeconds =
				Number.parseInt(data.data.expire_in || "7200s", 10) || 7200;

			Cookies.set("twitter_access_token", data.data.access_token, {
				expires: expireInSeconds / (60 * 60 * 24),
				secure: window.location.protocol === "https:",
				sameSite: "Lax",
			});

			if (data.data.refresh_token) {
				localStorage.setItem("twitter_refresh_token", data.data.refresh_token);
			}

			if (data.data.backend_token) {
				const backendExpireInSeconds =
					Number.parseInt(data.data.backend_token_expire_in || "604800", 10) ||
					604800;

				Cookies.set("backend_token", data.data.backend_token, {
					expires: backendExpireInSeconds / (60 * 60 * 24),
					secure: window.location.protocol === "https:",
					sameSite: "Lax",
				});

				const backendTokenData = {
					token: data.data.backend_token,
					expires_at: Date.now() + backendExpireInSeconds * 1000,
				};

				localStorage.setItem(
					"backend_token_data",
					JSON.stringify(backendTokenData),
				);
			}

			return true;
		}

		return false;
	} catch (error) {
		console.error("Error refreshing token:", error);
		return false;
	}
};
