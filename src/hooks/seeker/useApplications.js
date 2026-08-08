import { useState } from 'react';
import { MOCK_APPLICATIONS, FINAL_STATES } from '../../data/seeker/applications'

export function useApplications() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(null);

  const uniqueStatuses = ['all', ...new Set(applications.map(app => app.status))];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const canWithdraw = (status) => !FINAL_STATES.includes(status);

  const handleWithdraw = (applicationId) => {
    setShowWithdrawModal(applicationId);
  };

  const confirmWithdraw = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApplications(prev =>
        prev.map(app =>
          app.id === showWithdrawModal
            ? { ...app, status: 'withdrawn' }
            : app
        )
      );
      setShowWithdrawModal(null);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelWithdraw = () => {
    setShowWithdrawModal(null);
  };

  const handleRetry = () => {
    setIsError(false);
    setIsLoading(true);
    setTimeout(() => {
      setApplications(MOCK_APPLICATIONS);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getJobStatusDisplay = (jobStatus) => {
    if (jobStatus === 'expired') {
      return 'Expired';
    }
    if (jobStatus === 'closed') {
      return 'Closed';
    }
    if (jobStatus === 'removed') {
      return 'Removed';
    }
    return null;
  };

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
    getJobStatusDisplay,
    canWithdraw,
  };
}