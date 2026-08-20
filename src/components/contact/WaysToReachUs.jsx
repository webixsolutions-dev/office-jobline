import { FiBriefcase, FiUser } from 'react-icons/fi'
import { HiOutlineEnvelope } from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import InfoCard from '../ui/InfoCard'
import ContactDetailList from '../ui/ContactDetailList'
import { contactInfo, toTelHref } from '../../constants/contactInfo'

const cards = [
  {
    icon: HiOutlineEnvelope,
    title: 'General Inquiries',
    description: 'Questions about Office Jobline, our services, or how we can help.',
    email: contactInfo.support.general,
  },
  {
    icon: FiUser,
    title: 'Job Seeker Support',
    description: 'Get help with job searching, applications, and your account.',
    email: contactInfo.support.seeker,
  },
  {
    icon: FiBriefcase,
    title: 'Employer Support',
    description: 'Assistance with posting jobs, account management, and hiring.',
    email: contactInfo.support.employer,
  },
]

export default function WaysToReachUs() {
  return (
    <section className="bg-offwhite" aria-labelledby="ways-to-reach-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          showIcon={false}
          eyebrow="CONTACT US"
          title="Ways to Reach Us"
          subtitle="We're here to help. Reach out to Office Jobline for office jobs, administrative careers, and employer hiring support across Canada."
          as="h2"
          id="ways-to-reach-heading"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <InfoCard key={card.title} icon={card.icon} title={card.title} description={card.description}>
              <ContactDetailList
                items={[
                  { icon: 'mail', href: `mailto:${card.email}`, label: card.email },
                  { icon: 'phone', href: toTelHref(contactInfo.phone), label: contactInfo.phone },
                  { icon: 'clock', label: contactInfo.hours },
                ]}
              />
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
