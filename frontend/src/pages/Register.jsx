import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/common/AuthLayout';

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
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map((item) => item.msg).filter(Boolean).join(' '));
      } else if (!err.response) {
        setError('TravelWise could not reach the server. Refresh the page and try again.');
      } else {
        const status = err.response.status;
        const serverMessage = err.response.data?.message;
        setError(
          typeof serverMessage === 'string'
            ? `Registration failed (${status}): ${serverMessage}`
            : `The server could not create this account (HTTP ${status}). Please try again or use Sign In if you already have an account.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="register">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#bd6043]">Start with a daydream</p>
          <h1 className="mt-3 font-heading text-4xl font-medium tracking-[-.055em] text-[#203a34]">Make it yours.</h1>
          <p className="mt-2 text-sm leading-6 text-[#778078]">
            Save your plans, preferences and the places you want to see.
          </p>
        </div>

        {location.state?.from && (
          <div className="rounded-lg border border-[#d3dfd1] bg-[#edf2e9] px-4 py-3 text-sm leading-6 text-[#385d49]">
            Create an account to continue to the page you requested.
          </div>
        )}

        {error && (
          <div role="alert" aria-live="polite" className="flex items-center space-x-2 rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#52675b]">
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#a59d8d]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Amulya Rao"
                className="w-full rounded-lg border border-[#ded9cc] bg-white/80 py-3.5 pl-11 pr-4 text-sm text-[#203a34] placeholder:text-[#b2ad9f] transition focus:border-[#c56647] focus:outline-none focus:ring-4 focus:ring-[#c56647]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#52675b]">
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#a59d8d]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="amulya@example.com"
                className="w-full rounded-lg border border-[#ded9cc] bg-white/80 py-3.5 pl-11 pr-4 text-sm text-[#203a34] placeholder:text-[#b2ad9f] transition focus:border-[#c56647] focus:outline-none focus:ring-4 focus:ring-[#c56647]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#52675b]">
              Password (min. 6 characters)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#a59d8d]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-[#ded9cc] bg-white/80 py-3.5 pl-11 pr-4 text-sm text-[#203a34] placeholder:text-[#b2ad9f] transition focus:border-[#c56647] focus:outline-none focus:ring-4 focus:ring-[#c56647]/10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#52675b]">
              Home City (for nearby trip recommendations)
            </label>
            <select
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              className="w-full rounded-lg border border-[#ded9cc] bg-white/80 px-3.5 py-3.5 text-sm text-[#203a34] transition focus:border-[#c56647] focus:outline-none focus:ring-4 focus:ring-[#c56647]/10"
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
            className="group mt-2 flex w-full items-center justify-between rounded-lg bg-[#c96143] px-5 py-3.5 text-sm font-bold text-white shadow-[0_9px_24px_rgba(190,86,59,.18)] transition hover:bg-[#b65337] focus:outline-none focus:ring-4 focus:ring-[#c96143]/20 disabled:opacity-60"
          >
            <span>{loading ? 'Getting things ready…' : 'Create your account'}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
          </button>
        </form>

        <div className="border-t border-[#e7e2d7] pt-5 text-center text-sm text-[#7b8178]">
          Already have an account?{' '}
          <Link
            to="/login"
            state={{ from: location.state?.from }}
            className="font-extrabold text-[#bd6043] hover:text-[#91462f]"
          >
            Sign In
          </Link>
        </div>
    </AuthLayout>
  );
};

export default Register;
