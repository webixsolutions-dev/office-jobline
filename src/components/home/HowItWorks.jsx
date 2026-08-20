import { Fragment } from 'react'
import ProcessStep from '../ui/ProcessStep'
import { images } from '../../constants/images'
import { homeSteps } from '../../constants/homeContent'

export default function HowItWorks() {
  return (
    <section className="bg-offwhite" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <h2 id="how-it-works-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Get discovered. Get hired. Build your office career.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:flex lg:items-start">
              {homeSteps.map((step, i) => (
                <Fragment key={step.title}>
                  <ProcessStep
                    number={step.number}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    className="lg:min-w-0 lg:flex-1"
                  />
                  {i < homeSteps.length - 1 && (
                    <div
                      className="mt-6 hidden w-8 shrink-0 border-t border-dashed border-border lg:block"
                      aria-hidden
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>

          <div className="h-64 w-full overflow-hidden rounded-xl sm:h-80 lg:h-auto lg:min-h-[400px]">
            <img
              src={images.homeHowItWorks}
              alt="Office team reviewing candidates together on a laptop"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
