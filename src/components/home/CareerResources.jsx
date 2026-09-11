import ArticleCard from '../ui/ArticleCard'
import { homeArticles } from '../../constants/homeContent'

export default function CareerResources() {
  return (
    <section className="bg-offwhite" aria-labelledby="career-resources-heading">
      <div className="site-container py-16">
        <h2 id="career-resources-heading" className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Career Support &amp; Hiring Insights
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
          Expert tips, resources, and insights to help job seekers grow their careers and employers
          build strong office teams.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeArticles.map((item) => (
            <ArticleCard
              key={item.slug}
              to={`/resources/${item.slug}`}
              image={item.image}
              imageAlt={item.title}
              tag={item.tag}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
