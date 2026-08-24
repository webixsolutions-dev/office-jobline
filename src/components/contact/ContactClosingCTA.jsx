import { FiBriefcase, FiSearch } from 'react-icons/fi'
import { GiMapleLeaf } from 'react-icons/gi'
import Button from '../ui/Button'
import { images } from '../../constants/images'

export default function ContactClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <img
        src={images.contactHero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-navy/80" aria-hidden />
      <GiMapleLeaf
        className="pointer-events-none absolute -left-10 bottom-0 h-72 w-72 text-white/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Office Jobline is ready to help{' '}
          <span className="text-gold">job seekers and employers across Canada.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-white/90 sm:text-base">
          Whether you&apos;re hiring top talent or looking for your next opportunity, we&apos;re here to
          connect you with what matters.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="outline-navy" to="/browse" icon={FiSearch} className="w-full border-0 sm:w-auto">
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
