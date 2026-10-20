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
      <section className="border-b border-[#e2e8df] bg-[#f6f8f4]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-8 sm:px-8 sm:py-12 lg:min-h-[610px] lg:grid-cols-[.9fr_1.1fr] lg:gap-14 lg:px-12 lg:py-10">
          <div className="max-w-xl py-5 lg:py-10">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-emerald-800">
              <span className="h-px w-8 bg-emerald-700" /> TravelWise · short getaways
            </p>
            <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.06] tracking-[-.04em] text-[#18372c] sm:text-5xl lg:text-[3.8rem]">
              Make a little time away
              <span className="mt-1 block font-normal italic text-[#54856b]">feel like a lot.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Bring your destination, interests and budget together in a practical plan for the days ahead.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link to="/register" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#24513f] px-6 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(36,81,63,.15)] transition hover:bg-[#193f30] focus:outline-none focus:ring-4 focus:ring-emerald-900/15">
                Get started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/login" className="text-sm font-bold text-[#24513f] underline decoration-[#b5cbb9] underline-offset-4 hover:text-[#193f30]">
                Sign in
              </Link>
            </div>
            <p className="mt-5 text-xs font-medium text-slate-500">Sign in to explore places, build itineraries and manage saved trips.</p>
          </div>

          <figure className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] bg-[#dce8de] shadow-[0_24px_60px_rgba(29,61,45,.14)] sm:min-h-[390px] lg:min-h-[520px] lg:rounded-[2rem]">
            <img
              src="https://images.unsplash.com/photo-1757196892572-0b792002ad4c?auto=format&fit=crop&w=1800&q=85"
              alt="Palm trees leaning over a calm tropical beach"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102e26]/55 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 right-5 text-xs font-medium text-white/90 sm:bottom-6 sm:left-7">
              <span className="font-bold">A slower morning by the sea.</span> Your getaway starts with a good plan.
              <a href="https://unsplash.com/pt-br/fotografias/uma-pessoa-sentada-em-uma-cadeira-sob-um-guarda-sol-weeJiR-xXC0" target="_blank" rel="noreferrer" className="ml-2 underline decoration-white/50 underline-offset-2">Photo: Arun Prakash / Unsplash</a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.17em] text-[#54856b]">A clear path from idea to itinerary</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-[#18372c]">Simple to start. Easy to follow.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-600">Create an account to open your travel workspace and start planning.</p>
        </div>
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
