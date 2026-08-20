/**
 * Circular icon wrapper used across cards and stats.
 * @param {'teal' | 'teal-solid' | 'gold-solid' | 'gold-tint' | 'gold-outline' | 'navy' | 'white'} [color]
 */
export default function IconCircle({
  icon: Icon,
  color = 'teal',
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  const palettes = {
    teal: 'bg-teal-light text-teal',
    'teal-solid': 'bg-teal text-white',
    'gold-solid': 'bg-gold text-navy',
    'gold-tint': 'bg-gold-tint text-gold-dark',
    'gold-outline': 'border-2 border-gold bg-transparent text-gold',
    navy: 'bg-navy text-gold',
    white: 'bg-white text-teal',
  }

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${sizes[size]} ${palettes[color]} ${className}`}
    >
      {Icon && <Icon className={iconSizes[size]} aria-hidden />}
    </span>
  )
}
