// context/AuthContext.js
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { OnboardingManager } from "../Halper/OnboardingManager";

const BASE_URL = "https://api.unitec.run.place";
const AuthContext = createContext(undefined);

let setTokenGlobally = null;
export const setGlobalTokenUpdater = (updater) => {
  setTokenGlobally = updater;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const tokenRef = useRef(token);
  const refreshTimerRef = useRef(null);

  // Keep refs updated
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  useEffect(() => {
    setGlobalTokenUpdater((newToken) => {
      setToken(newToken);
      tokenRef.current = newToken;
    });
  }, []);

  // 🔹 Check if user already logged in
  const checkExistingAuth = async () => {
    try {
      const [savedToken, savedUser, savedRefresh] = await Promise.all([
        SecureStore.getItemAsync("authToken"),
        SecureStore.getItemAsync("userData"),
        SecureStore.getItemAsync("refreshToken"),
      ]);

      if (savedToken && savedUser) {
        setToken(savedToken);
        setRefreshToken(savedRefresh);
        tokenRef.current = savedToken;
        setUser(JSON.parse(savedUser));
        
        // Mark auth onboarding as completed when user is found
        await OnboardingManager.completeAuthOnboarding();
        scheduleTokenRefresh();
      }
    } catch (error) {
      console.error("Error loading auth:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function (save tokens + start timer)
  const login = async (authToken, userData, refreshToken) => {
    try {
      setToken(authToken);
      setRefreshToken(refreshToken);
      tokenRef.current = authToken;
      setUser(userData);

      await Promise.all([
        SecureStore.setItemAsync("authToken", authToken),
        SecureStore.setItemAsync("refreshToken", refreshToken),
        SecureStore.setItemAsync("userData", JSON.stringify(userData)),
      ]);

      // Mark auth onboarding as completed on successful login
      await OnboardingManager.completeAuthOnboarding();
      scheduleTokenRefresh();
      return true;
    } catch (error) {
      console.error("Login save error:", error);
      return false;
    }
  };

  // ✅ Automatically refresh before expiry (e.g. every 25 mins)
  const scheduleTokenRefresh = () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    // 🔹 Your token expires every 30 minutes — so refresh 1 minute before expiry
    const REFRESH_INTERVAL = 29 * 60 * 1000; // 29 minutes

    refreshTimerRef.current = setTimeout(() => {
      refreshAccessToken();
    }, REFRESH_INTERVAL);
  };

  // ✅ Function to refresh token
  const refreshAccessToken = async () => {
    try {
      const savedRefresh = await SecureStore.getItemAsync("refreshToken");
      if (!savedRefresh) {
        console.error("❌ No refresh token found");
        return;
      }

      console.log("🔄 Refreshing access token...");
      
      const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
        refresh_token: savedRefresh,
      });

      const { access_token, refresh_token: newRefreshToken } = response.data;

      if (access_token) {
        // ✅ Update access token
        await SecureStore.setItemAsync("authToken", access_token);
        setToken(access_token);
        tokenRef.current = access_token;

        // ✅ Update refresh token if new one is provided
        if (newRefreshToken) {
          await SecureStore.setItemAsync("refreshToken", newRefreshToken);
          setRefreshToken(newRefreshToken);
          console.log("✅ Refresh token updated");
        }

        // ✅ Update global token if set
        if (setTokenGlobally) {
          setTokenGlobally(access_token);
        }

        // ✅ Schedule next refresh
        scheduleTokenRefresh();

        console.log("✅ Access token refreshed successfully");
        
        return {
          success: true,
          access_token: access_token,
          refresh_token: newRefreshToken
        };
      } else {
        console.warn("⚠️ Refresh API returned no access token");
        return { success: false, error: "No access token in response" };
      }
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      
      // Check if it's an authentication error (invalid refresh token)
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log("🔄 Refresh token expired, logging out...");
        logout(); // logout if refresh token is invalid
      }
      
      return { success: false, error: error.message };
    }
  };

  // ✅ Manual token refresh function (for external use)
  const manualRefreshToken = async () => {
    return await refreshAccessToken();
  };

  // ✅ Logout function - ONLY clear auth data, NOT onboarding
  const logout = async () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    setToken(null);
    setUser(null);
    setRefreshToken(null);
    tokenRef.current = null;

    // ONLY delete auth related data, NOT onboarding data
    await Promise.all([
      SecureStore.deleteItemAsync("authToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      SecureStore.deleteItemAsync("userData"),
    ]);

    // Onboarding status remains intact! ✅
    console.log("✅ Logout successful - Onboarding status preserved");
  };

  // ✅ Update user data
  const updateUserData = async (updatedData) => {
    if (!user) return false;
    try {
      const updatedUser = {
        ...user,
        ...updatedData,
        updated_at: new Date().toISOString(),
      };
      setUser(updatedUser);
      await SecureStore.setItemAsync("userData", JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error("Update user error:", error);
      return false;
    }
  };

  // ✅ Update user avatar
  const updateUserAvatar = async (avatarUrl) => {
    return updateUserData({ avatar_url: avatarUrl });
  };

  // ✅ Get valid token (for API calls)
  const getValidToken = () => tokenRef.current;

  // ✅ Check if token refresh is needed
  const isTokenExpired = async () => {
    // You can implement token expiration check logic here
    // For now, we'll rely on the automatic refresh
    return false;
  };

  const value = {
    user,
    token,
    refreshToken,
    login,
    logout,
    loading,
    isAuthenticated: !!token,
    updateUserAvatar,
    updateUserData,
    getValidToken,
    refreshAccessToken: manualRefreshToken, // Export for external use
    isTokenExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};