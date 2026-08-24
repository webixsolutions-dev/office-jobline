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
    </figure>
  )
}
