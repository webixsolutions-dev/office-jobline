import { useState } from 'react';
import { MOCK_APPLICANTS } from '../../../data/recruiter/applicants';

const STATUS_OPTIONS = [
  'submitted',
  'viewed',
  'shortlisted',
  'interviewing',
  'offered',
  'hired',
  'rejected',
];

export function useApplicants() {
  const [applicants, setApplicants] = useState(MOCK_APPLICANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.applicant_headline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants(prev =>
      prev.map(app =>
        app.id === applicantId ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleRetry = () => {
    setIsError(false);
    setIsLoading(true);
    setTimeout(() => {
      setApplicants(MOCK_APPLICANTS);
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

  return {
    applicants,
    filteredApplicants,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isLoading,
    isError,
    handleStatusChange,
    handleRetry,
    formatDate,
    STATUS_OPTIONS,
  };
}