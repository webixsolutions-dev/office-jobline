import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { HiOutlineBriefcase } from 'react-icons/hi2'
import logo from '../../assets/images/logo.png'
const links = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browser Jobs' },
  { to: '/employers', label: 'Employers' },
  { to: '/about-us', label: 'About Us' },
  { to: '/contact-us', label: 'Contact Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-navy-950/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-navy-950'
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
       <img src={logo} className='w-50 h-auto' alt="" />
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'text-gold-500' : 'text-slate-200 hover:text-gold-400'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/post-a-job"
            className="rounded-md bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition hover:bg-gold-400 hover:shadow-md"
          >
            Post a Job
          </NavLink>
           <NavLink
            to="/post-a-job"
            className="rounded-md  px-5 py-2.5 text-sm font-semibold text-white  border shadow-sm transition hover:bg-gold-400 hover:shadow-md border-none "
          >
            Sign in
          </NavLink>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
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
            className="overflow-hidden border-t border-white/10 bg-navy-950 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2.5 text-base font-medium ${isActive ? 'bg-white/5 text-gold-500' : 'text-slate-200 hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/post-a-job"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md bg-gold-500 px-4 py-2.5 text-center text-base font-semibold text-navy-950"
              >
                Post a Job
              </NavLink>
              <NavLink
                to="/sign-in"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md bg-gold-500 px-4 py-2.5 text-center text-base font-semibold text-navy-950"
              >
                Sign in
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
