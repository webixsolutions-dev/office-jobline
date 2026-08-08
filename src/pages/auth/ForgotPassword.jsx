import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import AuthLayout from '../../components/auth/AuthLayout';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock API call - Replace with actual auth service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Always show success message (security best practice)
      setIsSubmitted(true);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email address and we'll send you a link to reset your password."
    >
      {isSubmitted ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <FiCheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-navy-950 mb-2">Check Your Email</h2>
          <p className="text-sm text-slate-600 mb-4">
            We have sent a password reset link to{' '}
            <span className="font-semibold text-navy-900">{email}</span>
          </p>
          <p className="text-xs text-slate-500 mb-6">
            If you don't see the email, please check your spam folder.
          </p>
          <button
            type="button"
            onClick={() => navigate('/signin')}
            className="inline-flex items-center gap-2 rounded-lg bg-navy-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Sign In
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-700">
              <FiAlertCircle className="h-4 w-4" />
              {error}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full text-sm text-slate-700 placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-navy-950 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <p className="text-center text-sm text-slate-500">
            <Link to="/signin" className="inline-flex items-center gap-1 font-semibold text-amber-500 hover:underline">
              <FiArrowLeft className="h-3.5 w-3.5" />
              Back to Sign In
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}