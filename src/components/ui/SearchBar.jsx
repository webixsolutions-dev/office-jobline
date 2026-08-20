import { FiSearch, FiMapPin } from 'react-icons/fi'
import Button from './Button'

/**
 * Two-field search form used in the Browse Jobs hero.
 */
export default function SearchBar({
  keyword,
  location,
  onKeywordChange,
  onLocationChange,
  onSubmit,
  keywordPlaceholder = 'Job title, keyword or company',
  locationPlaceholder = 'City, province or region',
}) {
  return (
    <form
      className="mt-8 rounded-xl bg-white p-4 shadow-card sm:p-5"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2.5">
          <FiSearch className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <label htmlFor="job-keyword" className="sr-only">
            Job title, keyword or company
          </label>
          <input
            id="job-keyword"
            type="search"
            value={keyword}
            onChange={(e) => onKeywordChange?.(e.target.value)}
            placeholder={keywordPlaceholder}
            aria-label={keywordPlaceholder}
            className="w-full bg-transparent text-sm text-navy placeholder:text-muted outline-none"
          />
        </div>
        <div className="hidden w-px bg-border lg:block" aria-hidden />
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2.5">
          <FiMapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <label htmlFor="job-location" className="sr-only">
            City, province or region
          </label>
          <input
            id="job-location"
            type="search"
            value={location}
            onChange={(e) => onLocationChange?.(e.target.value)}
            placeholder={locationPlaceholder}
            aria-label={locationPlaceholder}
            className="w-full bg-transparent text-sm text-navy placeholder:text-muted outline-none"
          />
        </div>
        <Button type="submit" variant="teal" icon={FiSearch} className="w-full shrink-0 lg:w-auto">
          Search Jobs
        </Button>
      </div>
    </form>
  )
}
