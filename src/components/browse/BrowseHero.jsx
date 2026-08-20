import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiBarChart2, FiBriefcase, FiClock, FiFileText, FiHome, FiStar } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import SplitHero from '../ui/SplitHero'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const applied = filtersFromSearchParams(searchParams)
  const [keyword, setKeyword] = useState(applied.keyword)
  const [location, setLocation] = useState(applied.location)

  useEffect(() => {
    setKeyword(applied.keyword)
    setLocation(applied.location)
  }, [applied.keyword, applied.location])

  const commit = (next, { scroll = true } = {}) => {
    setSearchParams(filtersToSearchParams({ ...next, page: 1 }))
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
    <SplitHero
      imageUrl={images.browseHero}
      imageAlt="Office professionals collaborating around a laptop in a bright Canadian workplace"
      imagePosition="right"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-1.5 text-xs font-semibold text-teal sm:text-sm">
        <FiStar className="h-3.5 w-3.5 text-gold" aria-hidden />
        Canada&apos;s Trusted Office Job Board
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
        Browse Office &amp; Administrative Jobs Across Canada
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Find office jobs, administrative jobs, receptionist jobs, executive assistant jobs, office
        coordinator jobs, data entry jobs, customer service office roles, and office manager jobs
        with top employers hiring across Canada.
      </p>

      <SearchBar
        keyword={keyword}
        location={location}
        onKeywordChange={setKeyword}
        onLocationChange={setLocation}
        onSubmit={handleSearch}
      />

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
    </SplitHero>
  )
}
