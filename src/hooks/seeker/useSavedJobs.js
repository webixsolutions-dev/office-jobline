// src/pages/seeker/hooks/useSavedJobs.js
import { useState } from 'react';
import { MOCK_SAVED_JOBS } from '../../data/seeker/savedJobs';

export function useSavedJobs() {
  const [savedJobs, setSavedJobs] = useState(MOCK_SAVED_JOBS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(null);

  const filteredJobs = savedJobs.filter(item => {
    const matchesSearch = item.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleRemove = (jobId) => {
    setShowRemoveModal(jobId);
  };

  const confirmRemove = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSavedJobs(prev => prev.filter(item => item.job_id !== showRemoveModal));
      setShowRemoveModal(null);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelRemove = () => {
    setShowRemoveModal(null);
  };

  const handleRetry = () => {
    setIsError(false);
    setIsLoading(true);
    setTimeout(() => {
      setSavedJobs(MOCK_SAVED_JOBS);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
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
    savedJobs,
    filteredJobs,
    searchTerm,
    setSearchTerm,
    isLoading,
    isError,
    isSubmitting,
    showRemoveModal,
    handleRemove,
    confirmRemove,
    cancelRemove,
    handleRetry,
    formatDate,
    getJobStatusDisplay,
  };
}