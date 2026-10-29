import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  CalendarDays,
  Compass,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const workspaceLinks = [
  {
    icon: MapPin,
    number: '01',
    title: 'Find your place',
    detail: 'Browse handpicked destinations and save the stops that feel like you.',
    to: '/places',
    action: 'Explore places',
    tint: 'bg-[#eaf2e7] text-[#315f48]',
  },
  {
    icon: CalendarDays,
    number: '02',
    title: 'Shape your days',
    detail: 'Set your dates, budget and travel pace. We’ll help make every day count.',
    to: '/create-trip',
    action: 'Start planning',
    tint: 'bg-[#f6edde] text-[#9a6930]',
  },
  {
    icon: Bookmark,
    number: '03',
    title: 'Keep it together',
    detail: 'Your itinerary, budget and checklist stay together and ready to revisit.',
    to: '/saved-trips',
    action: 'View my trips',
    tint: 'bg-[#e8edf2] text-[#476780]',
  },
];

function WelcomeHome() {
  return (
    <div className="flex min-h-[72vh] items-center justify-center overflow-hidden bg-[#f7f6f1] px-5 py-16 text-[#172b22]">
      <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-[#e4e8df] bg-white px-7 py-12 text-center shadow-[0_24px_70px_rgba(37,61,43,.08)] sm:px-14 sm:py-16">
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#edf2e9] blur-3xl" />
        <div className="relative">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#24513d] text-white shadow-lg shadow-[#24513d]/20"><Compass className="h-7 w-7" /></span>
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[.18em] text-[#628167]">Welcome to TravelWise</p>
          <h1 className="mx-auto mt-3 max-w-2xl font-heading text-4xl font-medium leading-tight tracking-[-.045em] text-[#18372a] sm:text-5xl">Make room for your next getaway.</h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#68756c]">Sign in or create an account to get started.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/register" className="group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-[#24513d] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#193f2f]">
              Create account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/login" className="inline-flex min-h-[50px] items-center justify-center rounded-full border border-[#dce3d8] px-6 py-3 text-sm font-bold text-[#315e45] transition hover:bg-[#f7f8f4]">
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const firstName = user?.full_name?.trim().split(/\s+/)[0];

  if (!isAuthenticated) return <WelcomeHome />;

  return (
    <div className="min-h-[70vh] bg-[#f7f6f1] text-[#172b22]">
      <section className="relative overflow-hidden border-b border-[#e7e8df] bg-[#edf1e8]">
        <div className="pointer-events-none absolute -right-20 -top-40 h-[28rem] w-[28rem] rounded-full bg-white/70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d7e0d3] bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.15em] text-[#5b775e]"><Compass className="h-3.5 w-3.5" /> Your TravelWise workspace</p>
          <h1 className="mt-5 font-heading text-4xl font-medium tracking-[-.045em] text-[#18372a] sm:text-5xl">Welcome back{firstName ? `, ${firstName}` : ''}.</h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#68756c]">The best trips start with a small idea. Where would you like to go next?</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-9 sm:px-8 sm:py-12 md:grid-cols-3 lg:px-12">
        {workspaceLinks.map(({ icon: Icon, number, title, detail, to, action, tint }) => (
          <article key={to} className="group flex min-h-[270px] flex-col rounded-2xl border border-[#e5e7de] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#ccd8c9] hover:shadow-[0_16px_38px_rgba(39,63,45,.08)] sm:p-7">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[.16em] text-[#91a092]">STEP {number}</span>
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${tint}`}><Icon className="h-5 w-5" /></span>
            </div>
            <h2 className="mt-6 font-heading text-xl font-semibold tracking-tight text-[#294839]">{title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#748078]">{detail}</p>
            <Link to={to} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#456a51] transition group-hover:text-[#203e2b]">
              {action} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
