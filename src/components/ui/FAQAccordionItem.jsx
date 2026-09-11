import { useId, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

/**
 * Independent FAQ row (multiple items may stay open).
 * Accordion expand/collapse does not change the URL hash, so ScrollToTop is unaffected.
 *
 * @param {{ question: string, answer: string, id?: string }} props
 */
export default function FAQAccordionItem({ question, answer, id }) {
  const reactId = useId()
  const panelId = id ? `${id}-panel` : `${reactId}-panel`
  const buttonId = id ? `${id}-button` : `${reactId}-button`
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl bg-white shadow-card">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {question}
          <FiChevronDown
            className={`h-5 w-5 shrink-0 text-navy transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      </h3>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="px-6 pb-4 text-sm leading-relaxed text-muted"
        >
          {answer}
        </div>
      ) : null}
    </div>
  )
}
