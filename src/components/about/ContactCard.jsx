import { FiArrowRight, FiHeadphones, FiBriefcase, FiMail } from 'react-icons/fi'
import IconCircle from '../ui/IconCircle'
import { contactInfo } from '../../constants/contactInfo'

const cards = [
  {
    icon: FiHeadphones,
    title: 'Job Seeker Support',
    desc: 'Need help with your account, applications, or career resources?',
    email: contactInfo.support.seeker,
  },
  {
    icon: FiBriefcase,
    title: 'Employer Support',
    desc: 'Get assistance with postings, plans, or finding the right talent.',
    email: contactInfo.support.employer,
  },
  {
    icon: FiMail,
    title: 'General Inquiries',
    desc: "Have a question or feedback? We'd love to hear from you.",
    email: contactInfo.support.general,
  },
]

export default function ContactCards() {
  return (
    <section className="bg-offwhite" aria-label="Ways to contact us">
      <div className="site-container py-14">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map(({ icon, title, desc, email }) => (
            <article
              key={title}
              className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-card"
            >
              <IconCircle icon={icon} color="teal" />
              <div>
                <h3 className="font-display text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
                <a
                  href={`mailto:${email}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {email}
                  <FiArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
