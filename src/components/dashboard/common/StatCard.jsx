import { motion } from 'framer-motion';

const ACCENTS = {
  navy: 'bg-navy-900/5 text-navy-700',
  gold: 'bg-gold-500/10 text-gold-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  rose: 'bg-rose-50 text-rose-700',
};

export default function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  accent = 'navy', 
  index = 0 
}) {
  const safeValue = value ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.05, ease: 'easeOut' }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {Icon && (
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${ACCENTS[accent]}`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-navy-950">
        {safeValue}
      </p>
    </motion.div>
  );
}