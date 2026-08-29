// src/lib/auth/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api';


const SESSION_KEY = 'servicecare.session';

const AuthContext = createContext(null);

export function readSession() {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}

export function writeSession(session) {
  try {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    // Ignored
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to load user profile
  const loadProfile = async (token) => {
    try {
      const userProfile = await api('/v1/auth/me', { method: 'GET' }, token);
      setSession(prev => {
        if (!prev) return null;
        const updated = {
          ...prev,
          user: {
            ...prev.user,
            ...userProfile,
          },
        };
        writeSession(updated);
        return updated;
      });
    } catch (err) {
      console.error('Failed to load profile', err);
    }
  };

  const devSignIn = (email, role) => {
    const apiRole = role === 'employer' ? 'recruiter' : 'job_seeker';
    const mockSession = {
      dev: true,
      session: {
        access_token: 'dev-token',
        refresh_token: 'dev-refresh',
        expires_at: Date.now() + 86400000,
      },
      user: {
        email: email || 'demo@example.com',
        role: apiRole,
        full_name: 'Demo User',
      },
    };
    setSession(mockSession);
    writeSession(mockSession);
    return mockSession;
  };

  // Check and load profile on mount or session change
  useEffect(() => {
    const initAuth = async () => {
      const activeSession = readSession();
      if (activeSession?.dev) {
        setSession(activeSession);
        setLoading(false);
        return;
      }
      if (activeSession?.session?.access_token) {
        // If expired or expiring soon (e.g. within 5 mins), try refreshing
        const expiresAt = activeSession.session.expires_at;
        const now = Date.now();
        if (expiresAt && expiresAt - now < 300000) {
          try {
            await refresh(activeSession.session.refresh_token);
          } catch (e) {
            console.error('Failed to refresh session on startup', e);
            // Clear session if refresh fails
            setSession(null);
            writeSession(null);
          }
        } else {
          // Normal profile load
          await loadProfile(activeSession.session.access_token);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api('/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setSession(data);
      writeSession(data);
      if (data?.session?.access_token) {
        await loadProfile(data.session.access_token);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api('/v1/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          full_name: data.full_name,
          role: data.role,
        }),
      });
      // If the API immediately returns session data, log them in
      if (res?.session) {
        setSession(res);
        writeSession(res);
      }
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refresh = async (refreshToken) => {
    try {
      const data = await api('/v1/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      setSession(prev => {
        const updated = {
          ...prev,
          session: data.session,
          user: data.user || prev?.user,
        };
        writeSession(updated);
        return updated;
      });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    setSession(null);
    writeSession(null);
    setError(null);
  };

  const isAuthenticated = !!session?.session?.access_token;
  const user = session?.user || null;
  const token = session?.session?.access_token || null;
  const role = user?.role || null;

  const value = {
    session,
    user,
    token,
    role,
    isAuthenticated,
    loading,
    error,
    signIn,
    devSignIn,
    signUp,
    signOut,
    refreshSession: () => session?.session?.refresh_token ? refresh(session.session.refresh_token) : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role, loading } = useAuthContext();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <p className="text-navy font-semibold">Loading session...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

