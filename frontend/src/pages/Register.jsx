import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeCity, setHomeCity] = useState('Hyderabad');
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

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register({
        email,
        password,
        full_name: fullName,
        home_location: homeCity,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Registration error:', err);
      setError(
        err.response?.data?.detail || 'Registration failed. The email may already be in use.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#f5f7f3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[480px] rounded-2xl border border-[#e3e8e1] bg-white p-7 shadow-[0_18px_55px_rgba(31,55,40,.07)] sm:p-10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-800">TravelWise</p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950">Create your account</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Set up your account to start planning and save your trips.
          </p>
        </div>

        {location.state?.from && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
            Create an account to continue to the page you requested.
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Amulya Rao"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 transition focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>
          </div>

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
                placeholder="amulya@example.com"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 transition focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Password (min. 6 characters)
            </label>
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

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Home City (for nearby trip recommendations)
            </label>
            <select
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm text-slate-900 transition focus:border-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-700/10"
            >
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Goa">Goa</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Kochi">Kochi</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#214f3f] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#173e31] focus:outline-none focus:ring-4 focus:ring-emerald-900/15 disabled:opacity-60"
          >
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            state={{ from: location.state?.from }}
            className="font-bold text-emerald-800 hover:text-emerald-950"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
