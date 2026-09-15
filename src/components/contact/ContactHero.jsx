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
import OfficeHoursSchedule from '../ui/OfficeHoursSchedule'
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
      <div className="site-container py-10 lg:py-14">
        <div className="max-w-3xl">
          <ContactEyebrow>CONTACT US</ContactEyebrow>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
            Contact Office Jobline
          </h1>
          <p className="mt-3 text-lg font-semibold text-navy">
            Connecting job seekers and employers across Canada.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            We&apos;re here to help. Whether you&apos;re looking for office and administrative jobs, need
            support with your account, or you&apos;re an employer hiring across Canada, our team is ready
            to connect you with the right next step.
          </p>
        </div>
      </div>

      <div className="relative min-h-[32rem] overflow-hidden lg:min-h-[36rem]">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={images.contactHero}
            alt=""
            className="h-full w-full scale-105 object-cover object-center blur-[3px]"
          />
          <div className="absolute inset-0 bg-navy/55" />
        </div>

        <img
          src={logo}
          alt=""
          className="pointer-events-none absolute right-6 top-1/2 z-0 hidden w-44 -translate-y-1/2 drop-shadow-lg opacity-90 sm:block lg:right-12 lg:w-56"
          aria-hidden
        />

        <div className="site-container relative z-10 py-12 lg:py-16">
          <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="min-w-0">
              <ContactForm />
            </div>

            <InfoCard
              className="min-w-0"
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
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy">Email Us</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="break-all text-sm font-semibold text-gold underline-offset-2 hover:underline sm:break-normal"
                    >
                      {contactInfo.email}
                    </a>
                    <p className="mt-0.5 text-xs text-muted">We aim to reply within one business day.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <IconCircle icon={HiOutlinePhone} color="gold-solid" size="sm" />
                  <div className="min-w-0">
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
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy">Office Hours</p>
                    <OfficeHoursSchedule className="mt-0.5" />
                    <p className="mt-1 text-xs text-muted">{contactInfo.hoursDetail.note}</p>
                  </div>
                </li>
              </ul>
            </InfoCard>
          </div>
        </div>
      </div>

      <div className="site-container py-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
