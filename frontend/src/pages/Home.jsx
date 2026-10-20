import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, CalendarDays, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const workspaceLinks = [
  { icon: MapPin, title: 'Explore places', detail: 'Browse destinations and choose the stops that interest you.', to: '/places', action: 'Explore places' },
  { icon: CalendarDays, title: 'Plan a getaway', detail: 'Set your dates, budget and pace to shape a day-by-day trip.', to: '/create-trip', action: 'Start planning' },
  { icon: Bookmark, title: 'Your saved trips', detail: 'Open your itineraries and keep your plans close at hand.', to: '/saved-trips', action: 'View my trips' },
];

function WelcomeHome() {
  return (
    <div className="bg-[#f6f8f4] text-slate-900">
      <section className="relative isolate overflow-hidden border-b border-[#e2e8df]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_16%_18%,rgba(192,218,189,.38),transparent_40%),radial-gradient(ellipse_at_88%_82%,rgba(232,213,175,.27),transparent_35%)]" />
        <div className="mx-auto flex min-h-[480px] max-w-5xl flex-col items-center justify-center px-5 py-20 text-center sm:min-h-[540px] sm:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e3d8] bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-emerald-900 shadow-sm">
            TravelWise <span className="h-1 w-1 rounded-full bg-emerald-700" /> Short getaways, thoughtfully planned
          </span>
          <h1 className="mt-7 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-.035em] text-[#18372c] sm:text-6xl lg:text-[4.25rem]">
            Your next getaway,
            <span className="block text-[#4f8064]">clear from the start.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Bring your destination, interests and budget together in a day-by-day travel plan that’s easy to follow.
          </p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link to="/register" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#24513f] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(36,81,63,.15)] transition hover:bg-[#193f30] focus:outline-none focus:ring-4 focus:ring-emerald-900/15">
              Get started
            </Link>
            <Link to="/login" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#cbd8ce] bg-white/80 px-6 py-3 text-sm font-bold text-[#24513f] transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-900/10">
              Sign in
            </Link>
          </div>
          <p className="mt-5 text-xs font-medium text-slate-500">Sign in to explore places, build itineraries and manage saved trips.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="grid gap-7 sm:grid-cols-3 sm:gap-9">
          {[
            ['01', 'Discover', 'Find places that fit the kind of trip you want.'],
            ['02', 'Plan', 'Shape your days around your time, pace and budget.'],
            ['03', 'Keep it together', 'Return to your itinerary and trip details in one place.'],
          ].map(([number, title, detail]) => (
            <article key={number} className="border-t border-[#dce4dc] pt-4">
              <p className="text-xs font-bold tracking-[.16em] text-[#789181]">{number}</p>
              <h2 className="mt-2 text-base font-bold text-[#233e32]">{title}</h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{detail}</p>
            </article>
          ))}
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
    <div className="min-h-[70vh] bg-[#f7f8f5] text-slate-900">
      <section className="border-b border-[#e4e8e1] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800">Your TravelWise workspace</p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Welcome back{firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            Where would you like to go next? Choose a starting point below.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-9 sm:px-8 md:grid-cols-3 lg:px-12">
        {workspaceLinks.map(({ icon: Icon, title, detail, to, action }) => (
          <article key={to} className="flex min-h-64 flex-col rounded-2xl border border-[#e1e6df] bg-white p-6 shadow-[0_4px_16px_rgba(27,53,39,.035)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(27,53,39,.08)]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf4ed] text-emerald-800"><Icon className="h-5 w-5" /></span>
            <h2 className="mt-5 text-lg font-bold text-slate-900">{title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{detail}</p>
            <Link to={to} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950">
              {action} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
