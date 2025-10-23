'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isAuthenticated, login, logout, LoginCredentials, getCurrentUser, User } from './auth';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Set a fallback timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn('Auth check timed out, setting loading to false');
      setLoading(false);
    }, 10000); // 10 seconds

    try {
      const authenticated = isAuthenticated();
      if (authenticated) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const handleLogin = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    try {
      const success = await login(credentials);
      if (success) {
        await checkAuth(); // Refresh user data
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    isLoggedIn,
    user,
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
