// src/hooks/useServiceCareJobs.js
import { useState, useEffect } from 'react'
import { getPublicJobs, getPublicCategories, normalizeJob } from '../lib/jobs'

export function useServiceCareJobs(query = {}) {
  const [jobs, setJobs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const queryKey = JSON.stringify(query)

  useEffect(() => {
    let active = true
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [jobsResponse, rawCats] = await Promise.all([
          getPublicJobs({ limit: query.limit ?? 100, ...query }),
          getPublicCategories(),
        ])
        if (active) {
          const rawJobs = jobsResponse?.items ?? jobsResponse ?? []
          const normalized = (Array.isArray(rawJobs) ? rawJobs : []).map((j) =>
            normalizeJob(j, rawCats),
          )
          setJobs(normalized)
          setCategories(rawCats || [])
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    fetchData()
    return () => {
      active = false
    }
  }, [queryKey])

  return { jobs, categories, loading, error }
}
