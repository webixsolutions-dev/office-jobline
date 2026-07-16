import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaPhoneAlt,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

export default function EmployerCTA() {
  const navigate = useNavigate();

  // Handle Post a Job
  const handlePostJob = () => {
    navigate("/post-a-job");
  };

  // Handle Contact Sales
  const handleContactSales = () => {
    navigate("/contact-us");
  };

  return (
    <>
      <section className="w-full bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="relative bg-slate-900 rounded-xl overflow-hidden px-6 sm:px-10 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5 z-10">
              <div className="w-16 h-16 rounded-full border-2 border-yellow-400 flex items-center justify-center shrink-0">
                <FaBuilding className="text-yellow-400 text-2xl" />
              </div>
              <div>
                <h3 className="text-white text-2xl sm:text-3xl font-extrabold mb-2">
                  Ready to Hire Office Talent Across Canada?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base">
                  Post your job and connect with qualified office professionals
                  from coast to coast.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 z-10 w-full lg:w-auto">
              <button 
                onClick={handlePostJob}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-md transition"
              >
                <FaBriefcase /> Post a Job
              </button>
              <button 
                onClick={handleContactSales}
                className="flex items-center justify-center gap-2 border border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-md transition"
              >
                <FaPhoneAlt /> Contact Sales
              </button>
            </div>
            {/* skyline decoration */}
            <svg
              className="hidden lg:block absolute right-0 bottom-0 h-full w-64 text-slate-800 opacity-60"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              <rect x="10" y="80" width="20" height="120" />
              <rect x="35" y="60" width="20" height="140" />
              <rect x="60" y="100" width="20" height="100" />
              <rect x="85" y="40" width="15" height="160" />
              <rect x="105" y="70" width="20" height="130" />
              <rect x="130" y="20" width="10" height="180" />
              <rect x="145" y="90" width="20" height="110" />
              <rect x="170" y="50" width="20" height="150" />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}