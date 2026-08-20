import { FiHeadphones } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import PricingCard from '../ui/PricingCard'
import TestimonialCard from '../ui/TestimonialCard'
import PromoBanner from '../ui/PromoBanner'
import { postJobPlans, postJobTestimonials, SALES_TO } from '../../constants/postJobContent'

export default function PricingPlans() {
  return (
    <section className="bg-offwhite" id="pricing" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          id="pricing-heading"
          showIcon={false}
          title="Choose a Posting Plan"
          subtitle="Select the plan that best fits your hiring needs. All plans include easy job posting, applicant management, and access to top office talent across Canada."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
          {postJobPlans.map((plan) => (
            <PricingCard
              key={plan.slug}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              tagline={plan.tagline}
              features={plan.features}
              ctaLabel={plan.ctaLabel}
              ctaTo={`/post-a-job/create?plan=${plan.slug}`}
              highlighted={plan.highlighted}
              accent="gold"
            />
          ))}
        </div>

        <h3 className="mt-16 text-center font-display text-2xl font-bold text-navy sm:text-3xl">
          Trusted by Employers Across Canada
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {postJobTestimonials.map((item) => (
            <TestimonialCard
              key={item.name}
              quote={item.quote}
              name={item.name}
              location={item.location}
              avatar={item.avatar}
              showRating={false}
            />
          ))}
        </div>

        <div className="mt-8">
          <PromoBanner
            theme="neutral"
            icon={FiHeadphones}
            heading="Need help choosing the right plan?"
            subtitle="Contact our team and we'll help you find the best solution for your hiring goals."
            ctaLabel="Contact Sales"
            ctaTo={SALES_TO}
          />
        </div>
      </div>
    </section>
  )
}
