import { useState } from 'react';
import { MOCK_JOBS } from '../../../data/recruiter/jobs';

export function useJobs() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const uniqueStatuses = ['all', ...new Set(jobs.map(job => job.status))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.category_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setJobs(prev => prev.filter(job => job.id !== showDeleteModal));
      setShowDeleteModal(null);
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
      setJobs(MOCK_JOBS);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusCount = (status) => {
    return jobs.filter(job => job.status === status).length;
  };

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
  };
}