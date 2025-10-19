import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync('authToken');
      const savedUser = await SecureStore.getItemAsync('userData');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (authToken, userData) => {
    try {
      setToken(authToken);
      setUser(userData);

      await SecureStore.setItemAsync('authToken', authToken);
      await SecureStore.setItemAsync('userData', JSON.stringify(userData));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Update user avatar after face verification
  const updateUserAvatar = async (avatarUrl) => {
    try {
      if (user) {
        const updatedUser = {
          ...user,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        };
        
        setUser(updatedUser);
        await SecureStore.setItemAsync('userData', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating avatar:', error);
      return false;
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!token,
    // Add avatar check properties
    hasAvatar: !!user?.avatar_url,
    updateUserAvatar,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};