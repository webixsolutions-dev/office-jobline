import { Fragment } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import StepCard from '../ui/StepCard'
import { postingSteps } from '../../constants/postJobContent'

function Step({ step }) {
  return (
    <StepCard
      variant="process"
      number={step.number}
      icon={step.icon}
      title={step.title}
      description={step.description}
    />
  )
}

export default function HowPostingWorks() {
  return (
    <section className="bg-white" aria-labelledby="how-posting-works-heading">
      <div className="site-container py-16">
        <SectionHeading
          id="how-posting-works-heading"
          showIcon={false}
          title="How Posting Works"
          subtitle="Post your office or administrative job in minutes and connect with qualified professionals across Canada."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {postingSteps.map((step) => (
            <Step key={step.title} step={step} />
          ))}
        </div>

        <div className="mt-12 hidden lg:flex lg:items-stretch lg:gap-3">
          {postingSteps.map((step, index) => (
            <Fragment key={step.title}>
              <div className="min-w-0 flex-1">
                <Step step={step} />
              </div>
              {index < postingSteps.length - 1 && (
                <div className="flex shrink-0 items-center" aria-hidden>
                  <FiArrowRight className="h-5 w-5 text-teal" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
