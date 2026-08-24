import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const search = (
    <SearchBar
      keyword={query}
      location={location}
      onKeywordChange={setQuery}
      onLocationChange={setLocation}
      onSearch={handleSearch}
      className="mt-0 shadow-lg"
    />
  )

  return (
    <section className="relative isolate overflow-hidden bg-offwhite" aria-labelledby="home-hero-heading">
      {/* Right 50%: photo as a background, fully clear — no boxed image column */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center lg:block"
        aria-hidden
        style={{ backgroundImage: `url('${images.homeHero}')` }}
      />

      <div className="relative mx-auto flex min-h-[28rem] max-w-7xl flex-col justify-center px-4 py-14 sm:min-h-[32rem] sm:px-6 lg:min-h-[34rem] lg:px-8 lg:py-20">
        <div className="max-w-xl lg:max-w-[32rem]">
          <h1
            id="home-hero-heading"
            className="font-display text-4xl font-bold leading-tight text-navy sm:text-5xl"
          >
            Find Office &amp; Administrative Jobs Across Canada
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Explore office jobs, administrative jobs, receptionist jobs, executive assistant jobs,
            office coordinator roles, data entry jobs, customer service office roles, and more.
            Connect with top employers hiring across Canada today.
          </p>
        </div>

        <p className="sr-only">
          Office professionals collaborating around a laptop in a bright workplace.
        </p>

        <div className="relative z-10 mt-8 w-full max-w-xl lg:max-w-[46rem]">{search}</div>

        {/* Mobile / tablet: photo below copy */}
        <div className="relative mt-10 h-64 overflow-hidden sm:h-80 lg:hidden">
          <img
            src={images.homeHero}
            alt="Office professionals collaborating around a laptop"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
