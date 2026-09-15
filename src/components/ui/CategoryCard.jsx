import IconCircle from './IconCircle'
import TileCard from './TileCard'

/**
 * Icon-top category tile with job count.
 * @param {boolean} [showDivider] thin rule above the job count (Home categories)
 */
export default function CategoryCard({ icon, title, jobCount, to, showDivider = false }) {
  return (
    <TileCard to={to} className="flex h-full flex-col items-center p-5 text-center sm:p-6">
      <IconCircle icon={icon} color="teal" />
      <h3 className="mt-3 w-full flex-1 font-display text-sm font-bold leading-snug text-navy sm:text-base">
        {title}
      </h3>
      <div className={`w-full shrink-0 ${showDivider ? 'mt-4' : 'mt-1'}`}>
        {showDivider && <span className="block h-px w-full bg-border" aria-hidden />}
        <p className={`text-sm text-muted ${showDivider ? 'mt-3' : ''}`}>{jobCount}</p>
      </div>
    </TileCard>
  )
}
