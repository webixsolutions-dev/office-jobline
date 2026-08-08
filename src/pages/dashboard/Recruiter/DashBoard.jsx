import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  StatCard,
  StatusBadge,
  DataState,
} from '../../../components/dashboard/common';
import { FiBriefcase, FiUsers, FiClock, FiBell } from 'react-icons/fi';

const MOCK_STATS = {
  activeJobs: 5,
  totalApplicants: 24,
  pendingReview: 3,
  unreadNotifications: 2,
};

const MOCK_RECENT_APPLICANTS = [
  {
    id: 1,
    name: 'John Doe',
    jobTitle: 'Senior React Developer',
    appliedDate: '2026-07-18T10:30:00Z',
    status: 'submitted',
  },
  {
    id: 2,
    name: 'Jane Smith',
    jobTitle: 'UX/UI Designer',
    appliedDate: '2026-07-17T14:20:00Z',
    status: 'shortlisted',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    jobTitle: 'Full Stack Developer',
    appliedDate: '2026-07-16T09:15:00Z',
    status: 'interviewing',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    jobTitle: 'Product Manager',
    appliedDate: '2026-07-15T16:45:00Z',
    status: 'viewed',
  },
];

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [isLoading] = useState(false);
  const [isError] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening with your jobs."
      />

      <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Verified
          </span>
          <p className="text-sm font-medium text-emerald-800">
            TechCorp Inc. is verified. Your jobs can go live.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        <StatCard 
          icon={FiBriefcase} 
          label="Active Jobs" 
          value={MOCK_STATS.activeJobs} 
          accent="navy"
          index={0}
        />
        <StatCard 
          icon={FiUsers} 
          label="Total Applicants" 
          value={MOCK_STATS.totalApplicants} 
          accent="gold"
          index={1}
        />
        <StatCard 
          icon={FiClock} 
          label="Pending Review" 
          value={MOCK_STATS.pendingReview} 
          accent="emerald"
          index={2}
        />
        <StatCard 
          icon={FiBell} 
          label="Unread Notifications" 
          value={MOCK_STATS.unreadNotifications} 
          accent="rose"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-display text-base font-semibold text-navy-950 mb-4">
            Recent Applicants
          </h3>
          <DataState
            isLoading={isLoading}
            isError={isError}
            isEmpty={MOCK_RECENT_APPLICANTS.length === 0}
            empty={{
              title: "No applicants yet",
              description: "Start posting jobs to receive applications."
            }}
          >
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              {MOCK_RECENT_APPLICANTS.map((applicant) => (
                <div key={applicant.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/60 transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{applicant.name}</p>
                    <p className="text-xs text-slate-500">{applicant.jobTitle}</p>
                    <p className="text-xs text-slate-400">Applied {formatDate(applicant.appliedDate)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={applicant.status} size="sm" />
                    <button
                      type="button"
                      onClick={() => navigate(`/recruiter/dashboard/jobs/${applicant.id}/applicants`)}
                      className="text-xs font-medium text-gold-600 hover:text-gold-700"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </DataState>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-navy-950 mb-4">
            Quick Actions
          </h3>
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard/jobs/new')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              <FiBriefcase className="h-4 w-4" />
              Post a New Job
            </button>
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard/jobs')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              <FiUsers className="h-4 w-4" />
              View All Jobs
            </button>
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard/company')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              <FiClock className="h-4 w-4" />
              Manage Company Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}