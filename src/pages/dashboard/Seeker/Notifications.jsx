import { useNavigate } from 'react-router-dom';
import { FiBell, FiCheck, FiXCircle } from 'react-icons/fi';
import {
  PageHeader,
  DataState,
  ConfirmModal,
} from '../../../components/dashboard/common';
import { useSeekerNotifications } from '../../../hooks/seeker/useNotifications';
import { NotificationFilters, NotificationList } from '../../../components/dashboard/Notifications';

export default function Notifications() {
  const {
    filteredNotifications,
    notifications,
    filterType,
    setFilterType,
    isLoading,
    isError,
    isSubmitting,
    showClearModal,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllRead,
    handleClearAll,
    handleRetry,
    formatDate,
    setShowClearModal,
  } = useSeekerNotifications();

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

      <NotificationFilters
        filterType={filterType}
        onFilterChange={setFilterType}
      />

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
        <NotificationList
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkAsRead}
          formatDate={formatDate}
        />
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