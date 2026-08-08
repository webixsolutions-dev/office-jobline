import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PageHeader,
  DataState,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { FiSearch, FiEye, FiDownload } from 'react-icons/fi';

const MOCK_APPLICANTS = [
  {
    id: 1,
    name: 'John Doe',
    headline: 'Senior React Developer',
    appliedDate: '2026-07-18T10:30:00Z',
    site: 'Office Jobline',
    status: 'submitted',
    resume: 'John_Doe_Resume.pdf',
  },
  {
    id: 2,
    name: 'Jane Smith',
    headline: 'UX/UI Designer',
    appliedDate: '2026-07-17T14:20:00Z',
    site: 'Partner Site A',
    status: 'viewed',
    resume: 'Jane_Smith_Resume.pdf',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    headline: 'Full Stack Developer',
    appliedDate: '2026-07-16T09:15:00Z',
    site: 'Office Jobline',
    status: 'shortlisted',
    resume: 'Mike_Johnson_Resume.pdf',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    headline: 'Product Manager',
    appliedDate: '2026-07-15T16:45:00Z',
    site: 'Partner Site B',
    status: 'interviewing',
    resume: 'Sarah_Williams_Resume.pdf',
  },
  {
    id: 5,
    name: 'David Brown',
    headline: 'DevOps Engineer',
    appliedDate: '2026-07-14T11:00:00Z',
    site: 'Office Jobline',
    status: 'rejected',
    resume: 'David_Brown_Resume.pdf',
  },
];

const STATUS_OPTIONS = [
  'submitted',
  'viewed',
  'shortlisted',
  'interviewing',
  'offered',
  'hired',
  'rejected',
];

export default function Applicants() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState(MOCK_APPLICANTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.headline.toLowerCase().includes(searchTerm.toLowerCase());
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

  return (
    <>
      <PageHeader 
        title="Applicants" 
        subtitle="Manage all applicants for this job position"
      >
        <button
          type="button"
          onClick={() => navigate('/recruiter/dashboard/jobs')}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
        >
          Back to Jobs
        </button>
      </PageHeader>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or headline..."
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
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <DataState
        isLoading={isLoading}
        isError={isError}
        isEmpty={filteredApplicants.length === 0}
        onRetry={handleRetry}
        loadingVariant="table"
        loadingRows={4}
        empty={{
          title: "No applicants yet",
          description: "Start promoting your job to attract candidates.",
        }}
      >
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Headline
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applied Via
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredApplicants.map((applicant) => (
                  <tr key={applicant.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-navy-950">{applicant.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{applicant.headline}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{applicant.site}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{formatDate(applicant.appliedDate)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={applicant.status}
                        onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                        className="px-2 py-1 text-xs font-medium rounded-md border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent bg-white"
                      >
                        {STATUS_OPTIONS.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-sm text-gold-600 hover:text-gold-700 transition-colors"
                      >
                        <FiEye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="text-slate-400 hover:text-navy-600 transition-colors"
                          title="View Profile"
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="text-slate-400 hover:text-navy-600 transition-colors"
                          title="Download Resume"
                        >
                          <FiDownload className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DataState>
    </>
  );
}