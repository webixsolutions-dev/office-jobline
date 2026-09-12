// src/lib/auth/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { api } from '../api'

const SESSION_KEY = 'office-jobline.session'

const AuthContext = createContext(null)

export function readSession() {
  try {
    const s = localStorage.getItem(SESSION_KEY)
    return s ? JSON.parse(s) : null
  } catch {
    return null
  }
}

export function writeSession(session) {
  try {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  } catch {
    // ignored
  }
}

function normalizeExpiresAt(expiresAt) {
  if (expiresAt == null) return null
  const n = Number(expiresAt)
  if (Number.isNaN(n)) return null
  return n < 1e12 ? n * 1000 : n
}

function buildSessionFromAuthResponse(data) {
  const expiresAt = normalizeExpiresAt(data?.session?.expires_at)
  return {
    user: data?.user ?? null,
    profile: data?.profile ?? null,
    company: data?.company ?? null,
    session: data?.session
      ? {
          ...data.session,
          expires_at: expiresAt ?? data.session.expires_at,
        }
      : null,
    confirmationRequired: data?.confirmationRequired ?? false,
  }
}

function mergeMeIntoSession(base, me) {
  if (!me) return base
  const profile = me.profile ?? base?.profile
  const user = me.user ?? base?.user
  return {
    ...base,
    user: {
      ...user,
      ...profile,
      id: user?.id ?? profile?.id,
      email: user?.email ?? profile?.email,
      role: profile?.role ?? user?.role,
    },
    profile,
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProfile = async (token) => {
    const me = await api('auth/me', { method: 'GET' }, token)
    setSession((prev) => {
      if (!prev) return null
      const updated = mergeMeIntoSession(prev, me)
      writeSession(updated)
      return updated
    })
    return me
  }

  useEffect(() => {
    const initAuth = async () => {
      const activeSession = readSession()
      if (activeSession?.session?.access_token) {
        try {
          await loadProfile(activeSession.session.access_token)
          setSession(readSession())
        } catch (e) {
          console.error('Failed to restore session', e)
          setSession(null)
          writeSession(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const signIn = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await api('auth/sign-in', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      let next = buildSessionFromAuthResponse(data)
      writeSession(next)
      setSession(next)
      if (next.session?.access_token) {
        await loadProfile(next.session.access_token)
        setSession(readSession())
      }
      return readSession()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (payload) => {
    setLoading(true)
    setError(null)
    try {
      const body = {
        email: payload.email,
        password: payload.password,
        name: payload.name,
        role: payload.role,
      }
      if (payload.role === 'recruiter') {
        body.company_name = payload.company_name
        body.company_website = payload.company_website
        body.company_registration_number = payload.company_registration_number
      }

      const data = await api('auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(body),
      })

      let next = buildSessionFromAuthResponse(data)
      if (data?.company) {
        next = { ...next, company: data.company }
      }
      if (next.session?.access_token) {
        writeSession(next)
        setSession(next)
        await loadProfile(next.session.access_token)
        setSession(readSession())
      } else {
        writeSession(next)
        setSession(next)
      }
      return { ...data, confirmationRequired: data?.confirmationRequired ?? !data?.session }
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setSession(null)
    writeSession(null)
    setError(null)
  }

  const isAuthenticated = !!session?.session?.access_token
  const user = session?.user || null
  const token = session?.session?.access_token || null
  const role = user?.role || session?.profile?.role || null

  const value = {
    session,
    user,
    token,
    role,
    isAuthenticated,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    loadProfile: () => (token ? loadProfile(token) : null),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, role, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite">
        <p className="text-navy font-semibold">Loading session...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}
