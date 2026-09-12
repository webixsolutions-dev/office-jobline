// src/lib/SavedJobsContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from './api'
import { useAuth } from './auth'
import { collectSavedJobIds, getSeekerDashboard } from './jobs'

const SavedJobsContext = createContext(null)

export function SavedJobsProvider({ children }) {
  const { token, isAuthenticated, role } = useAuth()
  const [savedIds, setSavedIds] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refreshSaved = useCallback(async () => {
    if (!isAuthenticated || !token || role === 'recruiter') {
      setSavedIds(new Set())
      return
    }
    setLoading(true)
    try {
      const dashboard = await getSeekerDashboard(token)
      setSavedIds(collectSavedJobIds(dashboard))
      setError(null)
    } catch (err) {
      console.error('Failed to load saved jobs', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [token, isAuthenticated, role])

  useEffect(() => {
    refreshSaved()
  }, [refreshSaved])

  const isSaved = (jobId) => savedIds.has(String(jobId))

  const toggleSaved = async (jobId) => {
    if (!isAuthenticated || !token) {
      return { success: false, error: 'Sign in to save jobs.' }
    }

    const strId = String(jobId)
    const wasSaved = savedIds.has(strId)

    setSavedIds((prev) => {
      const next = new Set(prev)
      if (wasSaved) next.delete(strId)
      else next.add(strId)
      return next
    })

    try {
      if (wasSaved) {
        await api(`job-seeker/jobs/${jobId}/save`, { method: 'DELETE' }, token)
      } else {
        await api(`job-seeker/jobs/${jobId}/save`, { method: 'POST' }, token)
      }
      await refreshSaved()
      return { success: true }
    } catch (err) {
      setSavedIds((prev) => {
        const next = new Set(prev)
        if (wasSaved) next.add(strId)
        else next.delete(strId)
        return next
      })
      return { success: false, error: err.message }
    }
  }

  return (
    <SavedJobsContext.Provider
      value={{ savedIds, isSaved, toggleSaved, loading, error, refreshSaved }}
    >
      {children}
    </SavedJobsContext.Provider>
  )
}

export function useSavedJobsContext() {
  const context = useContext(SavedJobsContext)
  if (!context) {
    throw new Error('useSavedJobsContext must be used within a SavedJobsProvider')
  }
  return context
}
