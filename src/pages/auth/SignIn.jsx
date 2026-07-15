import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import AuthLayout from "../../components/Signup/AuthLayout";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // hook up your auth logic here
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your applications and job alerts."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="mb-1 flex items-center justify-between">
            <label className="block text-sm font-semibold text-slate-700">Password</label>
            <Link to="/forgot-password" className="text-xs font-semibold text-amber-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
            <FiLock className="text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
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
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#0B1B3A] focus:ring-amber-400" />
          Keep me signed in
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1B3A] py-3 text-sm font-semibold text-white transition hover:bg-[#132a56]"
        >
          <FiLogIn /> Sign In
        </button>
      </form>



      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link to="/signup" className="font-semibold text-amber-500 hover:underline">
          Sign up for free
        </Link>
      </p>
    </AuthLayout>
  );
}
