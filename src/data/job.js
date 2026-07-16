// src/data/jobs.js

import {
  FiBriefcase,
  FiUser,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiClock,
  FiHome,
  FiBarChart2,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaCalculator, FaConciergeBell, FaIdCard } from "react-icons/fa";

// ============================================
// JOB CATEGORIES
// ============================================
export const jobCategories = {
  title: "Popular Office Job Categories",
  description: "Explore the most in-demand office and administrative jobs across Canada.",
  items: [
    { icon: FiUser, title: "Administrative Assistant", jobs: "3,245 jobs", path: "/browse" },
    { icon: FaConciergeBell, title: "Receptionist", jobs: "1,892 jobs", path: "/browse" },
    { icon: FiBriefcase, title: "Executive Assistant", jobs: "1,567 jobs", path: "/browse" },
    { icon: FiUsers, title: "Office Manager", jobs: "1,234 jobs", path: "/browse" },
    { icon: FiFileText, title: "Data Entry", jobs: "2,345 jobs", path: "/browse" },
    { icon: FiHeadphones, title: "Customer Service", jobs: "2,789 jobs", path: "/browse" },
    { icon: FaCalculator, title: "Payroll Clerk", jobs: "987 jobs", path: "/browse" },
    { icon: FaIdCard, title: "HR Support", jobs: "1,114 jobs", path: "/browse" },
  ],
};

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
// CATEGORY CTA
// ============================================
export const categoryCTA = {
  title: "Don't Miss Your Next Opportunity",
  description: "Create job alerts and be the first to know about new office jobs that match your skills and experience.",
  alertButton: "Create Job Alert",
  uploadButton: "Upload Your Resume",
};

// ============================================
// FEATURED JOBS
// ============================================
export const featuredJobs = [
  { 
    id: 1,
    title: "Administrative Assistant", 
    company: "Maple Ridge Solutions", 
    initials: "M", 
    color: "#0B1B3A", 
    location: "Toronto, ON", 
    type: "Full-time", 
    mode: "On-site", 
    pay: "$45,000 - $55,000 / year", 
    desc: "Provide administrative support to ensure efficient daily office operations. Manage schedules, correspondence, and documentation with professionalism and attention to detail." 
  },
  { 
    id: 2,
    title: "Receptionist", 
    company: "Greenfield Offices", 
    initials: "G", 
    color: "#DFF3E8", 
    location: "Vancouver, BC", 
    type: "Full-time", 
    mode: "On-site", 
    pay: "$40,000 - $48,000 / year", 
    desc: "Greet visitors, answer calls, and provide general administrative support. Maintain a welcoming front desk and ensure smooth office operations." 
  },
  { 
    id: 3,
    title: "Office Coordinator", 
    company: "Summit Business Group", 
    initials: "S", 
    color: "#0B1B3A", 
    location: "Calgary, AB", 
    type: "Full-time", 
    mode: "Hybrid", 
    pay: "$50,000 - $60,000 / year", 
    desc: "Coordinate office activities, manage calendars, and support team members. Ensure efficient workflows and a well-organized office environment." 
  },
  { 
    id: 4,
    title: "Executive Assistant", 
    company: "NorthPoint Consulting", 
    initials: "N", 
    color: "#0B1B3A", 
    location: "Ottawa, ON", 
    type: "Full-time", 
    mode: "Hybrid", 
    pay: "$60,000 - $75,000 / year", 
    desc: "Provide high-level administrative support to executives. Manage schedules, travel arrangements, and confidential documents with discretion." 
  },
  { 
    id: 5,
    title: "Data Entry Clerk", 
    company: "ProData Services", 
    initials: "P", 
    color: "#0E5C4C", 
    location: "Montreal, QC", 
    type: "Part-time", 
    mode: "On-site", 
    pay: "$38,000 - $45,000 / year", 
    desc: "Accurately input and maintain data in databases and systems. Ensure data quality and support reporting requirements." 
  },
  { 
    id: 6,
    title: "Customer Service Representative", 
    company: "Bright Customer Care", 
    initials: "B", 
    color: "#F0B429", 
    location: "Halifax, NS", 
    type: "Full-time", 
    mode: "Hybrid", 
    pay: "$42,000 - $52,000 / year", 
    desc: "Assist customers via phone, email, and chat. Resolve inquiries and provide excellent service to ensure customer satisfaction." 
  },
  { 
    id: 7,
    title: "HR Assistant", 
    company: "People First HR", 
    initials: "P", 
    color: "#7C3AED", 
    location: "Edmonton, AB", 
    type: "Full-time", 
    mode: "On-site", 
    pay: "$45,000 - $55,000 / year", 
    desc: "Support HR functions including recruitment, onboarding, and employee records management. Help foster a positive workplace." 
  },
  { 
    id: 8,
    title: "Office Manager", 
    company: "Alpine Corporate Services", 
    initials: "A", 
    color: "#0B1B3A", 
    location: "Winnipeg, MB", 
    type: "Full-time", 
    mode: "On-site", 
    pay: "$65,000 - $80,000 / year", 
    desc: "Oversee daily office operations, manage budgets, and lead administrative staff. Ensure efficiency and a productive work environment." 
  },
];

// ============================================
// FILTER OPTIONS
// ============================================
export const filterOptions = [
  { icon: FiBriefcase, label: "Full-Time", value: "full-time" },
  { icon: FiClock, label: "Part-Time", value: "part-time" },
  { icon: FiHome, label: "Remote", value: "remote" },
  { icon: HiOutlineOfficeBuilding, label: "Hybrid", value: "hybrid" },
  { icon: FiBarChart2, label: "Entry Level", value: "entry-level" },
  { icon: FiFileText, label: "Contract", value: "contract" },
];

// ============================================
// FILTER GROUPS
// ============================================
export const filterGroups = {
  jobType: [
    ["Full-time", "6,234"],
    ["Part-time", "1,842"],
    ["Contract", "1,256"],
    ["Temporary", "668"],
    ["Internship", "312"],
  ],
  workMode: [
    ["On-site", "6,078"],
    ["Hybrid", "1,876"],
    ["Remote", "1,102"],
  ],
  experience: [
    ["Entry Level", "2,356"],
    ["1-3 Years", "3,412"],
    ["3-5 Years", "2,648"],
    ["5+ Years", "1,596"],
  ],
};

// ============================================
// JOB TYPES & SALARY RANGES
// ============================================
export const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Freelance",
];

export const salaryRanges = [
  "$30,000 - $40,000",
  "$40,000 - $50,000",
  "$50,000 - $60,000",
  "$60,000 - $75,000",
  "$75,000 - $90,000",
  "$90,000 - $110,000",
  "$110,000+",
];