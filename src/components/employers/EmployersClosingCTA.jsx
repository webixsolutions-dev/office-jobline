import { FiBriefcase } from 'react-icons/fi'
import { HiOutlineBuildingOffice2, HiOutlinePhone } from 'react-icons/hi2'
import Banner from '../ui/Banner'
import { SALES_CONTACT_TO } from '../../constants/pricingPlans'

export default function EmployersClosingCTA() {
  return (
    <Banner
      theme="navy"
      icon={HiOutlineBuildingOffice2}
      iconColor="gold-outline"
      title="Ready to Hire Office Talent Across Canada?"
      subtitle="Post your job and connect with qualified office professionals from coast to coast."
      primary={{
        label: 'Post a Job →',
        to: '/post-a-job',
        icon: FiBriefcase,
        variant: 'gold',
      }}
      // Contact Sales uses the Contact Us employer form (Module 3), same as Talk to Sales.
      secondary={{
        label: 'Contact Sales',
        to: SALES_CONTACT_TO,
        icon: HiOutlinePhone,
        variant: 'outline',
      }}
      showSkyline
      actionsLayout="stack"
    />
  )
}
