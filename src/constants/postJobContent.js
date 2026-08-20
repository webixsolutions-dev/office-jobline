import {
  FiUserPlus,
  FiEdit3,
  FiCheckSquare,
  FiUsers,
  FiUserCheck,
  FiClock,
  FiGrid,
} from 'react-icons/fi'
import { GiMapleLeaf } from 'react-icons/gi'
import { HiOutlineShieldCheck } from 'react-icons/hi2'

export { pricingPlans as postJobPlans } from './pricingPlans'

export const SALES_TO = '/contact?topic=sales#contact-form'

export const jobTypeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'internship', label: 'Internship' },
]

export const salaryRangeOptions = [
  { value: '30-40', label: '$30,000 – $40,000' },
  { value: '40-50', label: '$40,000 – $50,000' },
  { value: '50-60', label: '$50,000 – $60,000' },
  { value: '60-75', label: '$60,000 – $75,000' },
  { value: '75-90', label: '$75,000 – $90,000' },
  { value: '90-110', label: '$90,000 – $110,000' },
  { value: '110+', label: '$110,000+' },
]

export const postJobTrustBadges = [
  { icon: FiUsers, label: 'Reach Qualified Office Talent' },
  { icon: GiMapleLeaf, label: 'Canada-Wide Exposure' },
  { icon: HiOutlineShieldCheck, label: 'Trusted by Employers Nationwide' },
]

export const postingSteps = [
  {
    number: 1,
    icon: FiUserPlus,
    title: 'Create Employer Account',
    description: 'Sign up as an employer and set up your company profile in just a few easy steps.',
  },
  {
    number: 2,
    icon: FiEdit3,
    title: 'Add Job Details',
    description: 'Fill in your job title, description, requirements, location, and compensation details.',
  },
  {
    number: 3,
    icon: FiCheckSquare,
    title: 'Review & Publish',
    description: 'Review your listing and publish to make your job visible to thousands of job seekers.',
  },
  {
    number: 4,
    icon: FiUsers,
    title: 'Receive Applications',
    description: 'Qualified candidates apply and you can review, shortlist, and connect with the right talent.',
  },
]

export const employerReasons = [
  {
    icon: FiUserCheck,
    title: 'Qualified Office Talent',
    description:
      'Access a pool of pre-screened candidates with office, administrative, and customer service experience.',
  },
  {
    icon: GiMapleLeaf,
    title: 'Canada-Wide Reach',
    description: 'Reach job seekers from Toronto to Vancouver and everywhere in between. Post nationwide with ease.',
  },
  {
    icon: FiClock,
    title: 'Fast Posting',
    description: 'Get your office job live in minutes and start receiving applications right away.',
  },
  {
    icon: FiGrid,
    title: 'Simple Employer Dashboard',
    description: 'Manage your job postings, review applications, and communicate with candidates all in one place.',
  },
]

export const postJobTestimonials = [
  {
    quote:
      'Office Jobline has helped us connect with exceptional administrative talent quickly and efficiently. The platform is easy to use and delivers great results.',
    name: 'Natalie L.',
    location: 'HR Manager, Northbridge Solutions',
    avatar: { type: 'initials', initials: 'N', color: 'navy' },
  },
  {
    quote:
      "We've filled multiple office positions through Office Jobline. The quality of candidates and the support from their team is outstanding.",
    name: 'Brian C.',
    location: 'Operations Director, Brightpath Consulting',
    avatar: { type: 'initials', initials: 'BC', color: 'teal' },
  },
]

export const postJobFaqs = [
  {
    id: 'cost',
    question: 'How much does it cost to post a job?',
    answer:
      'Plans start at $99 per month for Starter (1 job post), $199 for Growth (5 posts with featured listing), and $399 for Enterprise (20 posts and longer listing duration). Every plan includes applicant access and an employer dashboard.',
  },
  {
    id: 'duration',
    question: 'How long will my job posting stay active?',
    answer:
      'Starter and Growth listings stay live for 30 days. Enterprise listings stay live for 60 days. You can edit or renew a posting from your employer dashboard before it expires.',
  },
  {
    id: 'edit',
    question: "Can I edit or update my job posting after it's live?",
    answer:
      'Yes. Once your listing is published you can update the title, description, location, and compensation at any time. Changes appear immediately for job seekers.',
  },
  {
    id: 'types',
    question: 'What types of office and administrative jobs can I post?',
    answer:
      'Office Jobline is built for office and administrative hiring across Canada — office managers, receptionists, executive assistants, customer service representatives, payroll clerks, data entry clerks, coordinators, and similar support roles.',
  },
]
