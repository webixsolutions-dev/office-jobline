import { FiInbox } from 'react-icons/fi';

export default function EmptyState({
  icon: Icon = FiInbox,
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white px-6 py-14 text-center ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900/5">
        <Icon className="h-6 w-6 text-navy-600" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-slate-500">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-md bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gold-500 hover:text-navy-950"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}