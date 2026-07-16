// src/data/browse.js

import {
  FiBriefcase,
  FiClock,
  FiHome,
  FiBarChart2,
  FiFileText,
  FiUsers,
  FiShield,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiMapleLeaf } from "react-icons/gi";

export const browseContent = {
  badge: "Canada's Trusted Office Job Board",
  title: "Browse Office & Administrative Jobs Across Canada",
  description:
    "Find office jobs, administrative jobs, receptionist jobs, executive assistant jobs, office coordinator jobs, data entry jobs, customer service office roles, and office manager jobs with top employers hiring across Canada.",
  searchPlaceholder: "Job title, keyword or company",
  locationPlaceholder: "City, province or region",
  searchButton: "Search Jobs",
};

export const browseImage =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80";

export const filterOptions = [
  { icon: FiBriefcase, label: "Full-Time", value: "full-time" },
  { icon: FiClock, label: "Part-Time", value: "part-time" },
  { icon: FiHome, label: "Remote", value: "remote" },
  { icon: HiOutlineOfficeBuilding, label: "Hybrid", value: "hybrid" },
  { icon: FiBarChart2, label: "Entry Level", value: "entry-level" },
  { icon: FiFileText, label: "Contract", value: "contract" },
];

export const browseStats = [
  {
    icon: FiBriefcase,
    value: "10,248+",
    title: "Active Office Jobs",
    desc: "New office & administrative jobs posted every day.",
    path: "/browse",
  },
  {
    icon: FiUsers,
    value: "2,350+",
    title: "Employers Hiring",
    desc: "Trusted companies actively hiring across Canada.",
    path: "/employers",
  },
  {
    icon: GiMapleLeaf,
    value: "",
    title: "Canada-Wide Opportunities",
    desc: "Find the right job wherever you are in Canada.",
    path: "/browse",
  },
];

export const browseTrustPills = [
  {
    icon: FiShield,
    title: "100% Free for Job Seekers",
    desc: "Browse and apply to jobs at no cost.",
    path: "/browse",
  },
  {
    icon: FiLock,
    title: "Secure & Private",
    desc: "Your data is safe and never shared.",
    path: "/about-us",
  },
  {
    icon: FiCheckCircle,
    title: "Trusted by Thousands",
    desc: "Thousands of professionals find jobs every month.",
    path: "/browse",
  },
];