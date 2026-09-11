import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiFilter, FiX } from 'react-icons/fi'
import DashboardTopBanner from '../../components/dashboard/DashboardTopBanner'
import SearchBar from '../../components/ui/SearchBar'
import FilterPill from '../../components/ui/FilterPill'
import FilterSidebar from '../../components/ui/FilterSidebar'
import JobCard from '../../components/ui/JobCard'
import Pagination from '../../components/ui/Pagination'
import { useServiceCareJobs } from '../../hooks/useServiceCareJobs'
import { useDashboardData } from '../../lib/DashboardDataContext'
import {
  HERO_PILLS,
  JOB_LISTINGS_ID,
  SORT_OPTIONS,
  applyJobFilters,
  emptyFilters,
  filtersFromSearchParams,
  filtersToSearchParams,
  paginate,
  toggleListValue,
} from '../../lib/jobFilters'
import { FiBarChart2, FiBriefcase, FiClock, FiFileText, FiHome } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'

const pillIcons = {
  'full-time': FiBriefcase,
  'part-time': FiClock,
  remote: FiHome,
  hybrid: HiOutlineBuildingOffice2,
  'entry-level': FiBarChart2,
  contract: FiFileText,
}

export default function FindJobsPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const applied = filtersFromSearchParams(searchParams)
  const [draft, setDraft] = useState(applied)
  const [keyword, setKeyword] = useState(applied.keyword)
  const [location, setLocation] = useState(applied.location)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const isFirstLoad = useRef(true)

  const { jobs: apiJobs, loading, error } = useServiceCareJobs({ limit: 100 })
  const { isJobApplied, isJobSaved, applyToJob, toggleSaveJob } = useDashboardData()

  useEffect(() => {
    setDraft(filtersFromSearchParams(searchParams))
    setKeyword(applied.keyword)
    setLocation(applied.location)
  }, [searchParams, applied.keyword, applied.location])

  useEffect(() => {
    const hasQuery = Boolean(searchParams.toString())
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      if (!hasQuery) return
    }
    document.getElementById(JOB_LISTINGS_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [searchParams])

  const commit = (next, { closeDrawer = true } = {}) => {
    const query = filtersToSearchParams(next).toString()
    navigate({ pathname: '/dashboard/find-jobs', search: query ? `?${query}` : '' }, { preventScrollReset: true })
    if (closeDrawer) setDrawerOpen(false)
  }

  const handleSearch = () => {
    commit({ ...applied, keyword, location, page: 1 })
  }

  const handlePill = (pill) => {
    commit({
      ...applied,
      [pill.key]: toggleListValue(applied[pill.key], pill.slug),
    })
  }

  const filtered = applyJobFilters(apiJobs || [], applied)
  const { items, total, pageCount, page } = paginate(filtered, applied.page, applied.perPage)

  const sidebar = (
    <FilterSidebar
      draft={draft}
      onDraftChange={(next) => {
        setDraft(next)
        if (!drawerOpen) commit({ ...next, page: 1 }, { closeDrawer: false })
      }}
      onApply={() => commit({ ...draft, page: 1 })}
      onReset={() => {
        setDraft(emptyFilters)
        commit(emptyFilters)
      }}
    />
  )

  return (
    <>
      <DashboardTopBanner
        eyebrow="Newcomer Jobline Dashboard"
        title="Find Jobs"
        subtitle="Search and apply to office jobs across Canada."
      />

      <div className="mb-6">
        <SearchBar
          keyword={keyword}
          location={location}
          onKeywordChange={setKeyword}
          onLocationChange={setLocation}
          onSubmit={handleSearch}
          flush
          className="shadow-[var(--shadow-card)]"
        >
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-text-secondary)] sm:text-sm">Filter by:</span>
            {HERO_PILLS.map((pill) => (
              <FilterPill
                key={pill.slug + pill.key}
                icon={pillIcons[pill.slug]}
                label={pill.label}
                active={applied[pill.key].includes(pill.slug)}
                onClick={() => handlePill(pill)}
              />
            ))}
          </div>
        </SearchBar>
      </div>

      <section id={JOB_LISTINGS_ID} className="scroll-mt-6">
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] shadow-[var(--shadow-card)]"
          >
            <FiFilter aria-hidden />
            Filter Jobs
          </button>
        </div>

        {drawerOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-[var(--color-navy-overlay)]"
              aria-label="Close filters"
              onClick={() => setDrawerOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[min(100%,22rem)] overflow-y-auto bg-[var(--color-bg-page)] p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-display font-bold text-[var(--color-text-primary)]">Filters</p>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close filter panel">
                  <FiX className="h-6 w-6 text-[var(--color-text-primary)]" />
                </button>
              </div>
              <FilterSidebar
                idPrefix="mobile-"
                draft={draft}
                onDraftChange={setDraft}
                onApply={() => commit({ ...draft, page: 1 })}
                onReset={() => {
                  setDraft(emptyFilters)
                  commit(emptyFilters)
                }}
              />
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">{sidebar}</div>
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base font-bold text-[var(--color-teal)]" aria-live="polite">
                {total.toLocaleString('en-CA')} jobs found
              </p>
              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="dashboard-sort-by" className="text-[var(--color-text-secondary)]">
                  Sort by:
                </label>
                <select
                  id="dashboard-sort-by"
                  value={applied.sort}
                  onChange={(e) => commit({ ...applied, sort: e.target.value, page: 1 })}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-teal)]"
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
              <p className="mt-8 text-center text-[var(--color-text-secondary)]">Loading jobs...</p>
            ) : error ? (
              <p className="mt-8 text-center text-[var(--status-error)]">{error}</p>
            ) : items.length === 0 ? (
              <p className="mt-8 rounded-xl bg-white p-8 text-center text-[var(--color-text-secondary)] shadow-[var(--shadow-card)]">
                No jobs match these filters. Try clearing a filter or searching a different city.
              </p>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {items.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isApplied={isJobApplied(job.id)}
                    isSaved={isJobSaved(job.id)}
                    onApply={() => applyToJob(job)}
                    onSaveToggle={() => toggleSaveJob(job)}
                  />
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
          </div>
        </div>
      </section>
    </>
  )
}
