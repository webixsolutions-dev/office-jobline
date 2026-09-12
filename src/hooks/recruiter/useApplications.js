import { useState, useEffect, useMemo } from 'react'
import { getRecruiterApplications } from '../../lib/jobs'
import { mapRecruiterApplicant } from '../../lib/mappers'
import { useAuth } from '../useAuth'

export function useApplications(jobId) {
  const { token, isAuthenticated } = useAuth()
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchApplicants = async () => {
    if (!isAuthenticated || !token) {
      setApplicants([])
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const data = await getRecruiterApplications(token, { pageSize: 100 })
      let items = (data?.items || []).map(mapRecruiterApplicant)
      if (jobId) {
        items = items.filter((a) => a.jobId === String(jobId))
      }
      setApplicants(items)
      setIsError(false)
    } catch (err) {
      console.error('Failed to load applications', err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicants()
  }, [token, isAuthenticated, jobId])

  const filteredApplicants = useMemo(() => applicants, [applicants])

  return {
    applicants: filteredApplicants,
    isLoading,
    isError,
    refetch: fetchApplicants,
  }
}
