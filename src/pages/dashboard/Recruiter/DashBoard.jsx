import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  StatCard,
  StatusBadge,
  DataState,
} from '../../../components/dashboard/common';
import { FiBriefcase, FiUsers, FiClock, FiBell } from 'react-icons/fi';
import { useJobs } from '../../../hooks/recruiter/useJobs';
import { useAuth } from '../../../hooks/useAuth';

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { jobs, isLoading, isError } = useJobs();

  // Aggregate stats dynamically
  const activeJobsCount = useMemo(() => 
    jobs.filter(j => j.status === 'active' || j.status === 'published').length, 
    [jobs]
  );
  
  const totalApplicants = useMemo(() => 
    jobs.reduce((sum, j) => sum + (j.applicationsCount || 0), 0), 
    [jobs]
  );

  const recentApplicants = useMemo(() => {
    const list = [];
    jobs.forEach(job => {
      if (job.applications) {
        job.applications.forEach(app => {
          list.push({
            id: app.id,
            name: app.full_name || app.name || 'Anonymous Seeker',
            jobTitle: job.title,
            appliedDate: app.created_at || app.createdAt || new Date().toISOString(),
            status: app.status || 'submitted',
          });
        });
      }
    });
    return list.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)).slice(0, 4);
  }, [jobs]);

  const pendingReviewCount = useMemo(() => {
    let count = 0;
    jobs.forEach(job => {
      if (job.applications) {
        count += job.applications.filter(app => app.status === 'submitted' || app.status === 'pending').length;
      }
    });
    return count;
  }, [jobs]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const companyName = user?.company_name || 'Your Company';
  const isVerified = user?.company_verification_status === 'verified';

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening with your jobs."
      />

      <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {isVerified ? 'Verified' : 'Pending Verification'}
          </span>
          <p className="text-sm font-medium text-emerald-800">
            {companyName} status: {isVerified ? 'Verified. Your jobs can go live.' : 'Review pending.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-6">
        <StatCard 
          icon={FiBriefcase} 
          label="Active Jobs" 
          value={activeJobsCount} 
          accent="navy"
          index={0}
        />
        <StatCard 
          icon={FiUsers} 
          label="Total Applicants" 
          value={totalApplicants} 
          accent="gold"
          index={1}
        />
        <StatCard 
          icon={FiClock} 
          label="Pending Review" 
          value={pendingReviewCount} 
          accent="emerald"
          index={2}
        />
        <StatCard 
          icon={FiBell} 
          label="Unread Notifications" 
          value={0} 
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
            isEmpty={recentApplicants.length === 0}
            empty={{
              title: "No applicants yet",
              description: "Start posting jobs to receive applications."
            }}
          >
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
              {recentApplicants.map((applicant) => (
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
                      onClick={() => navigate('/recruiter/applicants')}
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
              onClick={() => navigate('/recruiter/jobs/new')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              <FiBriefcase className="h-4 w-4" />
              Post a New Job
            </button>
            <button
              type="button"
              onClick={() => navigate('/recruiter/jobs')}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              <FiUsers className="h-4 w-4" />
              View All Jobs
            </button>
            <button
              type="button"
              onClick={() => navigate('/recruiter/company')}
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