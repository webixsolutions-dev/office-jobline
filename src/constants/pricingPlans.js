/** Canonical posting plans — used on Employers and Post a Job. */

export const SALES_CONTACT_TO = '/contact-us?subject=employer#contact-form'

export const pricingPlans = [
  {
    slug: 'starter',
    name: 'Starter',
    price: '$99',
    period: '/month',
    tagline: 'Perfect for small teams and occasional hiring.',
    features: [
      '1 Job Post',
      'Standard Job Listing',
      '30-Day Listing Duration',
      'Applicant Access',
      'Employer Dashboard Access',
      'Email Support',
    ],
    ctaLabel: 'Get Started',
    ctaTo: '/post-a-job/create?plan=starter',
    isFeatured: false,
    highlighted: false,
  },
  {
    slug: 'growth',
    name: 'Growth',
    price: '$199',
    period: '/month',
    tagline: 'Great for growing companies hiring regularly.',
    features: [
      '5 Job Posts',
      { label: 'Featured Job Listing', badge: true },
      '30-Day Listing Duration',
      'Applicant Access',
      'Employer Dashboard Access',
      'Priority Email Support',
    ],
    ctaLabel: 'Get Started',
    ctaTo: '/post-a-job/create?plan=growth',
    isFeatured: true,
    highlighted: true,
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: '$399',
    period: '/month',
    tagline: 'For teams with high-volume hiring needs.',
    features: [
      '20 Job Posts',
      { label: 'Featured Job Listing', badge: true },
      '60-Day Listing Duration',
      'Applicant Access',
      'Employer Dashboard Access',
      'Priority Support',
      'Custom Branding (Optional)',
    ],
    ctaLabel: 'Contact Sales',
    ctaTo: SALES_CONTACT_TO,
    isFeatured: false,
    highlighted: false,
  },
]
