import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = false,
  isSubmitting = false,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/60 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full ${
                  danger ? 'bg-rose-100 text-rose-600' : 'bg-navy-900/5 text-navy-700'
                }`}
              >
                <FiAlertTriangle className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <FiX className="h-4.5 w-4.5" />
              </button>
            </div>

            <h3 className="mt-4 font-display text-base font-semibold text-navy-950">
              {title}
            </h3>
            {description && (
              <p className="mt-2 text-sm text-slate-500">
                {description}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={onConfirm}
                className={`rounded-md px-4 py-2 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  danger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-navy-950 hover:bg-navy-800'
                }`}
              >
                {isSubmitting ? 'Please wait...' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}