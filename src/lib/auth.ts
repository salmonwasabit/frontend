import { API_BASE_URL } from "./config";
// Secure authentication utilities for admin access


export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  is_active: number;
  created_at: string;
}

export const login = async (credentials: LoginCredentials): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: AuthResponse = await response.json();

    // Store token securely (in production, this should be httpOnly cookie from server)
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('token_type', data.token_type);
      localStorage.setItem('login_time', Date.now().toString());
    }

    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('login_time');
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;

  const token = localStorage.getItem('access_token');
  const loginTime = localStorage.getItem('login_time');

  if (!token || !loginTime) return false;

  // Check if token is expired (30 minutes)
  const loginTimestamp = parseInt(loginTime);
  const now = Date.now();
  const minutesSinceLogin = (now - loginTimestamp) / (1000 * 60);

  if (minutesSinceLogin > 30) {
    logout();
    return false;
  }

  return true;
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = getAccessToken();
    if (!token) return null;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      return null;
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Error fetching current user:', error);
    }
    return null;
  }
};
