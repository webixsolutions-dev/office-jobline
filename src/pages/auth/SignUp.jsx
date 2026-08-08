// src/pages/auth/SignUp.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../lib/auth';
import { 
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, 
  FiUserCheck, FiBriefcase, FiUserPlus 
} from 'react-icons/fi';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState('job_seeker');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    companyName: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      
      const result = await auth.signUp({
        full_name: fullName,
        email: formData.email,
        password: formData.password,
        role: role,
        company_name: role === 'recruiter' ? formData.companyName : undefined,
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/signin');
        }, 3000);
      }
    } catch (error) {
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 text-center border border-slate-200">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <FiUserCheck className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-navy-950">Check Your Email</h2>
          <p className="mt-2 text-slate-600">
            We have sent a confirmation link to <strong>{formData.email}</strong>
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Please check your email and click the link to confirm your account.
          </p>
          <button
            onClick={() => navigate('/signin')}
            className="mt-6 w-full rounded-lg bg-navy-950 py-3 text-sm font-semibold text-white transition hover:bg-navy-800"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-navy-950">Create Your Account</h1>
          <p className="mt-2 text-sm text-slate-600">
            One Jooblie account works across all our partner sites
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('job_seeker')}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                  role === 'job_seeker'
                    ? 'border-amber-500 bg-amber-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <FiUserCheck className={`h-6 w-6 ${role === 'job_seeker' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-semibold ${role === 'job_seeker' ? 'text-navy-950' : 'text-slate-600'}`}>
                  Job Seeker
                </span>
                <span className="text-xs text-slate-400">I am looking for a job</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('recruiter')}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition ${
                  role === 'recruiter'
                    ? 'border-amber-500 bg-amber-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <FiBriefcase className={`h-6 w-6 ${role === 'recruiter' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className={`text-sm font-semibold ${role === 'recruiter' ? 'text-navy-950' : 'text-slate-600'}`}>
                  Recruiter
                </span>
                <span className="text-xs text-slate-400">I am hiring</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Jane"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm placeholder-slate-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            {role === 'recruiter' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Company Name
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                  <FiBriefcase className="text-slate-400" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required={role === 'recruiter'}
                    placeholder="Your company name"
                    className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                <FiMail className="text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                <FiLock className="text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-400">Must be at least 8 characters.</p>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <label className="text-sm text-slate-600">
                I agree to the{' '}
                <a href="#" className="font-semibold text-amber-500 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-amber-500 hover:underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <p className="text-center text-xs text-slate-500">
              One Jooblie account works across all our partner sites — sign up once, use everywhere.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy-950 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiUserPlus className="h-4 w-4" />
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-amber-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}