import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiFilter, FiX } from 'react-icons/fi'
import { GiMapleLeaf } from 'react-icons/gi'
import FilterSidebar from '../ui/FilterSidebar'
import JobCard from '../ui/JobCard'
import Pagination from '../ui/Pagination'
import { useServiceCareJobs } from '../../hooks/useServiceCareJobs'
import {
  JOB_LISTINGS_ID,
  SORT_OPTIONS,
  applyJobFilters,
  emptyFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
  paginate,
} from '../../lib/jobFilters'

export default function JobListings() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const applied = filtersFromSearchParams(searchParams)
  const [draft, setDraft] = useState(applied)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isFirstLoad = useRef(true)

  const { jobs: apiJobs, loading, error } = useServiceCareJobs({ limit: 100 })

  useEffect(() => {
    setDraft(filtersFromSearchParams(searchParams))
  }, [searchParams])

  useEffect(() => {
    const hasQuery = Boolean(searchParams.toString())
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      if (!hasQuery) return
    }
    document.getElementById(JOB_LISTINGS_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [searchParams])

  useEffect(() => {
    if (!drawerOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  const filtered = applyJobFilters(apiJobs || [], applied)
  const { items, total, pageCount, page } = paginate(filtered, applied.page, applied.perPage)

  const commit = (next, { closeDrawer = true } = {}) => {
    const query = filtersToSearchParams(next).toString()
    navigate({ pathname: '/browse', search: query ? `?${query}` : '' }, { preventScrollReset: true })
    if (closeDrawer) setDrawerOpen(false)
  }

  const handleDraftChange = (next) => {
    setDraft(next)
    if (!drawerOpen) {
      commit({ ...next, page: 1 }, { closeDrawer: false })
    }
  }

  const handleApply = () => {
    commit({ ...draft, page: 1 })
  }

  const handleReset = () => {
    setDraft(emptyFilters)
    commit(emptyFilters)
  }

  const sidebar = (
    <FilterSidebar draft={draft} onDraftChange={handleDraftChange} onApply={handleApply} onReset={handleReset} />
  )
  const mobileSidebar = (
    <FilterSidebar
      idPrefix="mobile-"
      draft={draft}
      onDraftChange={setDraft}
      onApply={handleApply}
      onReset={handleReset}
    />
  )

  return (
    <section id={JOB_LISTINGS_ID} className="scroll-mt-24 bg-offwhite" aria-labelledby="listings-heading">
      <div className="site-container py-8">
        <h2 id="listings-heading" className="sr-only">
          Job listings
        </h2>

        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <FiFilter aria-hidden />
            Filter Jobs
          </button>
        </div>

        {drawerOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-navy/40"
              aria-label="Close filters"
              onClick={() => setDrawerOpen(false)}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-filter-title"
              className="absolute inset-y-0 left-0 w-[min(100%,22rem)] overflow-y-auto bg-offwhite p-4 shadow-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p id="mobile-filter-title" className="font-display font-bold text-navy">
                  Filters
                </p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-md p-1 text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  aria-label="Close filter panel"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              {mobileSidebar}
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">{sidebar}</div>

          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base font-bold text-teal" aria-live="polite">
                {total.toLocaleString('en-CA')} jobs found
              </p>
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="sort-by" className="text-muted">
                  Sort by:
                </label>
                <select
                  id="sort-by"
                  value={applied.sort}
                  onChange={(e) => commit({ ...applied, sort: e.target.value, page: 1 })}
                  className="rounded-lg border border-border px-3 py-2 text-sm text-navy outline-none focus:border-teal"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <p className="mt-8 text-center text-muted" aria-live="polite">Loading jobs...</p>
            ) : error ? (
              <p className="mt-8 text-center text-rose-600" aria-live="assertive">{error}</p>
            ) : items.length === 0 ? (
              <p className="mt-8 rounded-xl bg-white p-8 text-center text-muted shadow-card">
                No jobs match these filters. Try clearing a filter or searching a different city.
              </p>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {items.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {items.length > 0 && (
              <Pagination
                page={page}
                pageCount={pageCount}
                perPage={applied.perPage}
                onPageChange={(nextPage) => commit({ ...applied, page: nextPage })}
                onPerPageChange={(perPage) => commit({ ...applied, perPage, page: 1 })}
              />
            )}

            <p className="mt-6 text-center text-sm text-muted">
              Browse office and administrative jobs across Canada. New opportunities added daily.{' '}
              <GiMapleLeaf className="inline h-3.5 w-3.5 text-gold" aria-hidden />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

