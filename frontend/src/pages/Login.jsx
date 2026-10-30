import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import AuthLayout from '../components/common/AuthLayout';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <AuthLayout mode="login">
        <div className="mb-8">
          <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#4842db]"><span className="h-px w-6 bg-[#4842db]" /> Back to the good part</p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.02] tracking-[-.055em] text-[#242354] sm:text-[2.8rem]">Welcome<br className="hidden sm:block" /> back, <span className="font-normal italic text-[#4842db]">traveler.</span></h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#77768c]">Sign in and pick up right where your next little escape begins.</p>
        </div>
        <div className="mb-5 rounded-xl border border-dashed border-[#d2cfee] bg-[#f0efff] px-4 py-3">
          <button
            type="button"
            onClick={() => {
              setEmail('traveler@travelwise.com');
              setPassword('TravelWise@123');
              setError('');
            }}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <span className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e1dfff] text-[#4842db]"><Sparkles className="h-4 w-4" /></span><span><span className="block text-xs font-bold text-[#34336c]">Just looking around?</span><span className="mt-0.5 block text-[10px] text-[#77768c]">Fill the demo login for a quick visit</span></span></span><ArrowRight className="h-4 w-4 shrink-0 text-[#4842db]" />
          </button>
        </div>

        {location.state?.from && (
          <div className="rounded-lg border border-[#d3dfd1] bg-[#edf2e9] px-4 py-3 text-sm leading-6 text-[#385d49]">
            Sign in to continue to the page you requested.
          </div>
        )}

        {error && (
          <div role="alert" aria-live="polite" className="flex items-center space-x-2 rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#57568a]">
              Email address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#9796a8]">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#d4d2e4] bg-white/90 py-3.5 pl-11 pr-4 text-sm text-[#242354] placeholder:text-[#a4a2b6] transition focus:border-[#4842db] focus:outline-none focus:ring-4 focus:ring-[#4842db]/15"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-[11px] font-extrabold uppercase tracking-[.12em] text-[#57568a]">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#9796a8]">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full rounded-lg border border-[#d4d2e4] bg-white/90 py-3.5 pl-11 pr-12 text-sm text-[#242354] placeholder:text-[#a4a2b6] transition focus:border-[#4842db] focus:outline-none focus:ring-4 focus:ring-[#4842db]/15"
              />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-0 flex items-center px-4 text-[#9796a8] transition hover:text-[#4842db]">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-between rounded-lg bg-[#4842db] px-5 py-3.5 text-sm font-bold text-white shadow-[0_9px_24px_rgba(72,66,219,.22)] transition hover:bg-[#302bb3] focus:outline-none focus:ring-4 focus:ring-[#4842db]/20 disabled:opacity-60"
          >
            <span>{loading ? 'Finding your way in…' : 'Sign in to TravelWise'}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition group-hover:translate-x-1"><ArrowRight className="h-4 w-4" /></span>
          </button>
        </form>

        <div className="mt-7 border-t border-[#e7e2d7] pt-5 text-center text-sm text-[#7b8178]">
          New to TravelWise?{' '}
          <Link
            to="/register"
            state={{ from: location.state?.from }}
            className="font-extrabold text-[#4842db] hover:text-[#302bb3]"
          >
            Create an account
          </Link>
        </div>
    </AuthLayout>
  );
};

export default Login;
