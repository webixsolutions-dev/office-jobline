import { useState, useEffect, useMemo } from 'react'
import { getMyApplications } from '../../lib/jobs'
import { mapSeekerApplication } from '../../lib/mappers'
import { useAuth } from '../useAuth'

export function useApplications() {
  const { token, isAuthenticated } = useAuth()
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showWithdrawModal, setShowWithdrawModal] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchApps = async () => {
    if (!isAuthenticated || !token) {
      setApplications([])
      setIsLoading(false)
      return
    }
    setIsLoading(true)
    try {
      const data = await getMyApplications(token)
      setApplications((data || []).map((row) => mapSeekerApplication(row)))
      setIsError(false)
    } catch (err) {
      console.error('Failed to fetch applications', err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApps()
  }, [token, isAuthenticated])

  const uniqueStatuses = useMemo(() => {
    return ['all', ...new Set(applications.map((app) => app.apiStatus || app.status))]
  }, [applications])

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || app.apiStatus === statusFilter || app.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [applications, searchTerm, statusFilter])

  const canWithdraw = () => false

  const handleWithdraw = (applicationId) => {
    setShowWithdrawModal(applicationId)
  }

  const confirmWithdraw = async () => {
    setShowWithdrawModal(null)
  }

  const cancelWithdraw = () => {
    setShowWithdrawModal(null)
  }

  const handleRetry = () => {
    fetchApps()
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return {
    applications,
    filteredApplications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    uniqueStatuses,
    isLoading,
    isError,
    isSubmitting,
    showWithdrawModal,
    handleWithdraw,
    confirmWithdraw,
    cancelWithdraw,
    handleRetry,
    formatDate,
    canWithdraw,
  }
}
