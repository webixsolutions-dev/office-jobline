import NotificationItem from './NotificationItem';

export default function NotificationList({
  notifications,
  onMarkAsRead,
  formatDate,
}) {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500">No notifications found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="divide-y divide-slate-100">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
}