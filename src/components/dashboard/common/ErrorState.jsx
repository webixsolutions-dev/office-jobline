import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

export default function ErrorState({
  title = 'Something went wrong',
  message = "We couldn't load this data. Please try again.",
  onRetry,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-rose-100 bg-rose-50/50 px-6 py-14 text-center ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
        <FiAlertTriangle className="h-6 w-6 text-rose-600" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:border-navy-900 hover:bg-navy-900 hover:text-white"
        >
          <FiRefreshCw className="h-4 w-4" />
          Retry
        </button>
      )}
    </div>
  );
}