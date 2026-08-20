import TileCard from './TileCard'

function SkylineIcon() {
  return (
    <svg
      viewBox="0 0 120 60"
      className="h-16 w-28 text-teal"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="10" y="20" width="10" height="30" />
      <rect x="24" y="10" width="10" height="40" />
      <rect x="38" y="26" width="10" height="24" />
      <rect x="52" y="4" width="10" height="46" />
      <rect x="66" y="18" width="10" height="32" />
      <rect x="80" y="14" width="10" height="36" />
      <rect x="94" y="24" width="10" height="26" />
      <line x1="4" y1="50" x2="116" y2="50" />
    </svg>
  )
}

/**
 * Skyline icon + city + job count tile.
 */
export default function CityCard({ city, province, jobCount, to }) {
  return (
    <TileCard to={to} className="overflow-hidden p-0">
      <div className="flex h-24 items-center justify-center bg-teal-light/50">
        <SkylineIcon />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-display font-bold text-navy">
          {city}, {province}
        </h3>
        <p className="mt-1 text-sm text-muted">{jobCount}</p>
      </div>
    </TileCard>
  )
}
