// context/AuthContext.js
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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
        scheduleTokenRefresh(); // start auto refresh timer
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

      scheduleTokenRefresh(); // start auto refresh
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
      if (!savedRefresh) throw new Error("No refresh token found");

      const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, {
        refresh_token: savedRefresh,
      });

      // Your API response format:
      // { "access_token": "...", "refresh_token": "...", "token_type": "bearer" }

      const { access_token, refresh_token: newRefresh } = response.data;

      if (access_token) {
        await SecureStore.setItemAsync("authToken", access_token);
        if (newRefresh) await SecureStore.setItemAsync("refreshToken", newRefresh);

        setToken(access_token);
        tokenRef.current = access_token;
        if (newRefresh) setRefreshToken(newRefresh);

        if (setTokenGlobally) setTokenGlobally(access_token);

        // Schedule next refresh
        scheduleTokenRefresh();

        console.log("✅ Token refreshed successfully");
      } else {
        console.warn("⚠️ Refresh API returned no token");
      }
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      logout(); // optional: logout if refresh fails
    }
  };

  const logout = async () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    setToken(null);
    setUser(null);
    setRefreshToken(null);
    tokenRef.current = null;

    await Promise.all([
      SecureStore.deleteItemAsync("authToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      SecureStore.deleteItemAsync("userData"),
    ]);
  };

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

  const updateUserAvatar = async (avatarUrl) => {
    return updateUserData({ avatar_url: avatarUrl });
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!token,
    updateUserAvatar,
    updateUserData,
    getValidToken: () => tokenRef.current,
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
