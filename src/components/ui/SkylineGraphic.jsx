/**
 * Decorative low-opacity skyline used on closing CTAs. Always aria-hidden.
 * @param {'left' | 'right'} [position]
 */
export default function SkylineGraphic({ position = 'right', className = '' }) {
  const side =
    position === 'left'
      ? 'left-0 origin-center -scale-x-100'
      : 'right-0'

  return (
    <svg
      viewBox="0 0 480 280"
      className={`pointer-events-none absolute ${side} top-1/2 hidden h-[140%] w-[32%] -translate-y-1/2 text-white/10 lg:block ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="40" y="80" width="70" height="180" />
      <rect x="120" y="40" width="90" height="220" />
      <rect x="220" y="100" width="60" height="160" />
      <rect x="290" y="20" width="80" height="240" />
      <rect x="380" y="70" width="70" height="190" />
      <path d="M330 20 L350 0 L370 20" />
    </svg>
  )
}
