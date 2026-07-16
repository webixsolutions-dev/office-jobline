// src/data/employers.js

import { 
  FaUsers, 
  FaBolt, 
  FaChartBar,
  FaUserTie,
} from "react-icons/fa";
import { GiMapleLeaf } from "react-icons/gi";

// ============================================
// FEATURED EMPLOYERS
// ============================================
export const featuredEmployers = {
  title: "Featured Employers Hiring Office Talent",
  description: "Trusted Canadian companies actively hiring office and administrative professionals.",
  viewMore: "View More Employers",
  items: [
    { name: "RBC", jobs: "120+ Office Jobs", location: "Toronto, ON", color: "#0B4FA0", mark: "RBC", path: "/employers" },
    { name: "Scotiabank", jobs: "85+ Office Jobs", location: "Across Canada", color: "#D3222A", mark: "S", path: "/employers" },
    { name: "TD Bank Group", jobs: "90+ Office Jobs", location: "Across Canada", color: "#17A24A", mark: "TD", path: "/employers" },
    { name: "Sun Life", jobs: "60+ Office Jobs", location: "Toronto, ON", color: "#F5A623", mark: "☀", path: "/employers" },
    { name: "TELUS", jobs: "70+ Office Jobs", location: "Vancouver, BC", color: "#4B2E83", mark: "T", path: "/employers" },
    { name: "Loblaw Companies Limited", jobs: "55+ Office Jobs", location: "Brampton, ON", color: "#1A1A1A", mark: "L", path: "/employers" },
  ],
};

// ============================================
// CITIES
// ============================================
export const cities = {
  title: "Browse Office Jobs by City",
  description: "Find office and administrative jobs in Canada's top cities.",
  viewAll: "View All Cities",
  items: [
    { name: "Toronto, ON", jobs: "4,512 jobs", path: "/browse" },
    { name: "Calgary, AB", jobs: "1,893 jobs", path: "/browse" },
    { name: "Vancouver, BC", jobs: "2,104 jobs", path: "/browse" },
    { name: "Edmonton, AB", jobs: "1,245 jobs", path: "/browse" },
    { name: "Winnipeg, MB", jobs: "876 jobs", path: "/browse" },
    { name: "Ottawa, ON", jobs: "1,621 jobs", path: "/browse" },
  ],
};

// ============================================
// EMPLOYER FEATURES (For EmployerHero)
// ============================================
export const employerFeatures = {
  title: "Why Employers Choose Office Jobline",
  description: "The trusted platform for hiring office and administrative professionals across Canada.",
  items: [
    {
      icon: FaUsers,
      title: "Qualified",
      titleAccent: "Office Candidates",
      desc: "Access pre-screened office and administrative professionals ready to contribute.",
      path: "/employers"
    },
    {
      icon: FaBolt,
      title: "Fast",
      titleAccent: "Job Posting",
      desc: "Post jobs in minutes and start receiving qualified applications right away.",
      path: "/post-a-job"
    },
    {
      icon: GiMapleLeaf,
      title: "Canada-Wide",
      titleAccent: "Reach",
      desc: "Reach job seekers from every province and territory with one simple post.",
      path: "/browse"
    },
    {
      icon: FaChartBar,
      title: "Easy Employer",
      titleAccent: "Dashboard",
      desc: "Manage jobs, track applicants and communicate—all from one intuitive dashboard.",
      path: "/employers"
    },
  ],
};

// ============================================
// PROVINCES (For JobListings Filter) -
// ============================================
export const provinces = [
  "Ontario",
  "British Columbia",
  "Alberta",
  "Quebec",
  "Manitoba",
  "Saskatchewan",
  "Nova Scotia",        
  "New Brunswick",
  "Newfoundland and Labrador",
  "Prince Edward Island",
  "Yukon",
  "Northwest Territories",
  "Nunavut",
];

// ============================================
// EMPLOYER CTA (For EmployerCTA)
// ============================================
export const employerCTA = {
  title: "Ready to Hire Office Talent Across Canada?",
  description: "Post your job and connect with qualified office professionals from coast to coast.",
  postButton: { label: "Post a Job", path: "/post-a-job", icon: "FiBriefcase" },
  salesButton: { label: "Contact Sales", path: "/contact-us", icon: "FiPhoneAlt" },
};

// ============================================
// EMPLOYER STATS (For EmployerHero)
// ============================================
export const employerStats = [
  {
    icon: FaUsers,
    value: "10,248+",
    label: "Active Office Jobs",
    desc: "New office & administrative jobs posted every day.",
  },
  {
    icon: FaUserTie,
    value: "2,350+",
    label: "Employers Hiring",
    desc: "Trusted companies actively hiring across Canada.",
  },
  {
    icon: GiMapleLeaf,
    value: "",
    label: "Canada-Wide Opportunities",
    desc: "Find the right job wherever you are in Canada.",
  },
];