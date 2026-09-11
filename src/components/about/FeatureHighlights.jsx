import { FiShield, FiSettings, FiTrendingUp } from 'react-icons/fi'
import IconTextCard from '../ui/IconTextCard'

const features = [
  {
    icon: FiShield,
    title: 'Verified Listings',
    description:
      'All job postings are reviewed for quality and legitimacy so you can apply or hire with confidence.',
  },
  {
    icon: FiSettings,
    title: 'Easy Hiring Tools',
    description: 'Powerful tools and dashboards that simplify hiring and save time for employers.',
  },
  {
    icon: FiTrendingUp,
    title: 'Career Growth Support',
    description:
      'Resources, tips, and guidance to help office professionals grow their careers and reach their goals.',
  },
]

export default function FeatureHighlights() {
  return (
    <section className="bg-offwhite" aria-label="Feature highlights">
      <div className="site-container pb-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((item) => (
            <IconTextCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              layout="row"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
