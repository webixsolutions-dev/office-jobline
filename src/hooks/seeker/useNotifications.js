// src/hooks/seeker/useNotifications.js — no notifications API on shared backend yet
import { useMemo, useState } from 'react'

export function useSeekerNotifications() {
  const [notifications, setNotifications] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [isLoading] = useState(false)
  const [isError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read_at).length

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (filterType === 'all') return true
      return notification.entity_type === filterType
    })
  }, [notifications, filterType])

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n)),
    )
  }

  const handleMarkAllRead = async () => {
    setIsSubmitting(true)
    try {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_at: new Date().toISOString() })),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClearAll = async () => {
    setIsSubmitting(true)
    try {
      setNotifications([])
      setShowClearModal(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetry = () => {
    setNotifications([])
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return {
    notifications,
    filteredNotifications,
    filterType,
    setFilterType,
    isLoading,
    isError,
    isSubmitting,
    showClearModal,
    setShowClearModal,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllRead,
    handleClearAll,
    handleRetry,
    formatDate,
  }
}

export const useNotifications = useSeekerNotifications
