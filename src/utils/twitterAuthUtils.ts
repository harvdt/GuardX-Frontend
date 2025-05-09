import type { User } from '@/types/user';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("twitter_authenticated") === "true" && !!Cookies.get("twitter_access_token");
};

export const getTwitterTokens = () => {  
  return {
    access_token: Cookies.get("twitter_access_token") || null,
    refresh_token: localStorage.getItem("twitter_refresh_token") || null,
  };
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
}

export const logout = () => {
  localStorage.removeItem("twitter_authenticated");
  Cookies.remove("twitter_access_token");
  localStorage.removeItem("twitter_refresh_token");
  localStorage.removeItem("twitter_user_data");
};

export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem("twitter_refresh_token");
    if (!refreshToken) {
      return false;
    }
    
    const response = await fetch("http://127.0.0.1:4000/api/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken
      }),
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    
    if (data.statusCode === 200 && data.data && data.data.access_token) {
      // Get expiration time - parse the 7200s format to seconds
      const expireInSeconds = Number.parseInt(data.data.expire_in || "7200s", 10) || 7200;
      
      // Store new access token in cookies
      Cookies.set("twitter_access_token", data.data.access_token, { 
        expires: expireInSeconds / (60 * 60 * 24), // Convert seconds to days
        secure: window.location.protocol === 'https:',
        sameSite: 'Lax'
      });
      
      // Update refresh token if provided
      if (data.data.refresh_token) {
        localStorage.setItem("twitter_refresh_token", data.data.refresh_token);
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
};