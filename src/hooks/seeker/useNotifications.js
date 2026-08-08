// src/hooks/seeker/useNotifications.js
import { useState } from 'react';
import { MOCK_SEEKER_NOTIFICATIONS } from '../../data/seeker/notifications';

export function useSeekerNotifications() {
  const [notifications, setNotifications] = useState(MOCK_SEEKER_NOTIFICATIONS);
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read_at).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'all') return true;
    return notification.entity_type === filterType;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      )
    );
  };

  const handleMarkAllRead = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev =>
        prev.map(n => ({ ...n, read_at: new Date().toISOString() }))
      );
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAll = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications([]);
      setShowClearModal(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setIsError(false);
    setIsLoading(true);
    setTimeout(() => {
      setNotifications(MOCK_SEEKER_NOTIFICATIONS);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return diffMins + 'm ago';
    if (diffHours < 24) return diffHours + 'h ago';
    if (diffDays < 7) return diffDays + 'd ago';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return {
    notifications,
    filteredNotifications,
    filterType,
    setFilterType,
    isLoading,
    isError,
    isSubmitting,
    showClearModal,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllRead,
    handleClearAll,
    handleRetry,
    formatDate,
    setShowClearModal,
  };
}


export { useSeekerNotifications as useNotifications };