import ProcessStep from '../ui/ProcessStep'
import { images } from '../../constants/images'
import { homeSteps } from '../../constants/homeContent'

export default function HowItWorks() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white"
      aria-labelledby="how-it-works-heading"
    >
      {/* Right 50%: photo as a background, faded into the left — no boxed image */}
      <div
        className="hero-photo-fade pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-[center_25%] lg:block"
        aria-hidden
        style={{ backgroundImage: `url('${images.homeHowItWorks}')` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-[42%] hidden w-[16%] bg-gradient-to-r from-white via-white/80 to-transparent lg:block"
        aria-hidden
      />

      <div className="site-gutter relative flex min-h-[28rem] flex-col justify-center py-16 sm:min-h-[32rem] lg:min-h-[34rem] lg:py-20">
        <div className="w-full lg:max-w-[54%]">
          <h2 id="how-it-works-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">
            Get discovered. Get hired. Build your office career.
          </p>

          <div className="relative mt-10">
            <div
              className="absolute left-6 right-6 top-6 hidden border-t border-dashed border-border lg:block"
              aria-hidden
            />
            <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {homeSteps.map((step) => (
                <ProcessStep
                  key={step.title}
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="sr-only">Office team reviewing candidates together on a laptop.</p>

        <div className="relative mt-10 h-64 overflow-hidden sm:h-80 lg:hidden">
          <img
            src={images.homeHowItWorks}
            alt="Office team reviewing candidates together on a laptop"
            className="h-full w-full object-cover object-[center_25%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/20 to-transparent"
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
