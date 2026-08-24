import { FiCheck } from 'react-icons/fi'
import { HiOutlineClock, HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2'

/**
 * @param {{ items: Array<{ icon?: 'mail' | 'phone' | 'clock', href?: string, label: string, hint?: string }> }} props
 */
export default function ContactDetailList({ items = [] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => {
        const Icon =
          item.icon === 'phone' ? HiOutlinePhone : item.icon === 'clock' ? HiOutlineClock : HiOutlineEnvelope
        const content = (
          <>
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <span>
              <span
                className={
                  item.href
                    ? 'font-semibold text-gold underline underline-offset-2'
                    : 'font-medium text-navy'
                }
              >
                {item.label}
              </span>
              {item.hint && <span className="mt-0.5 block text-xs text-muted">{item.hint}</span>}
            </span>
          </>
        )

        return (
          <li key={item.label}>
            {item.href ? (
              <a
                href={item.href}
                className="flex items-start gap-2 text-sm text-gold"
              >
                {content}
              </a>
            ) : (
              <p className="flex items-start gap-2 text-sm text-muted">{content}</p>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function CheckList({ items = [] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-navy">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-navy">
            <FiCheck className="h-3 w-3" aria-hidden />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}
