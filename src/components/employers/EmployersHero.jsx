import { FiBriefcase, FiMessageCircle } from 'react-icons/fi'
import SplitHero from '../ui/SplitHero'
import { images } from '../../constants/images'
import { SALES_CONTACT_TO } from '../../constants/pricingPlans'

export default function EmployersHero() {
  return (
    <SplitHero
      eyebrow="FOR EMPLOYERS"
      eyebrowPlacement="before"
      eyebrowClassName="text-xs font-semibold uppercase tracking-[0.18em] text-gold"
      heading="Hire Office & Administrative Talent Across Canada"
      paragraphs={[
        'Post your jobs and connect with qualified office professionals across Canada. Recruit office managers, receptionists, administrative assistants, executive assistants, data entry clerks, customer service representatives, payroll clerks, and coordinators—faster and easier.',
      ]}
      ctaLabel="Post a Job"
      ctaTo="/post-a-job"
      ctaVariant="gold"
      ctaIcon={FiBriefcase}
      ctaIconPosition="left"
      // Talk to Sales uses the Contact Us employer form (Module 3), not ComingSoon.
      secondaryCta={{
        label: 'Talk to Sales',
        to: SALES_CONTACT_TO,
        variant: 'teal',
        icon: FiMessageCircle,
      }}
      imageUrl={images.employersHero}
      imageAlt="Office professionals collaborating around a laptop in a bright Canadian workplace"
      imagePosition="right"
    />
  )
}
