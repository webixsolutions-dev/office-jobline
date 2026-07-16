import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUserPlus,
  FiEdit3,
  FiCheckSquare,
  FiUsers,
  FiArrowRight,
  FiUserCheck,
  FiZap,
  FiGrid,
} from "react-icons/fi";
import { GiMapleLeaf } from "react-icons/gi";

const GREEN = "#0E5C4C";

const BuildingIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 21V9l6-4v4l6-4v16H3zm2-2h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm6 8h2v-2h-2v2zm0-4h2v-2h-2v2zm6 4h2v-9h-2v9z" />
  </svg>
);

const steps = [
  {
    number: 1,
    icon: <FiUserPlus size={26} />,
    title: "Create Employer Account",
    desc: "Sign up as an employer and set up your company profile in just a few easy steps.",
    path: "/signup"
  },
  {
    number: 2,
    icon: <FiEdit3 size={26} />,
    title: "Add Job Details",
    desc: "Fill in your job title, description, requirements, location, and compensation details.",
    path: "/post-a-job"
  },
  {
    number: 3,
    icon: <FiCheckSquare size={26} />,
    title: "Review & Publish",
    desc: "Review your listing and publish to make your job visible to thousands of job seekers.",
    path: "/post-a-job"
  },
  {
    number: 4,
    icon: <FiUsers size={26} />,
    title: "Receive Applications",
    desc: "Qualified candidates apply and you can review, shortlist, and connect with the right talent.",
    path: "/employers"
  },
];

const reasons = [
  {
    icon: <FiUserCheck size={22} />,
    title: "Qualified Office Talent",
    desc: "Access a pool of pre-screened candidates with office, administrative, and customer service experience.",
    path: "/employers"
  },
  {
    icon: <GiMapleLeaf size={22} />,
    title: "Canada-Wide Reach",
    desc: "Reach job seekers from Toronto to Vancouver and everywhere in between. Post nationwide with ease.",
    path: "/browse"
  },
  {
    icon: <FiZap size={22} />,
    title: "Fast Posting",
    desc: "Get your office job live in minutes and start receiving applications right away.",
    path: "/post-a-job"
  },
  {
    icon: <FiGrid size={22} />,
    title: "Simple Employer Dashboard",
    desc: "Manage your job postings, review applications, and communicate with candidates all in one place.",
    path: "/employers"
  },
];

const StepCard = ({ step, isLast, onClick }) => (
  <div className="flex items-center">
    <div 
      onClick={onClick}
      className="w-full cursor-pointer rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md hover:scale-[1.02] sm:p-7"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "#E4F0EC", color: GREEN }}>
        {step.icon}
      </div>
      <div
        className="mx-auto -mt-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: GREEN }}
      >
        {step.number}
      </div>
      <h3 className="mt-3 font-bold text-slate-900">{step.title}</h3>
      <p className="mt-2 text-sm text-slate-500">{step.desc}</p>
    </div>
    {!isLast && (
      <div className="mx-2 hidden flex-shrink-0 lg:block" style={{ color: GREEN }}>
        <FiArrowRight size={22} />
      </div>
    )}
  </div>
);

const ReasonCard = ({ icon, title, desc, onClick }) => (
  <div 
    onClick={onClick}
    className="cursor-pointer rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:scale-[1.02] sm:p-7"
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "#E4F0EC", color: GREEN }}>
      {icon}
    </div>
    <h4 className="mt-4 font-bold text-slate-900">{title}</h4>
    <div className="mt-1.5 h-0.5 w-8 bg-amber-400" />
    <p className="mt-3 text-sm text-slate-500">{desc}</p>
  </div>
);

export default function HowPostingWorks() {
  const navigate = useNavigate();

  // Handle Step Card Click
  const handleStepClick = (path) => {
    navigate(path);
  };

  // Handle Reason Card Click
  const handleReasonClick = (path) => {
    navigate(path);
  };

  // Handle CTA Button Click
  const handlePostJobToday = () => {
    navigate("/post-a-job");
  };

  return (
    <div className="font-sans">
      {/* How Posting Works */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">How Posting Works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Post your office or administrative job in minutes and connect with qualified
            professionals across Canada.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-4">
          {steps.map((s, i) => (
            <StepCard 
              key={s.number} 
              step={s} 
              isLast={i === steps.length - 1}
              onClick={() => handleStepClick(s.path)}
            />
          ))}
        </div>
      </section>

      {/* Why Employers Choose Office Jobline */}
      <section className="relative overflow-hidden bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <svg
          className="pointer-events-none absolute -right-10 top-10 h-64 w-64 opacity-[0.06]"
          viewBox="0 0 100 100"
          fill="#0B1B3A"
        >
          <path d="M50 5c5 15 20 20 20 35 0 8-6 14-14 14 2 6 8 10 8 10H36s6-4 8-10c-8 0-14-6-14-14 0-15 15-20 20-35z" />
        </svg>

        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Why Employers Choose Office Jobline
          </h2>
          <p className="mt-3 text-slate-500">
            The trusted platform for hiring office and administrative professionals across
            Canada.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <ReasonCard 
              key={r.title} 
              {...r} 
              onClick={() => handleReasonClick(r.path)}
            />
          ))}
        </div>

        {/* CTA bar */}
        <div className="relative mx-auto mt-8 flex max-w-7xl flex-col items-start gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: GREEN }}>
              <BuildingIcon className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 sm:text-lg">
                Ready to Hire Top Office &amp; Administrative Talent?
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Join thousands of Canadian employers who trust Office Jobline to find the right
                people, faster.
              </p>
            </div>
          </div>
          <button
            onClick={handlePostJobToday}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: GREEN }}
          >
            Post Your Job Today <FiArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}