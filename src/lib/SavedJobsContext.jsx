// src/lib/SavedJobsContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from './api';
import { useAuth } from './auth';

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setSavedIds(new Set());
      return;
    }

    const fetchSavedJobs = async () => {
      setLoading(true);
      try {
        const data = await api('/v1/me/saved-jobs', { method: 'GET' }, token);
        const ids = new Set(data.map(item => String(item.job_id || item.jobId)));
        setSavedIds(ids);
      } catch (err) {
        console.error('Failed to load saved jobs', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [token, isAuthenticated]);

  const isSaved = (jobId) => savedIds.has(String(jobId));

  const toggleSaved = async (jobId) => {
    if (!isAuthenticated || !token) {
      return { success: false, error: 'Unauthorized' };
    }

    const strId = String(jobId);
    const wasSaved = savedIds.has(strId);
    
    // Optimistic Update
    setSavedIds(prev => {
      const next = new Set(prev);
      if (wasSaved) {
        next.delete(strId);
      } else {
        next.add(strId);
      }
      return next;
    });

    try {
      if (wasSaved) {
        await api(`/v1/me/saved-jobs/${jobId}`, { method: 'DELETE' }, token);
      } else {
        await api(`/v1/me/saved-jobs/${jobId}`, {
          method: 'POST',
          body: JSON.stringify({}),
        }, token);
      }
      return { success: true };
    } catch (err) {
      console.error('Failed to toggle saved job', err);
      // Rollback on failure
      setSavedIds(prev => {
        const next = new Set(prev);
        if (wasSaved) {
          next.add(strId);
        } else {
          next.delete(strId);
        }
        return next;
      });
      return { success: false, error: err.message };
    }
  };

  return (
    <SavedJobsContext.Provider value={{ savedIds, isSaved, toggleSaved, loading, error }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobsContext() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobsContext must be used within a SavedJobsProvider');
  }
  return context;
}
