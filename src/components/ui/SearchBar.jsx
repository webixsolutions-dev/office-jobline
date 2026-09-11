import { useId } from 'react'
import { FiSearch, FiMapPin } from 'react-icons/fi'
import Button from './Button'

/**
 * Two-field search form used in the Home overlay and Browse Jobs hero.
 * @param {string} [keyword]
 * @param {string} [location]
 * @param {(value: string) => void} [onKeywordChange]
 * @param {(value: string) => void} [onLocationChange]
 * @param {() => void} [onSubmit]
 * @param {(payload: { query: string, location: string }) => void} [onSearch]
 * @param {string} [className]
 * @param {import('react').ReactNode} [children] Optional row under the fields (e.g. filter pills)
 * @param {boolean} [flush] Divider-only fields, matching the Browse Jobs mockup
 */
export default function SearchBar({
  keyword,
  location,
  onKeywordChange,
  onLocationChange,
  onSubmit,
  onSearch,
  keywordPlaceholder = 'Job title, keyword or company',
  locationPlaceholder = 'City, province or region',
  className = 'mt-8',
  children,
  flush = false,
}) {
  const uid = useId()
  const keywordId = `${uid}-keyword`
  const locationId = `${uid}-location`
  const fieldClass = flush
    ? 'flex flex-1 items-center gap-2 px-1 py-1.5'
    : 'flex flex-1 items-center gap-2 rounded-lg border border-border px-3 py-2.5'

  return (
    <form
      className={`rounded-xl bg-white p-4 shadow-card sm:p-5 ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
        onSearch?.({ query: keyword || '', location: location || '' })
      }}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <div className={fieldClass}>
          <FiSearch className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <label htmlFor={keywordId} className="sr-only">
            Job title, keyword or company
          </label>
          <input
            id={keywordId}
            type="search"
            value={keyword}
            onChange={(e) => onKeywordChange?.(e.target.value)}
            placeholder={keywordPlaceholder}
            aria-label={keywordPlaceholder}
            className="w-full bg-transparent text-sm text-navy placeholder:text-muted outline-none"
          />
        </div>
        <div className="hidden w-px bg-border lg:block" aria-hidden />
        <div className={fieldClass}>
          <FiMapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <label htmlFor={locationId} className="sr-only">
            City, province or region
          </label>
          <input
            id={locationId}
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
      {children}
    </form>
  )
}
