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
    <div className="grid grid-cols-1 rounded-xl bg-white shadow-card sm:grid-cols-3">
      {stats.map((stat, index) => (
        <div key={stat.value} className="relative px-6 py-6 sm:px-8 sm:py-8">
          {index > 0 && (
            <span
              className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-border sm:left-0 sm:right-auto sm:top-6 sm:bottom-6 sm:h-auto sm:w-px"
              aria-hidden
            />
          )}
          <StatItem {...stat} iconSize="md" />
        </div>
      ))}
    </div>
  )
}
