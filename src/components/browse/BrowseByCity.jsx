import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import CityCard from '../ui/CityCard'
import { cities } from '../../constants/cities'

export default function BrowseByCity() {
  return (
    <section className="bg-offwhite" aria-labelledby="browse-by-city-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading
          id="browse-by-city-heading"
          title="Browse Office Jobs by City"
          subtitle="Find office and administrative jobs in Canada's top cities."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cities.map((item) => (
            <CityCard key={item.slug} {...item} to={`/browse?city=${item.slug}`} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/browse/cities"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            View All Cities <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
