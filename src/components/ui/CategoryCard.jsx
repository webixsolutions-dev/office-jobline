import IconCircle from './IconCircle'
import TileCard from './TileCard'

/**
 * Icon-top category tile with job count.
 */
export default function CategoryCard({ icon, title, jobCount, to }) {
  return (
    <TileCard to={to} className="flex h-full flex-col items-center p-5 text-center sm:p-6">
      <IconCircle icon={icon} color="teal" />
      <h3 className="mt-3 font-display text-sm font-bold text-navy sm:text-base">{title}</h3>
      <p className="mt-1 text-sm text-muted">{jobCount}</p>
    </TileCard>
  )
}
