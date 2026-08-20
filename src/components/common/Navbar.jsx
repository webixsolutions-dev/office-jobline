import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import { FiUser } from 'react-icons/fi'
import logo from '../../assets/images/logo.png'
import { navLinks } from '../../constants/navLinks'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-navy transition-shadow duration-300 ${
        scrolled ? 'shadow-lg shadow-black/20' : ''
      }`}
    >
      <nav
        className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8"
        aria-label="Primary"
      >
        <NavLink to="/" className="flex items-center gap-2.5 justify-self-start" onClick={() => setOpen(false)}>
          <img src={logo} className="h-auto w-44 sm:w-52" alt="Office Jobline" />
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium text-white transition-colors hover:text-gold ${
                  isActive
                    ? 'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[3px] after:rounded-full after:bg-gold'
                    : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <NavLink
            to="/post-a-job"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-gold-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <HiOutlineBriefcase className="h-4 w-4" aria-hidden />
            Post a Job
          </NavLink>
          <NavLink
            to="/sign-in"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <FiUser className="h-4 w-4" aria-hidden />
            Sign In
          </NavLink>
        </div>

        <button
          className="inline-flex items-center justify-center justify-self-end rounded-md p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <HiX className="h-7 w-7" /> : <HiMenu className="h-7 w-7" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10 bg-navy lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2.5 text-base font-medium ${
                      isActive ? 'bg-white/5 text-gold' : 'text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/post-a-job"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-base font-semibold text-navy"
              >
                <HiOutlineBriefcase className="h-5 w-5" aria-hidden />
                Post a Job
              </NavLink>
              <NavLink
                to="/sign-in"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-4 py-2.5 text-base font-semibold text-white"
              >
                <FiUser className="h-5 w-5" aria-hidden />
                Sign In
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
