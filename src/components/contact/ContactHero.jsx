import { FiBriefcase, FiHeadphones, FiSearch, FiShield } from 'react-icons/fi'
import {
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlinePhone,
} from 'react-icons/hi2'
import { GiMapleLeaf } from 'react-icons/gi'
import IconCircle from '../ui/IconCircle'
import ContactForm from '../ui/ContactForm'
import InfoCard from '../ui/InfoCard'
import ContactEyebrow from './ContactEyebrow'
import logo from '../../assets/images/logo.png'
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
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10 lg:ml-auto lg:mr-8 lg:px-16 lg:py-20">
            <div className="max-w-xl">
              <ContactEyebrow>CONTACT US</ContactEyebrow>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
                Contact Office Jobline
              </h1>
              <p className="mt-3 text-lg font-semibold text-navy">
                Connecting job seekers and employers across Canada.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                We&apos;re here to help. Whether you&apos;re looking for office and administrative jobs, need
                support with your account, or you&apos;re an employer hiring across Canada, our team is ready
                to connect you with the right next step.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <ContactForm />

              <InfoCard
                title="Contact Information"
                tone="gold"
                divided={false}
                footer={
                  <p className="flex items-start gap-2 text-sm text-navy">
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
                    <IconCircle icon={HiOutlineEnvelope} color="gold-solid" size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-navy">Email Us</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-sm font-semibold text-gold underline-offset-2 hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                      <p className="mt-0.5 text-xs text-muted">We aim to reply within one business day.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCircle icon={HiOutlinePhone} color="gold-solid" size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-navy">Call Us</p>
                      <a
                        href={toTelHref(contactInfo.phone)}
                        className="text-sm font-semibold text-gold underline-offset-2 hover:underline"
                      >
                        {contactInfo.phone}
                      </a>
                      <p className="mt-0.5 text-xs text-muted">{contactInfo.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCircle icon={HiOutlineClock} color="gold-solid" size="sm" />
                    <div>
                      <p className="text-sm font-semibold text-navy">Office Hours</p>
                      <p className="text-sm text-navy">
                        {contactInfo.hoursDetail.days} {contactInfo.hoursDetail.time}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{contactInfo.hoursDetail.note}</p>
                    </div>
                  </li>
                </ul>
              </InfoCard>
            </div>
          </div>
        </div>

        <div className="relative order-1 h-80 w-full self-stretch sm:h-[360px] lg:order-2 lg:h-auto lg:min-h-[420px]">
          <img
            src={images.contactHero}
            alt="Bright meeting room overlooking a Canadian city skyline"
            className="h-full w-full object-cover object-center"
          />
          <img
            src={logo}
            alt=""
            className="pointer-events-none absolute right-4 top-1/2 w-40 -translate-y-1/2 drop-shadow-lg sm:right-8 sm:w-52 lg:right-10 lg:w-60"
            aria-hidden
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <article key={item.title} className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-card">
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
