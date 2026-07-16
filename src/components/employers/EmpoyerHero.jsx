import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaCommentDots, FaUsers, FaBolt, FaChartBar } from "react-icons/fa";
import { GiMapleLeaf } from "react-icons/gi";

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