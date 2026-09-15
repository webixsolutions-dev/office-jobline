import { contactInfo } from '../../constants/contactInfo'

/**
 * One line per weekday: day name and hours on the same line.
 */
export default function OfficeHoursSchedule({ className = '', lineClassName = 'text-sm text-navy' }) {
  return (
    <div className={className}>
      {contactInfo.officeHoursSchedule.map(({ day, hours }, index) => (
        <p key={day} className={`${lineClassName}${index > 0 ? ' mt-0.5' : ''}`}>
          <span className="font-semibold">{day}</span> {hours}
        </p>
      ))}
    </div>
  )
}
