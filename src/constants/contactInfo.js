/** Canonical company contact details used by Footer and contact cards. */

export function toTelHref(phone) {
  return `tel:${String(phone).replace(/[^\d+]/g, '')}`
}

export const contactInfo = {
  name: 'Office Jobline',
  tagline:
    'Connecting office professionals with great opportunities and helping employers build strong, productive teams across Canada.',
  address: '100 King St W, Suite 5600, Toronto, ON M5X 1C7, Canada',
  officeAddress: '100 King St W, Suite 5600, Toronto, ON M5X 1C7, Canada',
  email: 'info@officejobline.com',
  phone: '+1 (647) 555-0198',
  hours: 'Mon - Fri: 9:00 AM - 5:00 PM EST',
  hoursDetail: {
    days: 'Monday – Friday',
    time: '9:00 AM – 5:00 PM EST',
    note: 'Closed on weekends and statutory holidays.',
  },
  support: {
    general: 'info@officejobline.com',
    seeker: 'support@officejobline.com',
    employer: 'employers@officejobline.com',
    partnerships: 'partnerships@officejobline.com',
  },
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=100+King+St+W+Suite+5600+Toronto+ON+M5X+1C7',
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
  ],
}

export const contactSubjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'job-seeker', label: 'Job Seeker Support' },
  { value: 'employer', label: 'Employer Support' },
  { value: 'partnerships', label: 'Partnerships & Media' },
  { value: 'other', label: 'Other' },
]
