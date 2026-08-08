import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';

export default function UserMenu({ 
  name = 'Account', 
  subtitle, 
  onProfile, 
  onSettings, 
  onLogout 
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const getInitials = (userName) => {
    if (!userName || typeof userName !== 'string') {
      return '?';
    }
    return userName
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition hover:bg-slate-100"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white">
          {initials}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold leading-tight text-navy-900">
            {name || 'Account'}
          </span>
          {subtitle && (
            <span className="block text-xs leading-tight text-slate-400">
              {subtitle}
            </span>
          )}
        </span>
        <FiChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl"
          >
            {onProfile && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onProfile();
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-navy-800 hover:bg-slate-50"
              >
                <FiUser className="h-4 w-4 text-slate-400" /> Profile
              </button>
            )}
            {onSettings && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onSettings();
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-navy-800 hover:bg-slate-50"
              >
                <FiSettings className="h-4 w-4 text-slate-400" /> Settings
              </button>
            )}
            {onLogout && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-2.5 border-t border-slate-100 px-4 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
              >
                <FiLogOut className="h-4 w-4" /> Log Out
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}