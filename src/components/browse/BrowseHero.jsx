import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiBarChart2, FiBriefcase, FiClock, FiFileText, FiHome, FiStar } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import SearchBar from '../ui/SearchBar'
import FilterPill from '../ui/FilterPill'
import { images } from '../../constants/images'
import {
  HERO_PILLS,
  filtersFromSearchParams,
  filtersToSearchParams,
  scrollToJobListings,
  toggleListValue,
} from '../../lib/jobFilters'

const pillIcons = {
  'full-time': FiBriefcase,
  'part-time': FiClock,
  remote: FiHome,
  hybrid: HiOutlineBuildingOffice2,
  'entry-level': FiBarChart2,
  contract: FiFileText,
}

export default function BrowseHero() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const applied = filtersFromSearchParams(searchParams)
  const [keyword, setKeyword] = useState(applied.keyword)
  const [location, setLocation] = useState(applied.location)

  useEffect(() => {
    setKeyword(applied.keyword)
    setLocation(applied.location)
  }, [applied.keyword, applied.location])

  const commit = (next, { scroll = true } = {}) => {
    const query = filtersToSearchParams({ ...next, page: 1 }).toString()
    navigate({ pathname: '/browse', search: query ? `?${query}` : '' }, { preventScrollReset: true })
    if (scroll) {
      requestAnimationFrame(() => scrollToJobListings())
    }
  }

  const handleSearch = () => {
    commit({ ...applied, keyword, location })
  }

  const handlePill = (pill) => {
    commit({
      ...applied,
      [pill.key]: toggleListValue(applied[pill.key], pill.slug),
    })
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-offwhite"
      aria-labelledby="browse-hero-heading"
    >
      {/* Right 50%: photo as a background, fully clear — same treatment as Home */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center lg:block"
        aria-hidden
        style={{ backgroundImage: `url('${images.browseHero}')` }}
      />

      <div className="relative mx-auto flex min-h-[28rem] max-w-7xl flex-col justify-center px-4 py-14 sm:min-h-[32rem] sm:px-6 lg:min-h-[34rem] lg:px-8 lg:py-16">
        <div className="max-w-xl lg:max-w-[32rem]">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-1.5 text-xs font-semibold text-teal sm:text-sm">
            <FiStar className="h-3.5 w-3.5 text-gold" aria-hidden />
            Canada&apos;s Trusted Office Job Board
          </span>
          <h1
            id="browse-hero-heading"
            className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl"
          >
            Browse Office &amp; Administrative Jobs Across Canada
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Find office jobs, administrative jobs, receptionist jobs, executive assistant jobs, office
            coordinator jobs, data entry jobs, customer service office roles, and office manager jobs
            with top employers hiring across Canada.
          </p>
        </div>

        <p className="sr-only">
          Office professionals collaborating around a laptop in a bright Canadian workplace.
        </p>

        {/* Floats across the 50/50 seam, overlapping copy + photo like the mockup */}
        <div className="relative z-10 mt-8 w-full max-w-xl lg:max-w-[52rem] xl:max-w-[56rem]">
          <SearchBar
            keyword={keyword}
            location={location}
            onKeywordChange={setKeyword}
            onLocationChange={setLocation}
            onSubmit={handleSearch}
            flush
            className="mt-0 shadow-lg"
          >
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted sm:text-sm">Filter by:</span>
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

        <div className="relative mt-10 h-64 overflow-hidden sm:h-80 lg:hidden">
          <img
            src={images.browseHero}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
