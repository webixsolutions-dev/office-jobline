import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import EmployerCard from '../ui/EmployerCard'
import { employers } from '../../constants/employers'

export default function FeaturedEmployers() {
  return (
    <section className="bg-offwhite" aria-labelledby="featured-employers-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading
          id="featured-employers-heading"
          title="Featured Employers Hiring Office Talent"
          subtitle="Trusted Canadian companies actively hiring office and administrative professionals."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {employers.map((item) => (
            <EmployerCard key={item.slug} {...item} to={`/employers/${item.slug}`} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/employers"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            View More Employers <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
