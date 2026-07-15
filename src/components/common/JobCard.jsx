import { motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineCurrencyDollar } from 'react-icons/hi'

export default function JobCard({ job, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy-900/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ backgroundColor: job.color || '#0e2140' }}
          >
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-slate-500">{job.company}</p>
          </div>
        </div>
        {job.featured && (
          <span className="shrink-0 rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-700">
            Featured
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <HiOutlineLocationMarker className="h-4 w-4 text-navy-600" />
          {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <HiOutlineClock className="h-4 w-4 text-navy-600" />
          {job.type}
        </span>
        <span className="flex items-center gap-1.5">
          <HiOutlineCurrencyDollar className="h-4 w-4 text-navy-600" />
          {job.salary}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-navy-900/5 px-3 py-1 text-xs font-medium text-navy-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-400">{job.posted}</span>
        <button className="rounded-md bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gold-500 hover:text-navy-950">
          Apply Now
        </button>
      </div>
    </motion.div>
  )
}
