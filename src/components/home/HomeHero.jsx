import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SplitHero from '../ui/SplitHero'
import SearchBar from '../ui/SearchBar'
import { images } from '../../constants/images'

export default function HomeHero() {
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
    <SplitHero
      heading="Find Office & Administrative Jobs Across Canada"
      paragraphs={[
        'Explore office jobs, administrative jobs, receptionist jobs, executive assistant jobs, office coordinator roles, data entry jobs, customer service office roles, and more. Connect with top employers hiring across Canada today.',
      ]}
      imageUrl={images.homeHero}
      imageAlt="Office professionals collaborating around a laptop"
      imagePosition="right"
      overlay={
        <SearchBar
          keyword={query}
          location={location}
          onKeywordChange={setQuery}
          onLocationChange={setLocation}
          onSearch={handleSearch}
          className="mt-0 shadow-lg"
        />
      }
    />
  )
}
