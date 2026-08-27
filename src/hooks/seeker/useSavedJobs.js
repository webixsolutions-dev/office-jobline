// src/hooks/seeker/useSavedJobs.js
import { useState, useMemo } from 'react';
import { useSavedJobsContext } from '../../lib/SavedJobsContext';
import { useServiceCareJobs } from '../useServiceCareJobs';

export function useSavedJobs() {
  const { savedIds, toggleSaved, loading: contextLoading, error: contextError } = useSavedJobsContext();
  const { jobs: allJobs, loading: jobsLoading, error: jobsError } = useServiceCareJobs({ limit: 100 });
  const [searchTerm, setSearchTerm] = useState('');
  const [showRemoveModal, setShowRemoveModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derive savedJobs from savedIds and allJobs
  const savedJobs = useMemo(() => {
    return allJobs.filter(job => savedIds.has(String(job.id))).map(job => ({
      id: job.id,
      job_id: job.id,
      job: {
        id: job.id,
        title: job.title,
        company_name: job.company,
        location: job.location,
        type: job.type,
        salaryLabel: job.salaryLabel,
        postedDate: job.postedDate,
        status: 'active',
      }
    }));
  }, [allJobs, savedIds]);

  const filteredJobs = useMemo(() => {
    return savedJobs.filter(item => {
      const matchesSearch = item.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [savedJobs, searchTerm]);

  const handleRemove = (jobId) => {
    setShowRemoveModal(jobId);
  };

  const confirmRemove = async () => {
    setIsSubmitting(true);
    try {
      await toggleSaved(showRemoveModal);
      setShowRemoveModal(null);
    } catch (error) {
      console.error('Failed to remove saved job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelRemove = () => {
    setShowRemoveModal(null);
  };

  const handleRetry = () => {
    // Handled dynamically
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
    if (jobStatus === 'expired') return 'Expired';
    if (jobStatus === 'closed') return 'Closed';
    if (jobStatus === 'removed') return 'Removed';
    return null;
  };

  const isLoading = contextLoading || jobsLoading;
  const isError = !!(contextError || jobsError);

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