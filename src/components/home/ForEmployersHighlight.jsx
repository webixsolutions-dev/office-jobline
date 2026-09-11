import IconTextCard from '../ui/IconTextCard'
import { homeEmployerHighlights } from '../../constants/homeContent'

export default function ForEmployersHighlight() {
  return (
    <section className="bg-offwhite" aria-labelledby="for-employers-heading">
      <div className="site-container pb-16">
        <div className="rounded-2xl bg-teal-light p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-10 lg:items-center">
            <div>
              <h2 id="for-employers-heading" className="font-display text-2xl font-bold text-navy sm:text-3xl">
                For Employers
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Post office jobs, hire qualified administrative professionals, and grow your team with
                ease. Reach thousands of job seekers across Canada actively looking for office and
                administrative roles.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {homeEmployerHighlights.map((item) => (
                <IconTextCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  layout="column"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
