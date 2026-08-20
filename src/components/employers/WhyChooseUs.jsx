import SectionHeading from '../ui/SectionHeading'
import IconTextCard from '../ui/IconTextCard'
import { employerBenefits } from '../../constants/employerBenefits'

export default function WhyChooseUs() {
  return (
    <section className="bg-white" aria-labelledby="why-choose-us-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto mb-3 h-1 w-12 bg-gold" aria-hidden />
        <SectionHeading
          id="why-choose-us-heading"
          showIcon={false}
          title="Why Employers Choose Office Jobline"
          subtitle="Everything you need to hire top office and administrative talent across Canada."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {employerBenefits.map((item) => (
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
