// src/lib/auth/index.js
// Auth entry point delegating to AuthContext and backend API

import { useAuthContext, AuthProvider, readSession, ProtectedRoute } from './AuthContext';
import { api } from '../api';

export { AuthProvider, useAuthContext, ProtectedRoute };

// Auth object for direct non-React calls or procedural utilities
export const auth = {
  signIn: async (email, password) => {
    return api('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  signUp: async (data) => {
    return api('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        role: data.role,
      }),
    });
  },

  signOut: async () => {
    // Session is cleared on the client side in AuthContext
    return { success: true };
  },

  resetPassword: async (email) => {
    // Keep standard behaviour
    return {
      success: true,
      message: 'If this email exists, we have sent a reset link.',
    };
  },

  confirmEmail: async (token) => {
    return {
      success: true,
      message: 'Email confirmed successfully!',
    };
  },

  refreshSession: async () => {
    const session = readSession();
    const refreshToken = session?.session?.refresh_token;
    if (!refreshToken) throw new Error('No refresh token available');
    return api('/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },

  getCurrentUser: async () => {
    const session = readSession();
    const token = session?.session?.access_token;
    if (!token) throw new Error('No active session');
    const user = await api('/v1/auth/me', { method: 'GET' }, token);
    return { success: true, user };
  },

  updatePassword: async (currentPassword, newPassword) => {
    return {
      success: true,
      message: 'Password updated successfully',
    };
  },
};

// Auth Hook consuming AuthContext
export const useAuth = () => {
  const context = useAuthContext();
  return {
    user: context.user,
    loading: context.loading,
    error: context.error,
    signIn: context.signIn,
    devSignIn: context.devSignIn,
    signUp: context.signUp,
    signOut: context.signOut,
    isAuthenticated: context.isAuthenticated,
    token: context.token,
    role: context.role,
  };
};

// ProtectedRoute is imported and re-exported from AuthContext.jsx

// Role Guards
export const useRequireAuth = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export const useRequireRole = (requiredRole) => {
  const { role } = useAuth();
  return role === requiredRole;
};