import FAQAccordionItem from './FAQAccordionItem'

/**
 * Data-driven FAQ list. Each item is independently expandable.
 * @param {{ question: string, answer: string, id?: string }[]} items
 */
export default function FAQAccordion({ items = [], className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <FAQAccordionItem
          key={item.id || item.question}
          id={item.id}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  )
}
