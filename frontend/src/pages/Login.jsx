import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from
    ? typeof location.state.from === 'string'
      ? location.state.from
      : `${location.state.from.pathname || '/saved-trips'}${location.state.from.search || ''}`
    : '/saved-trips';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map((item) => item.msg).filter(Boolean).join(' '));
      } else if (!err.response) {
        setError('Could not connect to TravelWise. Check that the app servers are running and try again.');
      } else {
        setError('Invalid email or password. Please verify your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f5f7f3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[440px] rounded-2xl border border-[#e3e8e1] bg-white p-7 shadow-[0_18px_55px_rgba(31,55,40,.07)] sm:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-800">TravelWise</p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950">Sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Access your trips, itineraries and travel preferences.
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail('traveler@travelwise.com');
              setPassword('TravelWise@123');
              setError('');
            }}
            className="mt-3 text-sm font-semibold text-emerald-800 hover:text-emerald-950"
          >
            Fill demo credentials
          </button>
        </div>

        {location.state?.from && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
            Sign in to continue to the page you requested.
          </div>
        )}

        {error && (
          <div role="alert" aria-live="polite" className="flex items-center space-x-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 transition focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 transition focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#214f3f] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#173e31] focus:outline-none focus:ring-4 focus:ring-emerald-900/15 disabled:opacity-60"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            state={{ from: location.state?.from }}
            className="font-bold text-emerald-800 hover:text-emerald-950"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
