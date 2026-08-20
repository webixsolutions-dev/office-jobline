import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { images } from '../../constants/images'

/**
 * Static map placeholder (not a live Google Maps embed).
 * Follow-up: replace with a Maps API widget when a key is available.
 *
 * @param {{ imageUrl?: string, alt?: string }} props
 */
export default function MapCard({
  imageUrl = images.officeMap,
  alt = 'Map showing Office Jobline near King Street West, Toronto',
}) {
  return (
    <figure className="relative h-full min-h-[240px] overflow-hidden rounded-xl shadow-card">
      <img src={imageUrl} alt={alt} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold shadow-lg">
          <HiOutlineBuildingOffice2 className="h-6 w-6" />
        </span>
      </div>
    </figure>
  )
}
