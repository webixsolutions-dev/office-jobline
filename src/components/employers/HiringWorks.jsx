import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaFileAlt,
  FaUsers,
  FaCheckCircle,
  FaChevronRight,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-teal-800 text-2xl" />,
    title: "Create Employer Account",
    desc: "Sign up in minutes and set up your company profile.",
    path: "/signup"
  },
  {
    icon: <FaFileAlt className="text-teal-800 text-2xl" />,
    title: "Post Your Office Job",
    desc: "Add job details and reach qualified candidates fast.",
    path: "/post-a-job"
  },
  {
    icon: <FaUsers className="text-teal-800 text-2xl" />,
    title: "Review Applicants",
    desc: "Access applications, screen candidates, and shortlist top prospects.",
    path: "/employers"
  },
  {
    icon: <FaCheckCircle className="text-teal-800 text-2xl" />,
    title: "Hire Faster",
    desc: "Connect with the right talent and fill your roles with confidence.",
    path: "/employers"
  },
];

const whyChoose = [
  {
    icon: <FaUsers className="text-teal-800 text-2xl" />,
    title: "Applicant Tracking",
    desc: "Manage applications, track candidate progress, and stay organized.",
    path: "/employers"
  },
  {
    icon: <FaBuilding className="text-teal-800 text-2xl" />,
    title: "Employer Branding",
    desc: "Showcase your company culture and attract the right office professionals.",
    path: "/employers"
  },
  {
    icon: <FaMapMarkerAlt className="text-teal-800 text-2xl" />,
    title: "Targeted Job Reach",
    desc: "Reach qualified office and administrative candidates across Canada.",
    path: "/browse"
  },
  {
    icon: <FaUsers className="text-teal-800 text-2xl" />,
    title: "Easy Team Collaboration",
    desc: "Invite your team, share feedback, and hire with confidence.",
    path: "/employers"
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();

  // Handle Step Card Click
  const handleStepClick = (path) => {
    navigate(path);
  };

  // Handle Why Choose Card Click
  const handleWhyChooseClick = (path) => {
    navigate(path);
  };

  // Handle Start Hiring Button
  const handleStartHiring = () => {
    navigate("/post-a-job");
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            How Hiring Works
          </h2>
          <p className="text-slate-600">
            Simple steps to find the right office and administrative talent in Canada.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-20">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div 
                onClick={() => handleStepClick(s.path)}
                className="flex-1 border border-slate-200 rounded-lg p-6 relative cursor-pointer transition hover:shadow-md hover:scale-[1.02]"
              >
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-teal-800 text-white text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center text-slate-300 text-xl">
                  <FaChevronRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="text-center mb-12">
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            Why Employers Choose Office Jobline
          </h2>
          <p className="text-slate-600">
            Everything you need to hire top office and administrative talent across
            Canada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {whyChoose.map((f, i) => (
            <div
              key={i}
              onClick={() => handleWhyChooseClick(f.path)}
              className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition cursor-pointer hover:scale-[1.02]"
            >
              <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="relative bg-teal-800 rounded-xl overflow-hidden px-6 sm:px-10 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center shrink-0">
              <FaBuilding className="text-yellow-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
                Ready to build a stronger office team?
              </h3>
              <p className="text-teal-100 text-sm sm:text-base">
                Join thousands of Canadian employers hiring top office and
                administrative talent every day.
              </p>
            </div>
          </div>
          <button 
            onClick={handleStartHiring}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-md whitespace-nowrap transition"
          >
            Start Hiring Today <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}