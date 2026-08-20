import { FiBriefcase, FiSearch } from 'react-icons/fi'
import { GiMapleLeaf } from 'react-icons/gi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Button from '../ui/Button'

function ClosingWatermark() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <GiMapleLeaf className="absolute -left-8 bottom-0 h-64 w-64 text-white/5 sm:h-80 sm:w-80" />
      <svg
        viewBox="0 0 480 280"
        className="absolute right-0 top-1/2 hidden h-[140%] w-[46%] -translate-y-1/2 text-white/10 lg:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="40" y="80" width="70" height="180" />
        <rect x="120" y="40" width="90" height="220" />
        <rect x="220" y="100" width="60" height="160" />
        <rect x="290" y="20" width="80" height="240" />
        <rect x="380" y="70" width="70" height="190" />
        <path d="M330 20 L350 0 L370 20" />
      </svg>
    </div>
  )
}

export default function ContactClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <ClosingWatermark />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <HiOutlineBuildingOffice2 className="mx-auto h-10 w-10 text-gold" aria-hidden />
        <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          Office Jobline is ready to help
          <span className="mt-1 block text-gold">job seekers and employers across Canada.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-white/80 sm:text-base">
          Whether you&apos;re hiring top talent or looking for your next opportunity, we&apos;re here to
          connect you with what matters.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="outline" to="/browse" icon={FiSearch} className="w-full sm:w-auto">
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
