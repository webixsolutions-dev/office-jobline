import { FiBriefcase, FiPhone, FiHelpCircle } from 'react-icons/fi'
import IconCircle from '../ui/IconCircle'
import CTABanner from '../ui/CTABanner'
import FAQAccordion from '../ui/FAQAccordion'
import { postJobFaqs, SALES_TO } from '../../constants/postJobContent'

function scrollToForm() {
  document.getElementById('job-posting-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function PostJobFAQ() {
  return (
    <>
      <CTABanner
        icon={FiBriefcase}
        heading="Ready to Post Your Office Job?"
        subtitle="Reach thousands of qualified office professionals across Canada and find the right talent for your team."
        primary={{ label: 'Post a Job', icon: FiBriefcase, onClick: scrollToForm }}
        secondary={{ label: 'Contact Sales', icon: FiPhone, to: SALES_TO }}
      />

      <section className="bg-offwhite" aria-labelledby="post-job-faq-heading">
        <div className="site-container py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-start">
            <div className="flex items-start gap-4">
              <IconCircle icon={FiHelpCircle} color="teal-solid" />
              <div>
                <h2 id="post-job-faq-heading" className="font-display text-xl font-bold text-navy sm:text-2xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Get quick answers to common questions about posting office and administrative jobs.
                </p>
              </div>
            </div>
            <FAQAccordion items={postJobFaqs} />
          </div>
        </div>
      </section>
    </>
  )
}
