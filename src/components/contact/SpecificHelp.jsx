import { FiBriefcase, FiMail, FiMessageCircle, FiUser } from 'react-icons/fi'
import { FaHandshake } from 'react-icons/fa'
import SectionHeading from '../ui/SectionHeading'
import InfoCard from '../ui/InfoCard'
import { CheckList } from '../ui/ContactDetailList'
import Button from '../ui/Button'
import { contactInfo } from '../../constants/contactInfo'

/**
 * Contact Support / Talk to Sales scroll to the hero form with the matching subject pre-selected
 * (`?subject=job-seeker|employer#contact-form`) — more useful than a Coming Soon page.
 * Send Inquiry opens a mailto to the partnerships inbox.
 */
const cards = [
  {
    icon: FiUser,
    title: 'For Job Seekers',
    description: 'Get help with job search, applications, account issues, and more.',
    points: ['Application assistance', 'Account and profile support', 'Job search tips and guidance'],
    action: {
      label: 'Contact Support',
      icon: FiMessageCircle,
      to: '/contact-us?subject=job-seeker#contact-form',
    },
  },
  {
    icon: FiBriefcase,
    title: 'For Employers',
    description: 'Get support with posting jobs, managing listings, and finding the right talent.',
    points: ['Post a job or edit a listing', 'Account and billing support', 'Employer onboarding help'],
    action: {
      label: 'Talk to Sales',
      icon: FaHandshake,
      to: '/contact-us?subject=employer#contact-form',
    },
  },
  {
    icon: FaHandshake,
    title: 'Partnerships & Media',
    description: 'For partnership opportunities, media inquiries, or brand collaborations.',
    points: ['Partnership inquiries', 'Press and media requests', 'Sponsorship opportunities'],
    action: {
      label: 'Send Inquiry',
      icon: FiMail,
      href: `mailto:${contactInfo.support.partnerships}?subject=Partnerships%20%26%20Media`,
    },
  },
]

export default function SpecificHelp() {
  return (
    <section className="bg-offwhite" aria-labelledby="specific-help-heading">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          showIcon={false}
          eyebrow="CONTACT US"
          title="Need Help With Something Specific?"
          subtitle="Choose the option that best fits your needs. Our team is here to provide the right support and connect you with the right person."
          as="h2"
          id="specific-help-heading"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <InfoCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              footer={
                card.action.to ? (
                  <Button variant="navy-gold" to={card.action.to} icon={card.action.icon} className="w-full">
                    {card.action.label}
                  </Button>
                ) : (
                  <Button variant="navy-gold" href={card.action.href} icon={card.action.icon} className="w-full">
                    {card.action.label}
                  </Button>
                )
              }
            >
              <CheckList items={card.points} />
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
