import TileCard from './TileCard'

/**
 * Logo + name + job count + location tile.
 */
export default function EmployerCard({ name, jobCount, location, initials, color, to }) {
  return (
    <TileCard to={to} className="h-full p-5 sm:p-6">
      <span
        className="inline-flex h-10 min-w-16 items-center justify-center rounded-md px-2 text-xs font-extrabold text-white"
        style={{ backgroundColor: color }}
        aria-hidden
      >
        {initials}
      </span>
      <h3 className="mt-3 font-display text-sm font-bold text-navy">{name}</h3>
      <p className="mt-0.5 text-sm text-muted">{jobCount}</p>
      <p className="mt-1 text-xs text-muted">{location}</p>
    </TileCard>
  )
}
