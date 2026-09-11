import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  StatCard,
  StatusBadge,
  DataState,
  VerificationBanner,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { FiFileText, FiBookmark, FiBell } from 'react-icons/fi';
import { useAuth } from '../../../hooks/useAuth';
import { useApplications } from '../../../hooks/seeker/useApplications';
import { useSavedJobs } from '../../../hooks/seeker/useSavedJobs';

export default function DashBoard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { applications, isLoading, isError } = useApplications();
  const { savedJobs } = useSavedJobs();
  const [showConfirm, setShowConfirm] = useState(false);

  const notificationsCount = 0;

  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'Job Seeker';

  return (
    <>
      <PageHeader 
        title={`Welcome back, ${firstName}`} 
        subtitle="Here's what's happening with your job search." 
      />

      <VerificationBanner status="pending" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-6">
        <StatCard icon={FiFileText} label="Applications" value={applications.length} />
        <StatCard icon={FiBookmark} label="Saved Jobs" value={savedJobs.length} accent="gold" />
        <StatCard icon={FiBell} label="Unread Notifications" value={notificationsCount} accent="emerald" />
      </div>

      <DataState
        isLoading={isLoading}
        isError={isError}
        isEmpty={applications.length === 0}
        empty={{ title: "You haven't applied to any jobs yet." }}
      >
        <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100">
          {applications.map((app) => (
            <div key={app.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-navy-900">{app.job_title}</p>
                <p className="text-xs text-slate-500">{app.company_name}</p>
              </div>
              <StatusBadge status={app.status} />
            </div>
          ))}
        </div>
      </DataState>

      <ConfirmModal
        isOpen={showConfirm}
        title="Withdraw application?"
        description="You can't undo this."
        danger
        onConfirm={() => setShowConfirm(false)}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
}