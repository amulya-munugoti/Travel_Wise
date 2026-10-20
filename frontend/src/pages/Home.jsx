import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, CalendarDays, Compass, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const benefits = [
  {
    icon: MapPin,
    title: 'Find the right places',
    detail: 'Browse destinations and choose the stops that fit your interests.',
  },
  {
    icon: CalendarDays,
    title: 'Plan at your pace',
    detail: 'Build a practical day-by-day itinerary around your time and budget.',
  },
  {
    icon: Bookmark,
    title: 'Keep plans together',
    detail: 'Return to your saved trips whenever you need them.',
  },
];

function PublicHome() {
  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,rgba(16,185,129,0.2),transparent_42%),radial-gradient(ellipse_at_8%_90%,rgba(14,165,233,0.14),transparent_38%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Your next trip, thoughtfully planned
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Make room for
              <span className="mt-1 block text-emerald-300">the good part.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              TravelWise helps you turn a few days away into a plan that feels clear, personal and easy to follow.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-300/30">
                Create your account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20">
                Sign in
              </Link>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Your saved trips and preferences stay in your account.
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-300/15 text-emerald-200">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-300">A calmer way to get away</p>
                  <p className="mt-0.5 text-lg font-bold">Start with what matters to you</p>
                </div>
              </div>
              <div className="space-y-3 py-5">
                {benefits.map(({ icon: Icon, title }, index) => (
                  <div key={title} className="flex items-center gap-3 rounded-xl bg-slate-900/55 p-3.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-emerald-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold">{title}</span>
                    <span className="ml-auto text-xs font-bold text-slate-500">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <p className="border-t border-white/10 pt-4 text-sm leading-6 text-slate-300">
                Sign in to open the planner, explore destinations and manage your trips.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, detail }) => (
            <article key={title} className="border-t-2 border-emerald-600 pt-5">
              <Icon className="h-5 w-5 text-emerald-700" />
              <h2 className="mt-4 text-lg font-bold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MemberHome({ user }) {
  return (
    <div className="min-h-[65vh] bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold text-emerald-700">Your travel workspace</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Welcome back{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ''}.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Pick up where you left off, explore places or start planning your next getaway.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link to="/create-trip" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800">
              Plan a trip <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/saved-trips" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">
              View my trips
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
        {benefits.map(({ icon: Icon, title, detail }) => (
          <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Icon className="h-5 w-5" /></span>
            <h2 className="mt-4 font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated ? <MemberHome user={user} /> : <PublicHome />;
}
