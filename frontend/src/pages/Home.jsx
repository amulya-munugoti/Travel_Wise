import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, CalendarDays, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const workspaceLinks = [
  { icon: MapPin, title: 'Explore places', detail: 'Browse destinations and choose the stops that interest you.', to: '/places', action: 'Explore places' },
  { icon: CalendarDays, title: 'Plan a getaway', detail: 'Set your dates, budget and pace to shape a day-by-day trip.', to: '/create-trip', action: 'Start planning' },
  { icon: Bookmark, title: 'Your saved trips', detail: 'Open your itineraries and keep your plans close at hand.', to: '/saved-trips', action: 'View my trips' },
];

export default function Home() {
  const { user } = useAuth();
  const firstName = user?.full_name?.trim().split(/\s+/)[0];

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
