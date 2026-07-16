import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiArrowRight } from "react-icons/fi";
import { FiBriefcase } from "react-icons/fi";
import { HiOutlineUserGroup, HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiMapleLeaf } from "react-icons/gi";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useState } from 'react';

const STATS = [
  {
    icon: FiBriefcase,
    value: "10,000+",
    label: "Office Jobs",
    desc: "New opportunities added every day",
    path: "/browse"
  },
  {
    icon: HiOutlineUserGroup,
    value: "2,000+",
    label: "Employers",
    desc: "Trusted companies hiring now",
    path: "/employers"
  },
  {
    icon: GiMapleLeaf,
    value: "Canada-Wide",
    label: "Opportunities",
    desc: "Find the right role wherever you are",
    path: "/browse"
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Handle Search
  const handleSearch = () => {
    if (searchKeyword.trim() || searchLocation.trim()) {
      navigate(`/browse?keyword=${encodeURIComponent(searchKeyword)}&location=${encodeURIComponent(searchLocation)}`);
    } else {
      navigate('/browse');
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle Stats click
  const handleStatClick = (path) => {
    navigate(path);
  };

  // Handle Employers button
  const handleEmployersClick = () => {
    navigate('/employers');
  };

  return (
    <section id="home" className="bg-white">
      {/* Hero banner */}
      <div 
        className="relative overflow-hidden bg-offwhite"
        style={{
          backgroundImage: `url("https://media.istockphoto.com/id/2217361086/photo/businesswomen-shaking-hands-while-attending-a-conference-meeting.webp?a=1&b=1&s=612x612&w=0&k=20&c=lNbHeugtq08AhQa6nPZxXlsPQaKb8ThnEByC6QHorjE=")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Background overlay on left side - blur removed */}
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-white/90 via-white/60 to-transparent lg:w-2/5" />
        
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-0">
          {/* Text content */}
          <div className="relative z-10 lg:py-24">
            <h1 className="font-display text-4xl font-extrabold leading-tight text-navy sm:text-5xl lg:text-[3.4rem]">
              Find Office &amp; Administrative Jobs Across Canada
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/80 sm:text-lg">
              Explore office jobs, administrative jobs, receptionist jobs,
              executive assistant jobs, office coordinator roles, data entry
              jobs, customer service office roles, and more. Connect with top
              employers hiring across Canada today.
            </p>
          </div>

          {/* Optional: Image overlay removed since we're using background image */}
        </div>

        {/* Search bar */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:absolute lg:bottom-0 lg:left-0 lg:right-auto lg:w-full lg:px-8 lg:pb-12">
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5 sm:flex-row sm:items-center lg:max-w-3xl">
            <div className="flex flex-1 items-center gap-3 px-3 py-2">
              <FiSearch className="h-5 w-5 shrink-0 text-muted" />
              <input
                type="text"
                placeholder="Job title, keyword or company"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-transparent text-sm text-navy placeholder:text-muted focus:outline-none"
              />
            </div>
            <div className="hidden h-8 w-px bg-gray-200 sm:block" />
            <div className="flex flex-1 items-center gap-3 px-3 py-2 sm:border-l sm:border-gray-200 sm:pl-4">
              <FiMapPin className="h-5 w-5 shrink-0 text-muted" />
              <input
                type="text"
                placeholder="City, province or region"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full bg-transparent text-sm text-navy placeholder:text-muted focus:outline-none"
              />
            </div>
            <button 
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white bg-yellow-500 transition-colors hover:bg-teal-dark"
            >
              <FiSearch className="h-4 w-4" />
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label, desc, path }) => (
            <div
              key={label}
              onClick={() => handleStatClick(path)}
              className="flex cursor-pointer items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-light">
                <Icon className="h-6 w-6 text-teal" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold text-teal">
                  {value}
                </p>
                <p className="text-sm font-semibold text-navy">{label}</p>
                <p className="mt-1 text-sm text-muted">{desc}</p>
              </div>
            </div>
          ))}

          {/* Ratings card */}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-xl bg-offwhite p-6">
            <GiMapleLeaf className="pointer-events-none absolute -right-2 -bottom-4 h-24 w-24 text-navy/5" />
            <p className="text-sm text-muted">
              Trusted by job seekers across Canada
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-gold">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <span className="text-sm font-semibold text-navy">4.6/5</span>
            </div>
            <p className="mt-1 text-sm text-muted">
              Based on thousands of reviews
            </p>
          </div>
        </div>

        {/* Employers banner */}
        <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl bg-teal-light p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal">
              <HiOutlineBuildingOffice2 className="h-7 w-7 text-white" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-navy">
                Employers: Hire Office Talent That Drives Success
              </p>
              <p className="mt-1 text-sm text-muted">
                Post your jobs, reach qualified office professionals, and grow
                your team with ease.
              </p>
            </div>
          </div>
          <button
            onClick={handleEmployersClick}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark sm:w-auto"
          >
            Learn More for Employers
            <FiArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}