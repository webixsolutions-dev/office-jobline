import { FiBriefcase, FiUsers, FiCalendar, FiAward } from 'react-icons/fi'
import StatCardRow from '../dashboard/StatCardRow'
import { useEmployerData } from '../../lib/EmployerDataContext'

const EMPLOYER_STAT_CONFIG = [
  { key: 'activePostings', label: 'Active Job Postings', icon: FiBriefcase, accent: 'teal' },
  { key: 'totalApplicants', label: 'Total Applicants', icon: FiUsers, accent: 'gold' },
  { key: 'interviewsScheduled', label: 'Interviews Scheduled', icon: FiCalendar, accent: 'teal' },
  { key: 'positionsFilled', label: 'Positions Filled', icon: FiAward, accent: 'green' },
]

export default function EmployerStatCardRow() {
  const { stats } = useEmployerData()
  return <StatCardRow config={EMPLOYER_STAT_CONFIG} stats={stats} />
}
