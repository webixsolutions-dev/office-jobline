import { FiSearch } from 'react-icons/fi'
import Input from '../ui/Input'

const STATUS_OPTIONS = ['All', 'Active', 'Draft', 'Closed']

export default function JobPostingsFilterBar({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text-primary)]"
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt === 'All' ? 'All statuses' : opt}
          </option>
        ))}
      </select>
      <div className="flex-1">
        <Input
          name="search"
          icon={FiSearch}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by job title…"
          aria-label="Search job postings"
        />
      </div>
    </div>
  )
}

export { STATUS_OPTIONS }
