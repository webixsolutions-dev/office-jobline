import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBell, FiCheck } from 'react-icons/fi';

export default function NotificationBell({
  notifications = [],
  unreadCount = 0,
  onMarkRead,
  onMarkAllRead,
  onViewAll,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const preview = notifications.slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return '';
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-navy-900"
      >
        <FiBell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-navy-950">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-navy-950">Notifications</p>
              {unreadCount > 0 && onMarkAllRead && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="flex items-center gap-1 text-xs font-semibold text-gold-700 hover:text-gold-600"
                >
                  <FiCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {preview.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-slate-400">
                  You're all caught up.
                </p>
              ) : (
                preview.map((notification) => {
                  const isUnread = !notification.read_at;
                  const message = notification.payload?.message || notification.type || '';
                  
                  return (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => onMarkRead && onMarkRead(notification.id)}
                      className={`flex w-full items-start gap-3 border-b border-slate-50 px-4 py-3 text-left transition last:border-0 hover:bg-slate-50 ${
                        isUnread ? 'bg-gold-500/5' : ''
                      }`}
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          isUnread ? 'bg-gold-500' : 'bg-transparent'
                        }`}
                      />
                      <span className="flex-1">
                        <span
                          className={`block text-sm ${
                            isUnread ? 'font-semibold text-navy-900' : 'text-slate-600'
                          }`}
                        >
                          {message}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-400">
                          {formatDate(notification.created_at)}
                        </span>
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {onViewAll && (
              <button
                type="button"
                onClick={onViewAll}
                className="block w-full border-t border-slate-100 py-2.5 text-center text-xs font-semibold text-navy-700 hover:bg-slate-50"
              >
                View all notifications
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}