/** Employer pricing plans for the Employers page. */

export const SALES_CONTACT_TO = '/contact-us?subject=employer#contact-form'
export const GET_STARTED_TO = '/signup'

export const pricingPlans = [
  {
    name: 'Starter',
    price: '$149',
    period: '/month',
    tagline: 'Perfect for small teams getting started.',
    features: [
      '3 Job Posts Included',
      '30-Day Applicant Access',
      'Standard Job Listing',
      'Employer Dashboard Access',
      'Email Support',
    ],
    ctaLabel: 'Get Started',
    ctaTo: GET_STARTED_TO,
    isFeatured: false,
  },
  {
    name: 'Growth',
    price: '$299',
    period: '/month',
    tagline: 'Ideal for growing businesses.',
    features: [
      '10 Job Posts Included',
      '60-Day Applicant Access',
      'Featured Job Listing',
      'Employer Dashboard Access',
      'Priority Email Support',
    ],
    ctaLabel: 'Get Started',
    ctaTo: GET_STARTED_TO,
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: '$599',
    period: '/month',
    tagline: 'For companies with ongoing hiring needs.',
    features: [
      'Unlimited Job Posts',
      '90-Day Applicant Access',
      'Featured Company Profile',
      'Advanced Dashboard & Analytics',
      'Priority Phone & Email Support',
    ],
    ctaLabel: 'Contact Sales',
    ctaTo: SALES_CONTACT_TO,
    isFeatured: false,
  },
]
