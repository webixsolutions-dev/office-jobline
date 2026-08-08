import { FiFilter } from 'react-icons/fi';
import FilterChip from './FilterChip';
import { APPLICATION_STATUSES } from '../../../data/shared/constants';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  ...APPLICATION_STATUSES.map(status => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
  }))
];

export default function ApplicationFilters({
  statusFilter,
  onStatusChange,
  getStatusCount,
  showFilters,
  onToggleFilters,
  totalCount,
}) {
  return (
    <>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onToggleFilters}
          className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
            showFilters || statusFilter !== 'all'
              ? 'border-gold-500 bg-gold-50 text-gold-700'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FiFilter className="h-4 w-4" />
          Filters
          {statusFilter !== 'all' && (
            <span className="ml-1 rounded-full bg-gold-500 px-1.5 py-0.5 text-xs text-white">
              1
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => {
              const count = option.value === 'all'
                ? totalCount
                : getStatusCount(option.value);
              
              return (
                <FilterChip
                  key={option.value}
                  label={option.label}
                  count={count}
                  isActive={statusFilter === option.value}
                  onClick={() => onStatusChange(option.value)}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}