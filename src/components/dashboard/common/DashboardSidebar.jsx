import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX, FiPlusCircle } from 'react-icons/fi';
import { getDashboardNav } from './dashboardNav';
import logo from '../../../assets/images/logo.png';

function SidebarContent({ role, basePath, companyVerification }) {
  const items = getDashboardNav(role, basePath);

  return (
    <div className="flex h-full flex-col bg-navy-950">
      <div className="flex items-center px-5 py-5">
        <img src={logo} className="h-9 w-auto" alt="" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {items.map((item, index) => (
          <NavLink
            key={item.to + '-' + index}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-gold-500 text-navy-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5 shrink-0" />
            {item.label}
          </NavLink>
        ))}

        {role === 'recruiter' && (
          <NavLink
            key="post-job"
            to={`${basePath}/jobs/new`}
            className="mt-2 flex items-center gap-3 rounded-lg border border-dashed border-white/15 px-3.5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-gold-400/60 hover:text-gold-400"
          >
            <FiPlusCircle className="h-4.5 w-4.5 shrink-0" />
            Post a Job
          </NavLink>
        )}
      </nav>

      {role === 'recruiter' && companyVerification && companyVerification !== 'verified' && (
        <div className="mx-3 mb-3 rounded-lg bg-white/5 px-3.5 py-3 text-xs text-slate-300">
          {companyVerification === 'pending' && (
            <>
              <span className="font-semibold text-amber-400">Pending verification.</span> Jobs won't go live until
              you're verified.
            </>
          )}
          {companyVerification === 'rejected' && (
            <>
              <span className="font-semibold text-rose-400">Verification rejected.</span> Update your company
              details to resubmit.
            </>
          )}
        </div>
      )}

      <p className="border-t border-white/5 px-5 py-4 text-[11px] text-slate-500">
        © {new Date().getFullYear()} Jooblie Network
      </p>
    </div>
  );
}

export default function DashboardSidebar({ 
  role, 
  basePath = '/dashboard', 
  companyVerification, 
  isOpen, 
  onClose 
}) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="fixed h-screen w-64">
          <SidebarContent 
            role={role} 
            basePath={basePath} 
            companyVerification={companyVerification} 
          />
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <div className="relative h-full">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="absolute right-3 top-3 z-10 rounded-md p-2 text-slate-300 hover:bg-white/5"
                >
                  <FiX className="h-5 w-5" />
                </button>
                <SidebarContent 
                  role={role} 
                  basePath={basePath} 
                  companyVerification={companyVerification} 
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}