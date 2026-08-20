import { FiBriefcase } from 'react-icons/fi'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { GiMapleLeaf } from 'react-icons/gi'
import StatItem from '../ui/StatItem'

const stats = [
  {
    icon: FiBriefcase,
    value: '10,000+',
    label: 'Office Jobs',
    caption: 'New opportunities added every week',
  },
  {
    icon: HiOutlineUserGroup,
    value: '2,000+',
    label: 'Employers',
    caption: 'Trusted by organizations across Canada',
  },
  {
    icon: GiMapleLeaf,
    value: 'Canada-Wide Reach',
    label: '',
    caption: 'Opportunities in cities, towns, and communities coast to coast',
  },
]

export default function StatsStrip() {
  return (
    <section className="bg-offwhite" aria-label="Office Jobline at a glance">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-border rounded-xl bg-white p-6 shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-8">
          {stats.map((stat) => (
            <div key={stat.value} className="py-4 first:pt-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0">
              <StatItem {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
