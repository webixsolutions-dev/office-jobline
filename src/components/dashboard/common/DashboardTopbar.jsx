import { FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

export default function DashboardTopbar({
  onMenuClick,
  title,
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
  const navigate = useNavigate();
  const userName = user?.name || '';
  const userSubtitle = user?.subtitle || '';

  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    } else {
      navigate('/profile');
    }
  };

  const handleProfile = () => {
    if (onProfile) {
      onProfile();
    } else {
      navigate('/dashboard/profile');
    }
  };

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      navigate('/dashboard/notifications');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        {title && (
          <h2 className="truncate font-display text-sm font-semibold text-navy-900 sm:text-base">
            {title}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <NotificationBell
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkRead={onMarkRead}
          onMarkAllRead={onMarkAllRead}
          onViewAll={handleViewAll}
        />
        <span className="h-6 w-px bg-slate-200" />
        <UserMenu
          name={userName}
          subtitle={userSubtitle}
          onProfile={handleProfile}
          onSettings={handleSettings}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}