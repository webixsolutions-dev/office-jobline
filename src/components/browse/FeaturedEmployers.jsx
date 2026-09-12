import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import EmployerCard from '../ui/EmployerCard'
import { getPublicCompanies } from '../../lib/jobs'

export default function FeaturedEmployers() {
  const [employers, setEmployers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getPublicCompanies()
      .then((items) => {
        if (!active) return
        setEmployers(
          (items || []).slice(0, 6).map((c) => ({
            slug: c.id,
            name: c.name,
            logo: c.logo_path,
            industry: 'Office & Admin',
            openJobs: 0,
          })),
        )
      })
      .catch(() => {
        if (active) setEmployers([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  if (!loading && employers.length === 0) {
    return null
  }

  return (
    <section className="bg-offwhite" aria-labelledby="featured-employers-heading">
      <div className="site-container pb-16">
        <SectionHeading
          id="featured-employers-heading"
          title="Featured Employers Hiring Office Talent"
          subtitle="Trusted Canadian companies actively hiring office and administrative professionals."
        />
        {loading ? (
          <p className="mt-10 text-center text-sm text-muted">Loading employers…</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {employers.map((item) => (
              <EmployerCard key={item.slug} {...item} to={`/employers/${item.slug}`} />
            ))}
          </div>
        )}
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
