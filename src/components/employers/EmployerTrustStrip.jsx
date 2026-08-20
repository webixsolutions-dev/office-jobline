import IconTextCard from '../ui/IconTextCard'
import { employerTrustItems } from '../../constants/employerTrust'

export default function EmployerTrustStrip() {
  return (
    <section className="bg-offwhite" aria-label="Why employers trust Office Jobline">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {employerTrustItems.map((item) => (
            <IconTextCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              layout="row"
              underline
              className="border border-border"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
