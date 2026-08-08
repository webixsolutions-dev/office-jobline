import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  DataState,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { 
  FiBell, 
  FiCheck, 
  FiCheckCircle, 
  FiClock,
  FiBriefcase,
  FiUser,
  FiFileText,
  FiStar,
  FiCalendar,
  FiAward,
  FiXCircle,
} from 'react-icons/fi';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'job.new_applicant',
    message: 'New applicant for Senior React Developer position',
    read_at: null,
    created_at: '2026-07-18T10:30:00Z',
    entity_type: 'job',
    entity_id: 'JOB-001',
    icon: FiUser,
  },
  {
    id: 2,
    type: 'company.verified',
    message: 'Your company verification was approved',
    read_at: null,
    created_at: '2026-07-18T08:15:00Z',
    entity_type: 'company',
    entity_id: 'COM-001',
    icon: FiCheckCircle,
  },
  {
    id: 3,
    type: 'job.expiring',
    message: 'Your job "Senior React Developer" is expiring soon',
    read_at: null,
    created_at: '2026-07-17T16:45:00Z',
    entity_type: 'job',
    entity_id: 'JOB-001',
    icon: FiCalendar,
  },
  {
    id: 4,
    type: 'application.status_changed',
    message: 'John Doe applied for UX/UI Designer position',
    read_at: '2026-07-17T14:20:00Z',
    created_at: '2026-07-17T13:00:00Z',
    entity_type: 'application',
    entity_id: 'APP-004',
    icon: FiFileText,
  },
  {
    id: 5,
    type: 'job.active',
    message: 'Your job "Full Stack Developer" is now active',
    read_at: '2026-07-16T09:00:00Z',
    created_at: '2026-07-16T08:00:00Z',
    entity_type: 'job',
    entity_id: 'JOB-003',
    icon: FiBriefcase,
  },
  {
    id: 6,
    type: 'application.status_changed',
    message: 'Mike Johnson was shortlisted for Product Manager',
    read_at: '2026-07-15T11:30:00Z',
    created_at: '2026-07-15T10:00:00Z',
    entity_type: 'application',
    entity_id: 'APP-006',
    icon: FiStar,
  },
  {
    id: 7,
    type: 'company.rejected',
    message: 'Your company verification was rejected - Please update your documents',
    read_at: '2026-07-14T16:00:00Z',
    created_at: '2026-07-14T15:00:00Z',
    entity_type: 'company',
    entity_id: 'COM-001',
    icon: FiXCircle,
  },
];

const NOTIFICATION_TYPES = {
  all: 'All Notifications',
  application: 'Applications',
  job: 'Jobs',
  company: 'Company',
};

export default function RecruiterNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const unreadCount = notifications.filter(n => !n.read_at).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'all') return true;
    return notification.entity_type === filterType;
  });

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      )
    );
  };

  const handleMarkAllRead = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev => 
        prev.map(n => ({ ...n, read_at: new Date().toISOString() }))
      );
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAll = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications([]);
      setShowClearModal(false);
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
      setNotifications(MOCK_NOTIFICATIONS);
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return diffMins + 'm ago';
    if (diffHours < 24) return diffHours + 'h ago';
    if (diffDays < 7) return diffDays + 'd ago';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getFilterButtonClass = (filter) => {
    return 'px-4 py-2 text-sm font-medium rounded-lg transition-colors ' +
      (filterType === filter
        ? 'bg-navy-950 text-white'
        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200');
  };

  return (
    <>
      <PageHeader 
        title="Notifications" 
        subtitle={unreadCount + ' unread notification' + (unreadCount !== 1 ? 's' : '')}
      >
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <FiCheck className="h-4 w-4" />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearModal(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
            >
              <FiXCircle className="h-4 w-4" />
              Clear all
            </button>
          )}
        </div>
      </PageHeader>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(NOTIFICATION_TYPES).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilterType(key)}
            className={getFilterButtonClass(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <DataState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && filteredNotifications.length === 0}
        onRetry={handleRetry}
        loadingVariant="table"
        loadingRows={5}
        empty={{
          icon: FiBell,
          title: "You're all caught up",
          description: "No notifications to show right now.",
        }}
      >
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => {
              const isUnread = !notification.read_at;
              const Icon = notification.icon || FiBell;

              return (
                <div
                  key={notification.id}
                  className={'flex items-start gap-4 px-5 py-4 transition-colors ' +
                    (isUnread ? 'bg-gold-500/5 hover:bg-gold-500/10' : 'hover:bg-slate-50/50')}
                >
                  <div className={'flex-shrink-0 mt-1 ' +
                    (isUnread ? 'text-gold-600' : 'text-slate-400')}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={'text-sm ' + (isUnread ? 'font-semibold text-navy-950' : 'text-slate-600')}>
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(notification.created_at)}
                        </p>
                      </div>
                      {isUnread && (
                        <button
                          type="button"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="flex-shrink-0 text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DataState>

      {!isLoading && !isError && filteredNotifications.length > 0 && (
        <div className="mt-4 text-sm text-slate-500">
          Showing {filteredNotifications.length} of {notifications.length} notifications
        </div>
      )}

      <ConfirmModal
        isOpen={showClearModal}
        title="Clear all notifications?"
        description="This action cannot be undone. All notifications will be permanently removed."
        confirmLabel="Clear all"
        danger={true}
        isSubmitting={isSubmitting}
        onConfirm={handleClearAll}
        onClose={() => setShowClearModal(false)}
      />
    </>
  );
}