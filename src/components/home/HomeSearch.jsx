import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../ui/SearchBar'

export default function HomeSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = ({ query: keyword, location: city }) => {
    const params = new URLSearchParams()
    if (keyword?.trim()) params.set('q', keyword.trim())
    if (city?.trim()) params.set('location', city.trim())
    const qs = params.toString()
    navigate(qs ? `/jobs?${qs}` : '/jobs')
  }

  return (
    <section className="bg-offwhite" aria-label="Search jobs">
      <div className="site-container pb-10">
        <SearchBar
          keyword={query}
          location={location}
          onKeywordChange={setQuery}
          onLocationChange={setLocation}
          onSearch={handleSearch}
          className="mt-0 shadow-card"
        />
      </div>
    </section>
  )
}
