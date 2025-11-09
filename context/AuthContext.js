// context/AuthContext.js
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AuthContext = createContext(undefined);

// Global callback for token refresh (used by apiClient)
let setTokenGlobally = null;
export const setGlobalTokenUpdater = (updater) => {
  setTokenGlobally = updater;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const tokenRef = useRef(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  // Provide updater to apiClient
  useEffect(() => {
    setGlobalTokenUpdater((newToken) => {
      setToken(newToken);
      tokenRef.current = newToken;
    });
  }, []);

  const checkExistingAuth = async () => {
    try {
      const [savedToken, savedUser, savedRefresh] = await Promise.all([
        SecureStore.getItemAsync('authToken'),
        SecureStore.getItemAsync('userData'),
        SecureStore.getItemAsync('refreshToken'),
      ]);

      if (savedToken && savedUser) {
        setToken(savedToken);
        tokenRef.current = savedToken;
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading auth:', error);
    } finally {
      setLoading(false);
    }
  };

  // context/AuthContext.js (صرف login function بدلو)
const login = async (authToken, userData, refreshToken) => {
  try {
    setToken(authToken);
    tokenRef.current = authToken;
    setUser(userData);

    await Promise.all([
      SecureStore.setItemAsync('authToken', authToken),
      SecureStore.setItemAsync('refreshToken', refreshToken), // یہ لائن ایڈ کرو
      SecureStore.setItemAsync('userData', JSON.stringify(userData)),
    ]);

    return true;
  } catch (error) {
    console.error('Login save error:', error);
    return false;
  }
};

  const logout = async () => {
    setToken(null);
    tokenRef.current = null;
    setUser(null);

    await Promise.all([
      SecureStore.deleteItemAsync('authToken'),
      SecureStore.deleteItemAsync('refreshToken'),
      SecureStore.deleteItemAsync('userData'),
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
      await SecureStore.setItemAsync('userData', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Update user error:', error);
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
    hasAvatar: !!user?.avatar_url,
    updateUserAvatar,
    updateUserData,
    getValidToken: () => tokenRef.current,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};