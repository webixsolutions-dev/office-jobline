export default function LoadingState({ variant = 'table', rows = 4, className = '' }) {
  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 py-14 ${className}`}>
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy-900/15 border-t-navy-900" />
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  if (variant === 'stats') {
    return (
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-4 ${className}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-3 w-16 rounded bg-slate-200" />
            <div className="mt-3 h-6 w-10 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'cards') {
    return (
      <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="animate-pulse rounded-xl border border-slate-200 bg-white p-6">
            <div className="h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-1/2 rounded bg-slate-200" />
            <div className="mt-6 h-3 w-full rounded bg-slate-100" />
            <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className={`flex animate-pulse items-center gap-4 px-5 py-4 ${
            index !== rows - 1 ? 'border-b border-slate-100' : ''
          }`}
        >
          <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded bg-slate-200" />
            <div className="h-2.5 w-1/5 rounded bg-slate-100" />
          </div>
          <div className="h-5 w-20 shrink-0 rounded-full bg-slate-100" />
        </div>
      ))}
    </div>
  );
}