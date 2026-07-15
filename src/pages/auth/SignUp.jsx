import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUserPlus,
  FiBriefcase,
} from "react-icons/fi";
import AuthLayout from "../../components/Signup/AuthLayout";


export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker"); // 'seeker' | 'employer'

  const handleSubmit = (e) => {
    e.preventDefault();
    // hook up your auth logic here
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Office Jobline and start connecting with opportunity across Canada."
    >
      {/* Role toggle */}
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setRole("seeker")}
          className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition ${
            role === "seeker" ? "bg-white text-[#0B1B3A] shadow-sm" : "text-slate-500"
          }`}
        >
          <FiUser /> Job Seeker
        </button>
        <button
          type="button"
          onClick={() => setRole("employer")}
          className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition ${
            role === "employer" ? "bg-white text-[#0B1B3A] shadow-sm" : "text-slate-500"
          }`}
        >
          <FiBriefcase /> Employer
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">First Name</label>
            <input
              type="text"
              required
              placeholder="Jane"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Last Name</label>
            <input
              type="text"
              required
              placeholder="Doe"
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        {role === "employer" && (
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Company Name
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
              <FiBriefcase className="text-slate-400" />
              <input
                type="text"
                required
                placeholder="Your company name"
                className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
            <FiMail className="text-slate-400" />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Password</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
            <FiLock className="text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Create a password"
              className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <p className="mt-1 text-xs text-slate-400">Must be at least 8 characters.</p>
        </div>

        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0B1B3A] focus:ring-amber-400"
          />
          I agree to the{" "}
          <a href="#" className="font-semibold text-amber-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-semibold text-amber-500 hover:underline">
            Privacy Policy
          </a>
          .
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1B3A] py-3 text-sm font-semibold text-white transition hover:bg-[#132a56]"
        >
          <FiUserPlus />
          {role === "employer" ? "Create Employer Account" : "Create Account"}
        </button>
      </form>


      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/signin" className="font-semibold text-amber-500 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
