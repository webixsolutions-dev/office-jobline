import { FiBell, FiBriefcase, FiCheckCircle, FiClock, FiFileText, FiSearch, FiUser } from 'react-icons/fi'
import { FaRegClipboard } from 'react-icons/fa'
import { HiOutlineChatBubbleLeftRight, HiOutlineUserGroup } from 'react-icons/hi2'
import { GiMapleLeaf } from 'react-icons/gi'
import { LuMonitor } from 'react-icons/lu'
import { images } from './images'

export const homeFeatures = [
  {
    icon: FiBriefcase,
    title: 'Curated Office Jobs',
    description: 'Handpicked office and administrative roles from reputable employers across Canada.',
  },
  {
    icon: HiOutlineUserGroup,
    title: 'Top Canadian Employers',
    description: 'Access opportunities from leading companies that value office talent like yours.',
  },
  {
    icon: FiBell,
    title: 'Fast Job Alerts',
    description: 'Get notified about new office jobs that match your skills and preferences.',
  },
  {
    icon: FiFileText,
    title: 'Easy Applications',
    description: 'Apply quickly and easily with a streamlined process designed to save you time.',
  },
]

export const homeCategories = [
  { icon: FiUser, title: 'Administrative Assistant', jobCount: '2,845 Jobs', slug: 'administrative-assistant' },
  { icon: FiUser, title: 'Receptionist', jobCount: '1,826 Jobs', slug: 'receptionist' },
  { icon: FiBriefcase, title: 'Executive Assistant', jobCount: '1,695 Jobs', slug: 'executive-assistant' },
  { icon: FaRegClipboard, title: 'Office Manager', jobCount: '1,232 Jobs', slug: 'office-manager' },
  { icon: LuMonitor, title: 'Data Entry Clerk', jobCount: '1,418 Jobs', slug: 'data-entry' },
  { icon: HiOutlineChatBubbleLeftRight, title: 'Customer Service Representative', jobCount: '2,159 Jobs', slug: 'customer-service' },
]

export const homeSteps = [
  {
    icon: FiSearch,
    number: 1,
    title: 'Search Jobs',
    description: 'Find office and administrative jobs that match your skills and location.',
  },
  {
    icon: FiUser,
    number: 2,
    title: 'Create Profile',
    description: 'Build your profile, add your experience, and let employers find you.',
  },
  {
    icon: FiFileText,
    number: 3,
    title: 'Apply Easily',
    description: "Apply to jobs in just a few clicks. It's fast, simple, and secure.",
  },
  {
    icon: FiCheckCircle,
    number: 4,
    title: 'Get Hired',
    description: 'Connect with employers and land the right opportunity for your career.',
  },
]

export const homeEmployerHighlights = [
  {
    icon: HiOutlineUserGroup,
    title: 'Quality Applicants',
    description: 'Connect with pre-screened, qualified office and administrative professionals.',
  },
  {
    icon: FiClock,
    title: 'Quick Posting',
    description: 'Post your jobs in minutes and start receiving applications fast.',
  },
  {
    icon: GiMapleLeaf,
    title: 'Canada-Wide Reach',
    description: 'Get your job in front of candidates from cities and towns across Canada.',
  },
]

export const homeTestimonials = [
  {
    quote:
      'I found a great administrative job within a week! Office Jobline made the process so easy and helped me connect with the right employer.',
    name: 'Jessica L.',
    location: 'Office Administrator, Toronto, ON',
    image: images.testimonialJessica,
  },
  {
    quote:
      'We posted a job and received excellent candidates quickly. Office Jobline is our go-to platform for hiring office talent.',
    name: 'Mark D.',
    location: 'HR Manager, Vancouver, BC',
    image: images.testimonialMark,
  },
]

export const homeArticles = [
  {
    tag: 'Job Seeker Tips',
    title: 'Resume Tips for Office Jobs',
    description: 'Learn how to craft a strong resume that gets noticed by office employers.',
    image: images.articleResumeTips,
    slug: 'resume-tips',
  },
  {
    tag: 'Career Advice',
    title: 'Interview Tips for Administrative Roles',
    description: 'Prepare with confidence and stand out in your next office job interview.',
    image: images.articleInterviewTips,
    slug: 'interview-tips',
  },
  {
    tag: 'For Employers',
    title: 'Hiring Support for Office Employers',
    description: 'Find the right office talent faster with expert hiring support and tools.',
    image: images.articleHiringSupport,
    slug: 'hiring-support',
  },
]

export const homeStats = [
  {
    icon: FiBriefcase,
    value: '10,000+',
    label: 'Office Jobs',
    caption: 'New opportunities added every day',
  },
  {
    icon: HiOutlineUserGroup,
    value: '2,000+',
    label: 'Employers',
    caption: 'Trusted companies hiring now',
  },
  {
    icon: GiMapleLeaf,
    value: 'Canada-Wide',
    label: 'Opportunities',
    caption: 'Find the right role wherever you are',
  },
]
