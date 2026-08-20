import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { PER_PAGE_OPTIONS } from '../../lib/jobFilters'

function pageItems(page, pageCount) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }
  const items = [1]
  if (page > 3) items.push('ellipsis-start')
  const start = Math.max(2, page - 1)
  const end = Math.min(pageCount - 1, page + 1)
  for (let n = start; n <= end; n += 1) items.push(n)
  if (page < pageCount - 2) items.push('ellipsis-end')
  items.push(pageCount)
  return items
}

/**
 * Page number row, prev/next, and per-page selector.
 */
export default function Pagination({ page, pageCount, perPage, onPageChange, onPerPageChange }) {
  const items = pageItems(page, pageCount)

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      <nav aria-label="Job results pages" className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted hover:border-navy disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <FiChevronLeft />
        </button>
        {items.map((item) => {
          if (typeof item === 'string') {
            return (
              <span key={item} className="flex h-9 w-9 items-center justify-center text-sm text-muted">
                …
              </span>
            )
          }
          const isActive = item === page
          return (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(item)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                isActive ? 'bg-teal text-white' : 'border border-border text-navy hover:border-teal'
              }`}
            >
              {item}
            </button>
          )
        })}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-navy hover:border-navy disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <FiChevronRight />
        </button>
      </nav>

      <div className="flex items-center gap-2 text-sm text-muted">
        <label htmlFor="per-page">Show:</label>
        <select
          id="per-page"
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-navy outline-none focus:border-teal"
        >
          {PER_PAGE_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
