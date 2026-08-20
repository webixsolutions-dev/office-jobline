import { FiBell, FiUpload } from 'react-icons/fi'
import Banner from '../ui/Banner'

export default function JobAlertBanner() {
  return (
    <Banner
      theme="teal"
      icon={FiBell}
      title="Don't Miss Your Next Opportunity"
      subtitle="Create job alerts and be the first to know about new office jobs that match your skills and experience."
      primary={{ label: 'Create Job Alert', to: '/job-alerts', icon: FiBell }}
      secondary={{ label: 'Upload Your Resume', to: '/upload-resume', icon: FiUpload }}
    />
  )
}
