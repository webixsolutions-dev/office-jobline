import { useState, useEffect, useMemo } from 'react'
import { getEmployerJobs, getJobApplications } from '../../lib/jobs'
import { useAuth } from '../useAuth'

export function useJobs() {
  const { token, isAuthenticated } = useAuth()
  const [rawJobs, setRawJobs] = useState([])
  const [jobStats, setJobStats] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchJobsAndStats = async () => {
    if (!isAuthenticated || !token) {
      setRawJobs([])
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const employerJobs = await getEmployerJobs(token)
      setRawJobs(employerJobs || [])

      const statsMap = {}
      await Promise.all(
        (employerJobs || []).map(async (job) => {
          try {
            const applications = await getJobApplications(job.id, token)
            statsMap[job.id] = {
              applicationsCount: job.applications_count ?? applications?.length ?? 0,
              viewsCount: job.views_count ?? 0,
              applications: applications || [],
            }
          } catch (e) {
            console.error(`Failed to fetch stats for job ${job.id}`, e)
            statsMap[job.id] = {
              applicationsCount: job.applications_count ?? 0,
              viewsCount: job.views_count ?? 0,
              applications: [],
            }
          }
        }),
      )
      setJobStats(statsMap)
      setIsError(false)
    } catch (err) {
      console.error('Failed to load recruiter jobs', err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchJobsAndStats()
  }, [token, isAuthenticated])

  const jobs = useMemo(() => {
    return rawJobs.map((job) => {
      const stats = jobStats[job.id] || {
        applicationsCount: 0,
        viewsCount: 0,
        applications: [],
      }
      const city = job.city || ''
      const province = job.province || ''
      const location =
        city && province ? `${city}, ${province}` : job.is_remote ? 'Remote' : city || province || '—'

      return {
        id: String(job.id),
        title: job.title || 'Office Role',
        category: job.categories?.name || 'Administrative',
        category_name: job.categories?.name || 'Administrative',
        location,
        status: job.status || 'active',
        created_at: job.created_at || new Date().toISOString(),
        postedDate: job.published_at || job.created_at,
        expiryDate: job.expires_at,
        applicationsCount: stats.applicationsCount,
        viewsCount: stats.viewsCount,
        applications: stats.applications,
      }
    })
  }, [rawJobs, jobStats])

  const uniqueStatuses = useMemo(() => {
    return ['all', ...new Set(jobs.map((job) => job.status))]
  }, [jobs])

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category_name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [jobs, searchTerm, statusFilter])

  const handleDelete = async () => {
    setIsSubmitting(false)
    setShowDeleteModal(null)
  }

  const handleRetry = () => {
    fetchJobsAndStats()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusCount = (status) => {
    return jobs.filter((job) => job.status === status).length
  }

  return {
    jobs,
    filteredJobs,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    uniqueStatuses,
    isLoading,
    isError,
    isSubmitting,
    showDeleteModal,
    setShowDeleteModal,
    handleDelete,
    handleRetry,
    formatDate,
    getStatusCount,
    refetch: fetchJobsAndStats,
  }
}
