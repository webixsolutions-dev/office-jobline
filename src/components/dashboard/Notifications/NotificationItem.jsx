// src/components/dashboard/pages/Notifications/NotificationFilters.jsx

export default function NotificationFilters({ filterType, onFilterChange }) {
  const getFilterButtonClass = (filter) => {
    return `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      filterType === filter
        ? 'bg-navy-950 text-white'
        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
    }`;
  };

  // Hardcoded notification types to avoid import issues
  const NOTIFICATION_TYPES = {
    all: 'All Notifications',
    application: 'Applications',
    job: 'Jobs',
    company: 'Company',
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.entries(NOTIFICATION_TYPES).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onFilterChange(key)}
          className={getFilterButtonClass(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}