import { GiMapleLeaf } from 'react-icons/gi'
import CategoryCard from '../ui/CategoryCard'
import PromoBanner from '../ui/PromoBanner'
import { homeCategories } from '../../constants/homeContent'

export default function PopularJobCategories() {
  return (
    <section className="bg-offwhite" aria-labelledby="popular-categories-heading">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 id="popular-categories-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Popular Office Job Categories
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {homeCategories.map((item) => (
            <CategoryCard
              key={item.slug}
              icon={item.icon}
              title={item.title}
              jobCount={item.jobCount}
              to={`/jobs?category=${item.slug}`}
              showDivider
            />
          ))}
        </div>

        <PromoBanner
          className="mt-10"
          theme="teal"
          icon={GiMapleLeaf}
          heading="Find office and administrative jobs across Canada"
          subtitle="Explore thousands of opportunities in cities and communities from coast to coast."
          ctaLabel="Browse All Jobs"
          ctaTo="/jobs"
        />
      </div>
    </section>
  )
}
