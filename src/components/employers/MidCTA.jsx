import { FiArrowRight } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Banner from '../ui/Banner'

export default function MidCTA() {
  return (
    <Banner
      theme="teal"
      icon={HiOutlineBuildingOffice2}
      iconColor="gold-outline"
      title="Ready to build a stronger office team?"
      subtitle="Join thousands of Canadian employers hiring top office and administrative talent every day."
      primary={{
        label: 'Start Hiring Today →',
        to: '/post-a-job',
        icon: FiArrowRight,
        iconPosition: 'right',
      }}
      showSkyline={false}
      showMapleLeaf
    />
  )
}
