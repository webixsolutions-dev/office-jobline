import { FiBriefcase, FiCheckCircle, FiLock, FiShield } from 'react-icons/fi'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { GiMapleLeaf } from 'react-icons/gi'
import StatItem from '../ui/StatItem'

const stats = [
  {
    icon: FiBriefcase,
    value: '10,248+ Active Office Jobs',
    caption: 'New office & administrative jobs posted every day.',
  },
  {
    icon: HiOutlineUserGroup,
    value: '2,350+ Employers Hiring',
    caption: 'Trusted companies actively hiring across Canada.',
  },
  {
    icon: GiMapleLeaf,
    value: 'Canada-Wide Opportunities',
    caption: 'Find the right job wherever you are in Canada.',
  },
]

const trust = [
  {
    icon: FiShield,
    value: '100% Free for Job Seekers',
    caption: 'Browse and apply to jobs at no cost.',
  },
  {
    icon: FiLock,
    value: 'Secure & Private',
    caption: 'Your data is safe and never shared.',
  },
  {
    icon: FiCheckCircle,
    value: 'Trusted by Thousands',
    caption: 'Thousands of professionals find jobs every month.',
  },
]

export default function TrustStrip() {
  return (
    <section className="bg-offwhite" aria-label="Browse Jobs at a glance">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.value} className="rounded-xl bg-white p-6 shadow-card">
              <StatItem {...stat} />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-full bg-white px-6 py-5 shadow-card sm:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trust.map((item) => (
              <StatItem key={item.value} icon={item.icon} value={item.value} caption={item.caption} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
