import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiBarChart2, FiBriefcase, FiClock, FiFileText, FiHome } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import SearchBar from '../ui/SearchBar'
import FilterPill from '../ui/FilterPill'
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

export default function BrowseSearch() {
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
    <section className="bg-offwhite" aria-label="Search jobs">
      <div className="site-container pb-10">
        <SearchBar
          keyword={keyword}
          location={location}
          onKeywordChange={setKeyword}
          onLocationChange={setLocation}
          onSubmit={handleSearch}
          flush
          className="mt-0 shadow-card"
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
    </section>
  )
}
