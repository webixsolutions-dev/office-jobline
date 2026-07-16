import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBriefcase,
  FiUser,
  FiMenu,
  FiX,
  FiSearch,
  FiMapPin,
  FiClock,
  FiHome,
  FiBarChart2,
  FiFileText,
  FiStar,
  FiUsers,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiGlobe,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiMapleLeaf } from "react-icons/gi";
import {
  browseContent,
  browseStats,
  browseTrustPills,
  filterOptions,
  browseImage,
} from "../../data/browse";

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

const FilterPill = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
      isActive
        ? "border-emerald-700 bg-emerald-50 text-emerald-800"
        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-700 hover:text-emerald-800"
    }`}
  >
    {icon} {label}
  </button>
);

const Stat = ({ icon, value, title, children, onClick }) => (
  <div 
    onClick={onClick}
    className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02] sm:p-6"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#E4F0EC" }}>
      <span style={{ color: GREEN }}>{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-extrabold" style={{ color: GREEN }}>
        {value}
      </p>
      <p className="font-bold text-slate-900">{title}</p>
      <p className="mt-0.5 text-sm text-slate-500">{children}</p>
    </div>
  </div>
);

const Trust = ({ icon, title, children, onClick }) => (
  <div 
    onClick={onClick}
    className="flex cursor-pointer items-start gap-3 transition-opacity hover:opacity-80"
  >
    <span className="mt-0.5 flex-shrink-0" style={{ color: GREEN }}>
      {icon}
    </span>
    <div>
      <p className="font-bold text-slate-900">{title}</p>
      <p className="text-sm text-slate-500">{children}</p>
    </div>
  </div>
);

export default function BrowseHero() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  // Handle Search
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchKeyword.trim()) params.append("keyword", searchKeyword.trim());
    if (searchLocation.trim()) params.append("location", searchLocation.trim());
    if (activeFilters.length > 0) params.append("filters", activeFilters.join(","));
    
    navigate(`/browse?${params.toString()}`);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle filter toggle
  const handleFilterToggle = (filterValue) => {
    setActiveFilters((prev) =>
      prev.includes(filterValue)
        ? prev.filter((f) => f !== filterValue)
        : [...prev, filterValue]
    );
  };

  // Handle Stat clicks
  const handleStatClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-slate-50 font-sans">
      <section className="relative overflow-hidden">
        <div className="grid gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
          {/* Left */}
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold sm:text-sm"
              style={{ backgroundColor: "#E4F0EC", color: GREEN }}
            >
              <FiStar /> {browseContent.badge}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              {browseContent.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-500 sm:text-base">
              {browseContent.description}
            </p>
          </div>

          {/* Right image */}
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl sm:min-h-[300px] lg:min-h-[380px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${browseImage}")`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {/* Search bar */}
        <div className="mx-4 -mt-2 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-slate-100 sm:mx-6 sm:p-6 lg:mx-8">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
              <FiSearch className="text-slate-400" />
              <input
                type="text"
                placeholder={browseContent.searchPlaceholder}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5">
              <FiMapPin className="text-slate-400" />
              <input
                type="text"
                placeholder={browseContent.locationPlaceholder}
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: GREEN }}
            >
              <FiSearch /> {browseContent.searchButton}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            <span className="text-xs font-semibold text-slate-500 sm:text-sm">Filter by:</span>
            {filterOptions.map((filter) => (
              <FilterPill
                key={filter.value}
                icon={<filter.icon />}
                label={filter.label}
                isActive={activeFilters.includes(filter.value)}
                onClick={() => handleFilterToggle(filter.value)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {browseStats.map((stat) => (
            <Stat
              key={stat.title}
              icon={<stat.icon size={22} />}
              value={stat.value}
              title={stat.title}
              onClick={() => handleStatClick(stat.path)}
            >
              {stat.desc}
            </Stat>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:flex-row sm:justify-between sm:p-8">
          {browseTrustPills.map((pill) => (
            <Trust
              key={pill.title}
              icon={<pill.icon size={20} />}
              title={pill.title}
              onClick={() => navigate(pill.path)}
            >
              {pill.desc}
            </Trust>
          ))}
        </div>
      </section>
    </div>
  );
}