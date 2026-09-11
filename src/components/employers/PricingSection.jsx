import { GiMapleLeaf } from 'react-icons/gi'
import SectionHeading from '../ui/SectionHeading'
import PricingCard from '../ui/PricingCard'
import TestimonialCard from '../ui/TestimonialCard'
import { employerPricingPlans } from '../../constants/pricingPlans'
import { employerTestimonials } from '../../constants/employerTestimonials'

export default function PricingSection() {
  return (
    <section className="bg-offwhite" aria-labelledby="employer-pricing-heading" id="employer-pricing">
      <div className="site-container py-16">
        <SectionHeading
          id="employer-pricing-heading"
          showIcon={false}
          title="Simple Pricing for Office Hiring"
          subtitle="Choose the right plan to hire office staff, administrative professionals, and support teams across Canada. Transparent pricing. No hidden fees. Cancel anytime."
        />

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {employerPricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              tagline={plan.tagline}
              features={plan.features}
              ctaLabel={plan.ctaLabel}
              ctaTo={plan.ctaTo}
              featured={plan.isFeatured}
            />
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-2xl bg-white px-6 py-12 sm:px-10">
          <GiMapleLeaf
            className="pointer-events-none absolute bottom-4 right-4 h-28 w-28 text-teal/10"
            aria-hidden
          />
          <SectionHeading
            as="h3"
            showIcon={false}
            title="Trusted by Canadian Employers"
            subtitle="Join thousands of organizations that trust Office Jobline to hire top office talent."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {employerTestimonials.map((item) => (
              <TestimonialCard
                key={item.companyName}
                variant="company"
                quote={item.quote}
                name={item.companyName}
                location={item.location}
                companyLogo={item.companyLogo}
                logoClassName={item.logoClassName}
              />
            ))}
          </div>

          <p className="relative mt-8 text-center text-sm text-navy">
            Hire with confidence. Post jobs, connect with qualified office professionals, and grow
            your business across Canada.
          </p>
        </div>
      </div>
    </section>
  )
}
