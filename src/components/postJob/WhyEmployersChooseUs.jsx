import { GiMapleLeaf } from 'react-icons/gi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import IconTextCard from '../ui/IconTextCard'
import PromoBanner from '../ui/PromoBanner'
import { employerReasons } from '../../constants/postJobContent'

function scrollToForm() {
  document.getElementById('job-posting-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function WhyEmployersChooseUs() {
  return (
    <section className="relative overflow-hidden bg-offwhite" aria-labelledby="why-employers-heading">
      <GiMapleLeaf
        className="pointer-events-none absolute -right-8 top-12 h-56 w-56 text-navy/5"
        aria-hidden
      />
      <div className="site-container relative py-16">
        <SectionHeading
          id="why-employers-heading"
          showIcon={false}
          title="Why Employers Choose Office Jobline"
          subtitle="The trusted platform for hiring office and administrative professionals across Canada."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {employerReasons.map((item) => (
            <IconTextCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              layout="column"
              divider
            />
          ))}
        </div>

        <div className="mt-10">
          <PromoBanner
            theme="teal"
            icon={HiOutlineBuildingOffice2}
            heading="Ready to Hire Top Office & Administrative Talent?"
            subtitle="Join thousands of Canadian employers who trust Office Jobline to find the right people, faster."
            ctaLabel="Post Your Job Today"
            ctaOnClick={scrollToForm}
          />
        </div>
      </div>
    </section>
  )
}
