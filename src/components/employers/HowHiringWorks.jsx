import { Fragment } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import StepCard from '../ui/StepCard'
import { hiringSteps } from '../../constants/hiringSteps'

export default function HowHiringWorks() {
  return (
    <section className="bg-white" aria-labelledby="how-hiring-works-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-3 h-1 w-12 bg-gold" aria-hidden />
        <SectionHeading
          id="how-hiring-works-heading"
          showIcon={false}
          title="How Hiring Works"
          subtitle="Simple steps to find the right office and administrative talent in Canada."
        />

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-stretch md:gap-3">
          {hiringSteps.map((step, index) => (
            <Fragment key={step.title}>
              <div className="flex-1">
                <StepCard
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              </div>
              {index < hiringSteps.length - 1 && (
                <div className="hidden shrink-0 items-center md:flex" aria-hidden>
                  <FiChevronRight className="h-6 w-6 text-border" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
