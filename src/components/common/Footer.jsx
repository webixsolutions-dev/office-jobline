import { NavLink } from 'react-router-dom'
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from 'react-icons/hi'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'
import logo from '../../assets/images/logo.png'
import { contactInfo, toTelHref } from '../../constants/contactInfo'
import { footerQuickLinks, footerEmployerLinks, footerLegalLinks } from '../../constants/navLinks'

const socialIcons = {
  LinkedIn: FaLinkedinIn,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
}

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h2 className="font-display text-base font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={`${l.to}-${l.label}`}>
            <NavLink to={l.to} className="text-white/90 transition hover:text-gold">
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logo} alt="Office Jobline" className="h-auto w-44 sm:w-52" />
            <p className="mt-4 text-sm leading-relaxed text-white/90">{contactInfo.tagline}</p>
            <div className="mt-5 flex gap-3">
              {contactInfo.socials.map(({ name, url }) => {
                const Icon = socialIcons[name]
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-white transition hover:bg-gold hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    aria-label={name}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </a>
                )
              })}
            </div>
          </div>

          <FooterLinkColumn title="Quick Links" links={footerQuickLinks} />
          <FooterLinkColumn title="For Employers" links={footerEmployerLinks} />

          <div>
            <h2 className="font-display text-base font-semibold text-white">Contact Us</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineMail className="h-4 w-4 shrink-0 text-white" aria-hidden />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gold">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlinePhone className="h-4 w-4 shrink-0 text-white" aria-hidden />
                <a href={toTelHref(contactInfo.phone)} className="hover:text-gold">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineClock className="h-4 w-4 shrink-0 text-white" aria-hidden />
                <span>{contactInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-8 text-sm text-white/80 lg:flex-row lg:items-center">
          <p>© {year} Office Jobline. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLegalLinks.map((l) => (
              <NavLink key={l.label} to={l.to} className="hover:text-gold">
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
