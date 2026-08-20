import { NavLink } from 'react-router-dom'
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from 'react-icons/hi'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'
import { GiMapleLeaf } from 'react-icons/gi'
import logo from '../../assets/images/logo.png'
import { contactInfo, toTelHref } from '../../constants/contactInfo'
import {
  footerQuickLinks,
  footerEmployerLinks,
  footerJobSeekerLinks,
  footerLegalLinks,
} from '../../constants/navLinks'

const socialIcons = {
  LinkedIn: FaLinkedinIn,
  Facebook: FaFacebookF,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
}

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-gold">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={`${l.to}-${l.label}`}>
            <NavLink to={l.to} className="text-white/70 transition hover:text-gold">
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
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <img src={logo} alt="Office Jobline" className="h-auto w-44 sm:w-52" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">{contactInfo.tagline}</p>
            <div className="mt-5 flex gap-3">
              {contactInfo.socials.map(({ name, url }) => {
                const Icon = socialIcons[name]
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition hover:border-gold hover:bg-gold hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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
            <h2 className="font-display text-sm font-semibold text-gold">Contact Us</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineMail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gold">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlinePhone className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href={toTelHref(contactInfo.phone)} className="hover:text-gold">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineClock className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>{contactInfo.hours}</span>
              </li>
            </ul>
          </div>

          <FooterLinkColumn title="For Job Seekers" links={footerJobSeekerLinks} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold/80 pt-8 text-sm text-white/60 lg:flex-row">
          <p className="flex items-center gap-2 text-white/80">
            <GiMapleLeaf className="h-4 w-4 text-gold" aria-hidden />
            © {year} Office Jobline. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {footerLegalLinks.map((l, index) => (
              <span key={l.label} className="inline-flex items-center gap-3">
                {index > 0 && (
                  <span className="text-white/30" aria-hidden>
                    |
                  </span>
                )}
                <NavLink to={l.to} className="hover:text-gold">
                  {l.label}
                </NavLink>
              </span>
            ))}
            <span className="text-white/30" aria-hidden>
              |
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/80">
              <GiMapleLeaf className="h-3.5 w-3.5 text-gold" aria-hidden />
              Proudly Canadian
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
