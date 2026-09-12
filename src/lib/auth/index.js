// src/lib/auth/index.js

import { useAuthContext, AuthProvider, readSession, ProtectedRoute } from './AuthContext'
import { api } from '../api'

export { AuthProvider, useAuthContext, ProtectedRoute, readSession }

export const auth = {
  signIn: async (email, password) => {
    return api('auth/sign-in', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  signUp: async (data) => {
    const body = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
    }
    if (data.role === 'recruiter') {
      body.company_name = data.company_name
      body.company_website = data.company_website
      body.company_registration_number = data.company_registration_number
    }
    return api('auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  },

  signOut: async () => ({ success: true }),

  getCurrentUser: async () => {
    const session = readSession()
    const token = session?.session?.access_token
    if (!token) throw new Error('No active session')
    return api('auth/me', { method: 'GET' }, token)
  },

  updateProfile: async (patch, token) => {
    return api('auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(patch),
    }, token)
  },
}

export const useAuth = () => {
  const context = useAuthContext()
  return {
    user: context.user,
    loading: context.loading,
    error: context.error,
    signIn: context.signIn,
    signUp: context.signUp,
    signOut: context.signOut,
    isAuthenticated: context.isAuthenticated,
    token: context.token,
    role: context.role,
    loadProfile: context.loadProfile,
  }
}

export const useRequireAuth = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}

export const useRequireRole = (requiredRole) => {
  const { role } = useAuth()
  return role === requiredRole
}
