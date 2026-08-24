import FAQAccordionItem from '../ui/FAQAccordionItem'
import ContactEyebrow from './ContactEyebrow'
import { faqs } from '../../constants/faqs'

export default function FAQSection() {
  return (
    <section className="bg-offwhite" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <ContactEyebrow>FAQ</ContactEyebrow>
        <h2 id="faq-heading" className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <FAQAccordionItem key={item.id} id={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}
