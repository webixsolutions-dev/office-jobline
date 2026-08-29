import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import ErrorBoundary from './ErrorBoundary';

export default function DashboardLayout({
  role = 'job_seeker',
  basePath = '/dashboard',
  companyVerification,
  pageTitle,
  user = { name: '', subtitle: '' },
  notifications = [],
  unreadCount = 0,
  onMarkRead,
  onMarkAllRead,
  onViewAll,
  onProfile,
  onSettings,
  onLogout,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const safeUser = {
    name: user?.name || '',
    subtitle: user?.subtitle || '',
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#f7f8fb]">
        <DashboardSidebar
          role={role}
          basePath={basePath}
          companyVerification={companyVerification}
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="flex min-h-screen flex-col lg:pl-64">
          <DashboardTopbar
            onMenuClick={() => setMobileOpen(true)}
            title={pageTitle}
            user={safeUser}
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkRead={onMarkRead}
            onMarkAllRead={onMarkAllRead}
            onViewAll={onViewAll}
            onProfile={onProfile}
            onSettings={onSettings}
            onLogout={onLogout}
          />

          <main className="site-container flex-1 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}