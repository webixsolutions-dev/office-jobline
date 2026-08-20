import SectionHeading from '../ui/SectionHeading'
import FAQAccordionItem from '../ui/FAQAccordionItem'
import { faqs } from '../../constants/faqs'

export default function FAQSection() {
  return (
    <section className="bg-offwhite" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          showIcon={false}
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          as="h2"
          id="faq-heading"
        />
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <FAQAccordionItem key={item.id} id={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
