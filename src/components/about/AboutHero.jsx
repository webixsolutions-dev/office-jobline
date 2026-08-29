import { FiArrowRight } from 'react-icons/fi'
import Button from '../ui/Button'
import { images } from '../../constants/images'

export default function AboutHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-offwhite"
      aria-labelledby="about-hero-heading"
    >
      {/* Right 50%: photo as a background, fully clear — same as Home */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center lg:block"
        aria-hidden
        style={{ backgroundImage: `url('${images.aboutHero}')` }}
      />

      <div className="site-gutter relative flex min-h-[28rem] flex-col justify-center py-14 sm:min-h-[32rem] lg:min-h-[34rem] lg:py-20">
        <div className="max-w-xl lg:max-w-[32rem]">
          <h1
            id="about-hero-heading"
            className="font-display text-4xl font-bold leading-tight text-navy sm:text-5xl"
          >
            About Office Jobline
          </h1>
          <p className="mt-4 text-lg font-semibold text-teal">
            Connecting office talent with opportunities across Canada.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Office Jobline is Canada&apos;s dedicated platform for office and administrative
            professionals and the employers who hire them.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We make it easy to discover rewarding careers, connect with trusted employers, and
            build stronger teams—from coast to coast to coast.
          </p>
          <div className="mt-8">
            <Button variant="teal" href="#our-mission" icon={FiArrowRight} iconPosition="right">
              Our Mission
            </Button>
          </div>
        </div>

        <p className="sr-only">Office professionals collaborating around a laptop</p>

        <div className="relative mt-10 h-64 overflow-hidden sm:h-80 lg:hidden">
          <img
            src={images.aboutHero}
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
