import { FiCheckCircle, FiShield, FiTrendingUp } from 'react-icons/fi'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import IconTextCard from '../ui/IconTextCard'
import StatsStrip from './StatsStrip'

const values = [
  {
    icon: FiShield,
    title: 'Trust',
    description: "We're committed to transparency, fairness, and protecting the trust of our community.",
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Inclusion',
    description: 'We welcome talent from all backgrounds and believe diverse teams build stronger workplaces.',
  },
  {
    icon: FiCheckCircle,
    title: 'Simplicity',
    description: 'We make the job search and hiring process straightforward and stress-free.',
  },
  {
    icon: FiTrendingUp,
    title: 'Growth',
    description: 'We support career growth and help businesses and people move forward.',
  },
]

export default function OurValues() {
  return (
    <section className="bg-offwhite" aria-labelledby="our-values-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 id="our-values-heading" className="sr-only">
          Our Values
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => (
            <IconTextCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              layout="column"
              className="h-full"
            />
          ))}
        </div>

        <div className="mt-6" aria-label="Office Jobline at a glance">
          <StatsStrip />
        </div>
      </div>
    </section>
  )
}
