import { FiBell, FiCheck, FiXCircle } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import { DataState, ConfirmModal } from '../../components/dashboard/common'
import { useSeekerNotifications } from '../../hooks/seeker/useNotifications'
import { NotificationFilters, NotificationList } from '../../components/dashboard/Notifications'

export default function NotificationsPage() {
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
  } = useSeekerNotifications()

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
      />

      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-surface-alt)] disabled:opacity-50"
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

      <NotificationFilters filterType={filterType} onFilterChange={setFilterType} />

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
          description: 'No notifications to show right now.',
        }}
      >
        <NotificationList
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkAsRead}
          formatDate={formatDate}
        />
      </DataState>

      {!isLoading && !isError && filteredNotifications.length > 0 && (
        <div className="mt-4 text-sm text-[var(--color-text-secondary)]">
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
  )
}
