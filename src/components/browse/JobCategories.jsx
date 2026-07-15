import React, { useState } from "react";
import {
  FiBriefcase,
  FiUser,
  FiMenu,
  FiX,
  FiUsers,
  FiFileText,
  FiHeadphones,
  FiArrowRight,
  FiBell,
  FiUpload,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaCalculator, FaUserTie, FaConciergeBell, FaIdCard } from "react-icons/fa";

const GREEN = "#0E5C4C";

const BuildingIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M3 21V9l6-4v4l6-4v16H3zm2-2h2v-2H5v2zm0-4h2v-2H5v2zm0-4h2V9H5v2zm6 8h2v-2h-2v2zm0-4h2v-2h-2v2zm6 4h2v-9h-2v9zM18 2l1 2 2 .3-1.5 1.4.4 2.1L18 6.7 16.1 7.8l.4-2.1L15 4.3 17 4l1-2z" />
  </svg>
);

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-amber-400">
      <BuildingIcon className="h-6 w-6 text-amber-400" />
    </div>
    <span className="text-xl font-extrabold tracking-tight text-white">Office Jobline</span>
  </div>
);



const categories = [
  { icon: <FiUser />, title: "Administrative Assistant", jobs: "3,245 jobs" },
  { icon: <FaConciergeBell />, title: "Receptionist", jobs: "1,892 jobs" },
  { icon: <FiBriefcase />, title: "Executive Assistant", jobs: "1,567 jobs" },
  { icon: <FiUsers />, title: "Office Manager", jobs: "1,234 jobs" },
  { icon: <FiFileText />, title: "Data Entry", jobs: "2,345 jobs" },
  { icon: <FiHeadphones />, title: "Customer Service", jobs: "2,789 jobs" },
  { icon: <FaCalculator />, title: "Payroll Clerk", jobs: "987 jobs" },
  { icon: <FaIdCard />, title: "HR Support", jobs: "1,114 jobs" },
];

const employers = [
  { name: "RBC", jobs: "120+ Office Jobs", location: "Toronto, ON", color: "#0B4FA0", mark: "RBC" },
  { name: "Scotiabank", jobs: "85+ Office Jobs", location: "Across Canada", color: "#D3222A", mark: "S" },
  { name: "TD Bank Group", jobs: "90+ Office Jobs", location: "Across Canada", color: "#17A24A", mark: "TD" },
  { name: "Sun Life", jobs: "60+ Office Jobs", location: "Toronto, ON", color: "#F5A623", mark: "☀" },
  { name: "TELUS", jobs: "70+ Office Jobs", location: "Vancouver, BC", color: "#4B2E83", mark: "T" },
  { name: "Loblaw Companies Limited", jobs: "55+ Office Jobs", location: "Brampton, ON", color: "#1A1A1A", mark: "L" },
];

const cities = [
  { name: "Toronto, ON", jobs: "4,512 jobs" },
  { name: "Calgary, AB", jobs: "1,893 jobs" },
  { name: "Vancouver, BC", jobs: "2,104 jobs" },
  { name: "Edmonton, AB", jobs: "1,245 jobs" },
  { name: "Winnipeg, MB", jobs: "876 jobs" },
  { name: "Ottawa, ON", jobs: "1,621 jobs" },
];

const CategoryCard = ({ icon, title, jobs }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md sm:p-6">
    <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: "#E4F0EC", color: GREEN }}>
      {icon}
    </div>
    <h4 className="mt-3 font-bold text-slate-900">{title}</h4>
    <p className="mt-1 text-sm text-slate-500">{jobs}</p>
  </div>
);

const EmployerCard = ({ name, jobs, location, color, mark }) => (
  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">
    <div
      className="flex h-10 w-16 items-center justify-center rounded-md text-xs font-extrabold text-white"
      style={{ backgroundColor: color }}
    >
      {mark}
    </div>
    <h4 className="mt-3 font-bold text-slate-900">{name}</h4>
    <p className="text-sm" style={{ color: GREEN }}>
      {jobs}
    </p>
    <p className="mt-1 text-xs text-slate-400">{location}</p>
  </div>
);

const CityCard = ({ name, jobs }) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
    <div className="flex h-24 items-center justify-center bg-slate-50">
      <svg viewBox="0 0 120 60" className="h-16 w-28" style={{ color: GREEN }} fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="20" width="10" height="30" />
        <rect x="24" y="10" width="10" height="40" />
        <rect x="38" y="26" width="10" height="24" />
        <rect x="52" y="4" width="10" height="46" />
        <rect x="66" y="18" width="10" height="32" />
        <rect x="80" y="14" width="10" height="36" />
        <rect x="94" y="24" width="10" height="26" />
        <line x1="4" y1="50" x2="116" y2="50" />
      </svg>
    </div>
    <div className="p-4">
      <h4 className="font-bold text-slate-900">{name}</h4>
      <p className="text-sm text-slate-500">{jobs}</p>
    </div>
  </div>
);

export default function JobCategories() {
  return (
    <div className="bg-slate-50 font-sans">

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Popular Office Job Categories</h2>
        <p className="mt-2 text-slate-500">Explore the most in-demand office and administrative jobs across Canada.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <CategoryCard key={c.title} {...c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Featured Employers Hiring Office Talent</h2>
        <p className="mt-2 text-slate-500">Trusted Canadian companies actively hiring office and administrative professionals.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {employers.map((e) => (
            <EmployerCard key={e.name} {...e} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: GREEN }}>
            View More Employers <FiArrowRight />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Browse Office Jobs by City</h2>
        <p className="mt-2 text-slate-500">Find office and administrative jobs in Canada's top cities.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cities.map((c) => (
            <CityCard key={c.name} {...c} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: GREEN }}>
            View All Cities <FiArrowRight />
          </a>
        </div>
      </section>

      {/* CTA banner */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div
          className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 overflow-hidden rounded-2xl px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10"
          style={{ backgroundColor: GREEN }}
        >
          <svg className="pointer-events-none absolute -right-4 bottom-0 h-full w-40 opacity-20" viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="1.5">
            <rect x="10" y="30" width="14" height="70" />
            <rect x="30" y="15" width="14" height="85" />
            <rect x="50" y="40" width="14" height="60" />
            <rect x="70" y="25" width="14" height="75" />
          </svg>
          <div className="relative flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
              <FiBell size={20} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white sm:text-2xl">Don't Miss Your Next Opportunity</h3>
              <p className="mt-1 max-w-lg text-sm text-emerald-100">
                Create job alerts and be the first to know about new office jobs that match your
                skills and experience.
              </p>
            </div>
          </div>
          <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button className="flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-300">
              <FiBell /> Create Job Alert
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              <FiUpload /> Upload Your Resume
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
