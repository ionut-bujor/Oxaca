import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';

const API_BASE = 'http://localhost:8080';
const STORAGE_KEY = 'authUser';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  fetchCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
  isWaiter: () => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore persisted user on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  /**
   * Fetch the currently authenticated user from the backend session.
   * Call this AFTER a successful POST /api/v1/auth/login (which sets the session cookie).
   */
  const fetchCurrentUser = async () => {
    const response = await fetch(`${API_BASE}/api/v1/auth/getCurrentUser`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch current user');
    }

    const userData: User = await response.json();
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  /**
   * Invalidate the backend session and clear local state.
   */
  const logout = async () => {
    try {
      await fetch(`${API_BASE}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Backend may be unreachable — still clear local state
    } finally {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const isWaiter = () => user?.role === 'WAITER' || user?.role === 'KITCHEN' || user?.role === 'ADMIN';
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{ user, loading, fetchCurrentUser, logout, isWaiter, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
