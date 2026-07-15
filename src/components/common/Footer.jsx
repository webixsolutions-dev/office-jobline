import { NavLink } from 'react-router-dom'
import { HiOutlineBriefcase, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import logo from '../../assets/images/logo.png'
const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browser Jobs' },
  { to: '/employers', label: 'Employers' },
  { to: '/about-us', label: 'About Us' },
  { to: '/contact-us', label: 'Contact Us' },
]

const jobCategories = ['Technology', 'Marketing', 'Design', 'Finance', 'Healthcare', 'Education']

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
          <img src={logo} alt="" className='w-50 h-auto' />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Connecting ambitious talent with the companies building tomorrow. Your next
              career move starts here.
            </p>
            <div className="mt-5 flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-gold-500 hover:text-navy-950"
                  aria-label="social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="text-slate-400 transition hover:text-gold-500">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Job Categories
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {jobCategories.map((c) => (
                <li key={c}>
                  <NavLink to="/browse" className="text-slate-400 transition hover:text-gold-500">
                    {c}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>142 Corporate Avenue, Gulberg III, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlinePhone className="h-4 w-4 shrink-0 text-gold-500" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineMail className="h-4 w-4 shrink-0 text-gold-500" />
                <span>hello@officejobline.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Office Jobline. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
