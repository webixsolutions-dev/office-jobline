import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  StatusBadge,
  DataState,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { FiPlus, FiSearch, FiEdit, FiEye, FiX, FiRefreshCw } from 'react-icons/fi';

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior React Developer',
    category: 'Technology',
    location: 'Toronto, ON',
    status: 'active',
    applicantCount: 12,
    postedDate: '2026-07-01T10:00:00Z',
    expiryDate: '2026-08-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    category: 'Design',
    location: 'Remote',
    status: 'pending_review',
    applicantCount: 5,
    postedDate: '2026-07-10T10:00:00Z',
    expiryDate: '2026-08-10T10:00:00Z',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    category: 'Technology',
    location: 'Montreal, QC',
    status: 'active',
    applicantCount: 8,
    postedDate: '2026-06-15T10:00:00Z',
    expiryDate: '2026-07-15T10:00:00Z',
  },
  {
    id: 4,
    title: 'Product Manager',
    category: 'Management',
    location: 'Vancouver, BC',
    status: 'expired',
    applicantCount: 3,
    postedDate: '2026-05-01T10:00:00Z',
    expiryDate: '2026-06-01T10:00:00Z',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    category: 'Technology',
    location: 'Remote',
    status: 'closed',
    applicantCount: 6,
    postedDate: '2026-04-15T10:00:00Z',
    expiryDate: '2026-05-15T10:00:00Z',
  },
];

export default function MyJobs() {
  const navigate = useNavigate();
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
                         job.category.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <>
      <PageHeader 
        title="My Jobs" 
        subtitle="Manage all your job postings in one place"
      >
        <button
          type="button"
          onClick={() => navigate('/recruiter/dashboard/jobs/new')}
          className="inline-flex items-center gap-2 rounded-md bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          <FiPlus className="h-4 w-4" />
          Post a Job
        </button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white min-w-[160px] text-sm"
        >
          <option value="all">All Status ({jobs.length})</option>
          {uniqueStatuses.filter(s => s !== 'all').map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')} ({getStatusCount(status)})
            </option>
          ))}
        </select>
      </div>

      <DataState
        isLoading={isLoading}
        isError={isError}
        isEmpty={filteredJobs.length === 0}
        onRetry={handleRetry}
        loadingVariant="table"
        loadingRows={4}
        empty={{
          title: "You haven't posted any jobs yet",
          description: "Start posting jobs to find the perfect candidates!",
          actionLabel: 'Post a Job',
          onAction: () => navigate('/recruiter/dashboard/jobs/new'),
        }}
      >
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Job Details
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applicants
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-navy-950">{job.title}</span>
                        <span className="text-xs text-slate-500">Expires: {formatDate(job.expiryDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{job.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{job.location}</span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={job.status} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-navy-950">{job.applicantCount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{formatDate(job.postedDate)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/recruiter/dashboard/jobs/${job.id}/applicants`)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors"
                          title="View Applicants"
                        >
                          <FiEye className="h-4 w-4" />
                          View Applicants
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/recruiter/dashboard/jobs/${job.id}/edit`)}
                          className="text-slate-400 hover:text-navy-600 transition-colors"
                          title="Edit Job"
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                        {job.status !== 'closed' && job.status !== 'expired' && (
                          <button
                            type="button"
                            onClick={() => setShowDeleteModal(job.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Job"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        )}
                        {job.status === 'expired' && (
                          <button
                            type="button"
                            className="text-slate-400 hover:text-emerald-600 transition-colors"
                            title="Renew Job"
                          >
                            <FiRefreshCw className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DataState>

      <ConfirmModal
        isOpen={!!showDeleteModal}
        title="Delete Job Posting?"
        description="This action cannot be undone. All applicants and data associated with this job will be permanently removed."
        confirmLabel="Delete Job"
        danger={true}
        isSubmitting={isSubmitting}
        onConfirm={handleDelete}
        onClose={() => setShowDeleteModal(null)}
      />
    </>
  );
}