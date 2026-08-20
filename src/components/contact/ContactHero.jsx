import { FiBriefcase, FiHeadphones, FiSearch, FiShield } from 'react-icons/fi'
import {
  HiOutlineBuildingOffice2,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from 'react-icons/hi2'
import { GiMapleLeaf } from 'react-icons/gi'
import IconCircle from '../ui/IconCircle'
import ContactForm from '../ui/ContactForm'
import InfoCard from '../ui/InfoCard'
import { images } from '../../constants/images'
import { contactInfo, toTelHref } from '../../constants/contactInfo'

const trustItems = [
  {
    icon: FiSearch,
    title: 'Find Office Jobs',
    description: 'Explore administrative and office opportunities across Canada.',
  },
  {
    icon: FiBriefcase,
    title: 'For Employers',
    description: 'Post jobs and connect with qualified office professionals.',
  },
  {
    icon: FiHeadphones,
    title: 'Employer Support',
    description: 'Get hiring assistance and recruitment support tailored to your needs.',
  },
  {
    icon: FiShield,
    title: 'Trusted in Canada',
    description: 'Supporting communities and careers from coast to coast.',
  },
]

export default function ContactHero() {
  return (
    <section className="bg-offwhite">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
        <div className="order-2 flex items-start lg:order-1">
          <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 lg:ml-auto lg:mr-6 lg:px-16 lg:py-16">
            <p className="text-sm font-semibold tracking-wide text-teal">CONTACT US</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
              Contact Office Jobline
            </h1>
            <p className="mt-3 text-lg font-semibold text-muted">
              Connecting job seekers and employers across Canada.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              We&apos;re here to help. Whether you&apos;re looking for office and administrative jobs, need
              support with your account, or you&apos;re an employer hiring across Canada, our team is ready
              to connect you with the right next step.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
              <ContactForm />

              <InfoCard
                title="Contact Information"
                tone="gold"
                divided={false}
                footer={
                  <p className="flex items-start gap-2 text-xs text-navy sm:text-sm">
                    <HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                    <span>
                      Proudly supporting job seekers and employers across Canada.{' '}
                      <GiMapleLeaf className="mb-0.5 inline h-3.5 w-3.5 text-gold" aria-hidden />
                    </span>
                  </p>
                }
              >
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <IconCircle icon={HiOutlineEnvelope} color="navy" size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-navy">Email Us</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm font-semibold text-gold hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                      <p className="mt-0.5 text-xs text-muted">We aim to reply within one business day.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCircle icon={HiOutlinePhone} color="navy" size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-navy">Call Us</p>
                      <a
                        href={toTelHref(contactInfo.phone)}
                        className="text-sm font-semibold text-gold hover:underline"
                      >
                        {contactInfo.phone}
                      </a>
                      <p className="mt-0.5 text-xs text-muted">{contactInfo.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCircle icon={HiOutlineClock} color="navy" size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-navy">Office Hours</p>
                      <p className="text-sm text-navy">{contactInfo.hoursDetail.days}</p>
                      <p className="text-sm text-navy">{contactInfo.hoursDetail.time}</p>
                      <p className="mt-0.5 text-xs text-muted">{contactInfo.hoursDetail.note}</p>
                    </div>
                  </li>
                </ul>
              </InfoCard>
            </div>
          </div>
        </div>

        <div className="relative order-1 h-80 w-full self-stretch sm:h-[320px] lg:order-2 lg:h-auto lg:min-h-[640px]">
          <img
            src={images.contactHero}
            alt="Bright meeting room overlooking a Canadian city skyline"
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-offwhite via-offwhite/20 to-transparent lg:from-transparent lg:via-navy/20 lg:to-navy/50"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
            <div className="flex items-center gap-3 rounded-lg border border-gold bg-navy/80 px-4 py-3">
              <HiOutlineBuildingOffice2 className="h-8 w-8 text-gold" />
              <span className="font-display text-lg font-bold text-white sm:text-xl">Office Jobline</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-white shadow-card sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {trustItems.map((item, index) => (
            <article
              key={item.title}
              className={`flex items-start gap-4 p-6 ${index < 2 ? 'sm:border-b sm:border-border lg:border-b-0' : ''}`}
            >
              <IconCircle icon={item.icon} color="navy" />
              <div>
                <h3 className="font-display text-base font-semibold text-navy">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
