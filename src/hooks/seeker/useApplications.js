// src/hooks/seeker/useApplications.js
import { useState, useEffect, useMemo } from 'react';
import { getMyApplications } from '../../lib/jobs';
import { useAuth } from '../useAuth';
import { useServiceCareJobs } from '../useServiceCareJobs';

export function useApplications() {
  const { token, isAuthenticated } = useAuth();
  const { jobs: allJobs, loading: jobsLoading } = useServiceCareJobs({ limit: 100 });
  const [rawApps, setRawApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showWithdrawModal, setShowWithdrawModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchApps = async () => {
    if (!isAuthenticated || !token) {
      setRawApps([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const data = await getMyApplications(token);
      setRawApps(data || []);
      setIsError(false);
    } catch (err) {
      console.error('Failed to fetch applications', err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [token, isAuthenticated]);

  // Combine raw application rows with job details
  const applications = useMemo(() => {
    return rawApps.map(app => {
      const matchedJob = allJobs.find(j => String(j.id) === String(app.job_id || app.jobId));
      return {
        id: String(app.id),
        job_id: app.job_id || app.jobId,
        status: app.status || 'submitted',
        created_at: app.created_at || app.createdAt,
        job_title: matchedJob ? matchedJob.title : 'Office Professional',
        company_name: matchedJob ? matchedJob.company : 'Enterprise Corp',
      };
    });
  }, [rawApps, allJobs]);

  const uniqueStatuses = useMemo(() => {
    return ['all', ...new Set(applications.map(app => app.status))];
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.company_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const canWithdraw = (status) => {
    const FINAL_STATES = ['withdrawn', 'rejected', 'hired'];
    return !FINAL_STATES.includes(status);
  };

  const handleWithdraw = (applicationId) => {
    setShowWithdrawModal(applicationId);
  };

  const confirmWithdraw = async () => {
    setIsSubmitting(true);
    try {
      // Perform local state update for withdrawal state simulation
      await new Promise(resolve => setTimeout(resolve, 800));
      setRawApps(prev => prev.map(app => 
        String(app.id) === String(showWithdrawModal) ? { ...app, status: 'withdrawn' } : app
      ));
      setShowWithdrawModal(null);
    } catch (error) {
      console.error('Failed to withdraw application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelWithdraw = () => {
    setShowWithdrawModal(null);
  };

  const handleRetry = () => {
    fetchApps();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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

  const loadingState = isLoading || jobsLoading;

  return {
    applications,
    filteredApplications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    uniqueStatuses,
    isLoading: loadingState,
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