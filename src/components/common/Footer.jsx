import { NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineBriefcase, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { GiMapleLeaf } from 'react-icons/gi';
import logo from '../../assets/images/logo.png'

// ✅ Data directly in component - No import from data/navigation
const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse Jobs' },
  { to: '/employers', label: 'Employers' },
  { to: '/about-us', label: 'About Us' },
  { to: '/contact-us', label: 'Contact Us' },
  { to: '/browse', label: 'Job Alerts' },
  { to: '/browse', label: 'Career Resources' },
]

const employerLinks = [
  { to: '/post-a-job', label: 'Post a Job' },
  { to: '/employers', label: 'Browse Resumes' },
  { to: '/pricing', label: 'Employer Pricing' },
  { to: '/employers', label: 'Recruitment Solutions' },
  { to: '/post-a-job', label: 'Job Posting Tips' },
  { to: '/contact-us', label: 'Contact Sales' },
]

const socialLinks = [
  { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
  { icon: FaLinkedinIn, url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
]

export default function Footer() {
  const navigate = useNavigate();

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <img src={logo} alt="Office Jobline" className='w-50 h-auto' />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Office Jobline connects employers with skilled office and administrative 
              professionals across Canada. Post jobs, find top talent, and grow your 
              team with ease.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ icon: Icon, url, label }) => (
                <button
                  key={label}
                  onClick={() => handleSocialClick(url)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-gold-500 hover:text-navy-950"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <NavLink 
                    to={l.to} 
                    className={({ isActive }) => 
                      `transition hover:text-gold-500 ${isActive ? 'text-gold-500' : 'text-slate-400'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              For Employers
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {employerLinks.map((l) => (
                <li key={l.label}>
                  <NavLink 
                    to={l.to} 
                    className={({ isActive }) => 
                      `transition hover:text-gold-500 ${isActive ? 'text-gold-500' : 'text-slate-400'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <HiOutlineLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>1 Yonge Street, Suite 1801, Toronto, ON M5E 1W7</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlinePhone className="h-4 w-4 shrink-0 text-gold-500" />
                <span>1-888-555-0123</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineMail className="h-4 w-4 shrink-0 text-gold-500" />
                <span>hello@officejobline.ca</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineBriefcase className="h-4 w-4 shrink-0 text-gold-500" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM EST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row">
          <p className="flex items-center gap-2">
            <GiMapleLeaf className="h-4 w-4 text-gold-500" />
            © {new Date().getFullYear()} Office Jobline. All rights reserved.
          </p>
          <div className="flex gap-6">
            <NavLink to="/privacy-policy" className="hover:text-gold-500">Privacy Policy</NavLink>
            <NavLink to="/terms-of-service" className="hover:text-gold-500">Terms of Service</NavLink>
            <NavLink to="/accessibility" className="hover:text-gold-500">Accessibility</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}