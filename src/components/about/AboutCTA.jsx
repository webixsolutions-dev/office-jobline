import { FiSearch, FiBriefcase } from 'react-icons/fi'
import { GiMapleLeaf } from 'react-icons/gi'
import Button from '../ui/Button'

function SkylineGraphic() {
  return (
    <svg
      viewBox="0 0 480 280"
      className="pointer-events-none absolute right-0 top-1/2 hidden h-[140%] w-[46%] -translate-y-1/2 text-white/10 lg:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="40" y="80" width="70" height="180" />
      <rect x="120" y="40" width="90" height="220" />
      <rect x="220" y="100" width="60" height="160" />
      <rect x="290" y="20" width="80" height="240" />
      <rect x="380" y="70" width="70" height="190" />
      <path d="M330 20 L350 0 L370 20" />
    </svg>
  )
}

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <SkylineGraphic />
      <div className="site-gutter relative mx-auto max-w-4xl py-16 text-center lg:py-20">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Ready to Find Office Opportunities or Hire Great Talent?
        </h2>
        <GiMapleLeaf className="mx-auto mt-5 h-5 w-5 text-gold" aria-hidden />
        <p className="mx-auto mt-5 max-w-2xl text-sm text-white/80 sm:text-base">
          Join thousands of office professionals and employers building successful careers and
          teams across Canada.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="teal" to="/browse" icon={FiSearch} className="w-full sm:w-auto">
            Browse Jobs
          </Button>
          <Button variant="gold" to="/post-a-job" icon={FiBriefcase} className="w-full sm:w-auto">
            Post a Job
          </Button>
        </div>
      </div>
    </section>
  )
}
