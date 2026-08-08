import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaCommentDots, FaUsers, FaBolt, FaChartBar, FaUserTie } from "react-icons/fa";
import { GiMapleLeaf } from "react-icons/gi";

// ✅ Data directly in component - No import from data/employers

// ============================================
// FEATURES DATA
// ============================================
const features = [
  {
    icon: <FaUsers className="text-teal-800 text-2xl" />,
    title: "Qualified",
    titleAccent: "Office Candidates",
    desc: "Access pre-screened office and administrative professionals ready to contribute.",
    path: "/employers"
  },
  {
    icon: <FaBolt className="text-teal-800 text-2xl" />,
    title: "Fast",
    titleAccent: "Job Posting",
    desc: "Post jobs in minutes and start receiving qualified applications right away.",
    path: "/post-a-job"
  },
  {
    icon: <GiMapleLeaf className="text-teal-800 text-2xl" />,
    title: "Canada-Wide",
    titleAccent: "Reach",
    desc: "Reach job seekers from every province and territory with one simple post.",
    path: "/browse"
  },
  {
    icon: <FaChartBar className="text-teal-800 text-2xl" />,
    title: "Easy Employer",
    titleAccent: "Dashboard",
    desc: "Manage jobs, track applicants and communicate—all from one intuitive dashboard.",
    path: "/employers"
  },
];

// ============================================
// EMPLOYER STATS
// ============================================
const employerStats = [
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

// ============================================
// FEATURED EMPLOYERS
// ============================================
const featuredEmployers = {
  title: "Featured Employers Hiring Office Talent",
  description: "Trusted Canadian companies actively hiring office and administrative professionals.",
  viewMore: "View More Employers",
  items: [
    { name: "RBC", jobs: "120+ Office Jobs", location: "Toronto, ON", color: "#0B4FA0", mark: "RBC" },
    { name: "Scotiabank", jobs: "85+ Office Jobs", location: "Across Canada", color: "#D3222A", mark: "S" },
    { name: "TD Bank Group", jobs: "90+ Office Jobs", location: "Across Canada", color: "#17A24A", mark: "TD" },
    { name: "Sun Life", jobs: "60+ Office Jobs", location: "Toronto, ON", color: "#F5A623", mark: "☀" },
    { name: "TELUS", jobs: "70+ Office Jobs", location: "Vancouver, BC", color: "#4B2E83", mark: "T" },
    { name: "Loblaw Companies Limited", jobs: "55+ Office Jobs", location: "Brampton, ON", color: "#1A1A1A", mark: "L" },
  ],
};

// ============================================
// CITIES DATA
// ============================================
const cities = {
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
// PROVINCES DATA
// ============================================
const provinces = [
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
// EMPLOYER CTA
// ============================================
const employerCTA = {
  title: "Ready to Hire Office Talent Across Canada?",
  description: "Post your job and connect with qualified office professionals from coast to coast.",
  postButton: { label: "Post a Job", path: "/post-a-job" },
  salesButton: { label: "Contact Sales", path: "/contact-us" },
};

export default function EmployerHero() {
  const navigate = useNavigate();

  // Handle Post a Job
  const handlePostJob = () => {
    navigate("/post-a-job");
  };

  // Handle Talk to Sales
  const handleTalkToSales = () => {
    navigate("/contact-us");
  };

  // Handle Feature Card Click
  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <section className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 sm:px-10 py-12 lg:py-20 items-center">
          <div>
            <p className="text-yellow-500 font-semibold tracking-wide text-sm mb-3">
              FOR EMPLOYERS
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Hire Office &amp; Administrative Talent Across Canada
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-xl">
              Post your jobs and connect with qualified office professionals across
              Canada. Recruit office managers, receptionists, administrative
              assistants, executive assistants, data entry clerks, customer service
              representatives, payroll clerks, and coordinators—faster and easier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handlePostJob}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-md transition"
              >
                <FaBriefcase /> Post a Job
              </button>
              <button 
                onClick={handleTalkToSales}
                className="flex items-center justify-center gap-2 bg-teal-800 hover:bg-teal-900 text-white font-semibold px-6 py-3 rounded-md transition"
              >
                <FaCommentDots /> Talk to Sales
              </button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden h-64 sm:h-80 lg:h-[420px]">
            <img
              src="https://plus.unsplash.com/premium_photo-1661775434014-9c0e8d71de03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlJTIwc3RhZmYlMjBvaWN8ZW58MHx8MHx8fDA%3D"
              alt="Office employers collaborating"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => handleFeatureClick(f.path)}
              className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition cursor-pointer hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {f.title}{" "}
                <span className="text-teal-800 border-b-2 border-yellow-400">
                  {f.titleAccent}
                </span>
              </h3>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}