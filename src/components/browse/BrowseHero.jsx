import { FiStar } from 'react-icons/fi'
import { images } from '../../constants/images'

export default function BrowseHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-offwhite"
      aria-labelledby="browse-hero-heading"
    >
      {/* Right 50%: photo as a background, fully clear — same treatment as Home */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center lg:block"
        aria-hidden
        style={{ backgroundImage: `url('${images.browseHero}')` }}
      />

      <div className="site-gutter relative flex min-h-[28rem] flex-col justify-center py-14 sm:min-h-[32rem] lg:min-h-[34rem] lg:py-16">
        <div className="max-w-xl lg:max-w-[32rem]">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-1.5 text-xs font-semibold text-teal sm:text-sm">
            <FiStar className="h-3.5 w-3.5 text-gold" aria-hidden />
            Canada&apos;s Trusted Office Job Board
          </span>
          <h1
            id="browse-hero-heading"
            className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl"
          >
            Browse Office &amp; Administrative Jobs Across Canada
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Find office jobs, administrative jobs, receptionist jobs, executive assistant jobs, office
            coordinator jobs, data entry jobs, customer service office roles, and office manager jobs
            with top employers hiring across Canada.
          </p>
        </div>

        <p className="sr-only">
          Office professionals collaborating around a laptop in a bright Canadian workplace.
        </p>

        <div className="relative mt-10 h-64 overflow-hidden sm:h-80 lg:hidden">
          <img
            src={images.browseHero}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
