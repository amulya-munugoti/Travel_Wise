import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Compass, MapPin, Sparkles } from 'lucide-react';

const destinations = [
  { city: 'Hyderabad', state: 'Telangana', detail: 'Historic landmarks and local food', style: 'from-amber-100 to-orange-50' },
  { city: 'Goa', state: 'Goa', detail: 'Coastal views and laid-back days', style: 'from-sky-100 to-cyan-50' },
  { city: 'Jaipur', state: 'Rajasthan', detail: 'Fortresses, palaces and markets', style: 'from-rose-100 to-orange-50' },
  { city: 'Bengaluru', state: 'Karnataka', detail: 'Green spaces and city culture', style: 'from-emerald-100 to-lime-50' },
  { city: 'Munnar', state: 'Kerala', detail: 'Tea country and mountain air', style: 'from-teal-100 to-emerald-50' },
  { city: 'Agra', state: 'Uttar Pradesh', detail: 'Mughal history and architecture', style: 'from-violet-100 to-fuchsia-50' },
];

const steps = [
  { icon: MapPin, title: 'Choose a destination', detail: 'Explore places by city and interest, then save the sights you want to include.' },
  { icon: CalendarDays, title: 'Shape your trip', detail: 'Set your dates, group size, budget, pace and travel interests.' },
  { icon: Compass, title: 'Make it yours', detail: 'Review your day-by-day itinerary and find all your plans in one place.' },
];

export default function Home() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(16,185,129,0.24),transparent_42%),radial-gradient(ellipse_at_15%_90%,rgba(14,165,233,0.18),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-emerald-200">
              <Sparkles className="h-4 w-4" />
              A clearer way to plan a getaway
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Less time planning.
              <span className="mt-1 block text-emerald-300">More time out there.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Find places worth seeing, build a trip around your interests and keep every itinerary together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/create-trip"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Plan a trip <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/places"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                <MapPin className="h-4 w-4" /> Explore destinations
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-400">Explore first. Sign in when you’re ready to save a trip.</p>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-emerald-400/10 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-300">Your next getaway</p>
                  <p className="mt-1 text-xl font-bold">A few days in Goa</p>
                </div>
                <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-200">3 days</span>
              </div>
              <div className="space-y-3 py-4">
                {[
                  ['Day 1', 'Old Goa & Panaji'],
                  ['Day 2', 'Beaches & local cafés'],
                  ['Day 3', 'A slow morning by the coast'],
                ].map(([day, plan], index) => (
                  <div key={day} className="flex items-center gap-4 rounded-xl bg-slate-900/50 p-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-xs font-bold text-emerald-200">
                      0{index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{day}</p>
                      <p className="mt-0.5 text-sm font-semibold">{plan}</p>
                    </div>
                    <MapPin className="ml-auto h-4 w-4 text-emerald-300" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-slate-300">
                <Compass className="h-4 w-4 text-emerald-300" />
                One plan, organized day by day
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">Find your next stop</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Explore popular destinations</h2>
            <p className="mt-2 max-w-xl text-slate-600">Start with a city, browse its places, and build a trip that suits you.</p>
          </div>
          <Link to="/places" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800">
            Browse all places <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.city}
              to={`/create-trip?city=${encodeURIComponent(destination.city)}`}
              className={`group rounded-2xl border border-slate-200 bg-gradient-to-br ${destination.style} p-5 transition hover:-translate-y-0.5 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-emerald-800">
                  <MapPin className="h-5 w-5" />
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-slate-900" />
              </div>
              <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-slate-600">{destination.state}</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-900">{destination.city}</h3>
              <p className="mt-1 text-sm text-slate-700">{destination.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">A simple flow</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">From an idea to a trip you can follow</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, detail }, index) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-xl font-bold">Have a destination in mind?</h3>
              <p className="mt-1 text-sm text-slate-300">Put together your next trip in a few guided steps.</p>
            </div>
            <Link to="/create-trip" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">
              Start planning <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
