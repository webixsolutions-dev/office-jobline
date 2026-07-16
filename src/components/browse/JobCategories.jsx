import React from "react";
import { useNavigate } from "react-router-dom";
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
  FiSearch,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { FaCalculator, FaUserTie, FaConciergeBell, FaIdCard } from "react-icons/fa";
import {
  jobCategories,
  featuredEmployers,
  cities,
  categoryCTA,
} from "../../data/job";

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

const CategoryCard = ({ icon, title, jobs, onClick }) => (
  <div 
    onClick={onClick}
    className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:scale-[1.02] sm:p-6"
  >
    <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: "#E4F0EC", color: GREEN }}>
      {icon}
    </div>
    <h4 className="mt-3 font-bold text-slate-900">{title}</h4>
    <p className="mt-1 text-sm text-slate-500">{jobs}</p>
  </div>
);

const EmployerCard = ({ name, jobs, location, color, mark, onClick }) => (
  <div 
    onClick={onClick}
    className="cursor-pointer rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:scale-[1.02] sm:p-6"
  >
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

const CityCard = ({ name, jobs, onClick }) => (
  <div 
    onClick={onClick}
    className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:scale-[1.02]"
  >
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
  const navigate = useNavigate();

  // Handle category click
  const handleCategoryClick = (categoryTitle) => {
    navigate(`/browse?category=${encodeURIComponent(categoryTitle)}`);
  };

  // Handle employer click
  const handleEmployerClick = (employerName) => {
    navigate(`/employers?company=${encodeURIComponent(employerName)}`);
  };

  // Handle city click
  const handleCityClick = (cityName) => {
    navigate(`/browse?location=${encodeURIComponent(cityName)}`);
  };

  // Handle View More Employers
  const handleViewMoreEmployers = () => {
    navigate("/employers");
  };

  // Handle View All Cities
  const handleViewAllCities = () => {
    navigate("/browse");
  };

  // Handle Create Job Alert
  const handleCreateJobAlert = () => {
    navigate("/signup");
  };

  // Handle Upload Resume
  const handleUploadResume = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-slate-50 font-sans">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{jobCategories.title}</h2>
        <p className="mt-2 text-slate-500">{jobCategories.description}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {jobCategories.items.map((c) => (
            <CategoryCard 
              key={c.title} 
              icon={<c.icon />}
              title={c.title}
              jobs={c.jobs}
              onClick={() => handleCategoryClick(c.title)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{featuredEmployers.title}</h2>
        <p className="mt-2 text-slate-500">{featuredEmployers.description}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredEmployers.items.map((e) => (
            <EmployerCard 
              key={e.name} 
              {...e} 
              onClick={() => handleEmployerClick(e.name)}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button 
            onClick={handleViewMoreEmployers}
            className="inline-flex items-center gap-1 text-sm font-semibold transition hover:opacity-80" 
            style={{ color: GREEN }}
          >
            {featuredEmployers.viewMore} <FiArrowRight />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{cities.title}</h2>
        <p className="mt-2 text-slate-500">{cities.description}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cities.items.map((c) => (
            <CityCard 
              key={c.name} 
              {...c} 
              onClick={() => handleCityClick(c.name)}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <button 
            onClick={handleViewAllCities}
            className="inline-flex items-center gap-1 text-sm font-semibold transition hover:opacity-80" 
            style={{ color: GREEN }}
          >
            {cities.viewAll} <FiArrowRight />
          </button>
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
              <h3 className="text-xl font-extrabold text-white sm:text-2xl">{categoryCTA.title}</h3>
              <p className="mt-1 max-w-lg text-sm text-emerald-100">
                {categoryCTA.description}
              </p>
            </div>
          </div>
          <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button 
              onClick={handleCreateJobAlert}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0B1B3A] transition hover:bg-amber-300"
            >
              <FiBell /> {categoryCTA.alertButton}
            </button>
            <button 
              onClick={handleUploadResume}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <FiUpload /> {categoryCTA.uploadButton}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}