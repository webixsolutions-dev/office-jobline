import IconTextCard from '../ui/IconTextCard'
import { homeFeatures } from '../../constants/homeContent'

export default function WhyChooseUs() {
  return (
    <section className="bg-offwhite" aria-labelledby="why-choose-heading">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 id="why-choose-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Why Choose Office Jobline
        </h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted sm:text-lg">
          Office Jobline is Canada&apos;s trusted job board for office and administrative professionals.
          Whether you&apos;re looking for receptionist jobs, executive assistant roles, office coordinator
          jobs, HR support jobs, customer service office roles, or data entry opportunities, we connect
          you with quality employers hiring across Canada.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {homeFeatures.map((item) => (
            <IconTextCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              layout="row"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
