import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Check,
  Compass,
  MapPin,
  Sparkles,
  Wallet,
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
    <div className="overflow-hidden bg-[#f7f6f1] text-[#172b22]">
      <section className="relative isolate">
        <div className="pointer-events-none absolute -right-40 -top-48 -z-10 h-[36rem] w-[36rem] rounded-full bg-[#e4eadf] blur-3xl" />
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:min-h-[650px] lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:px-12 lg:py-14">
          <div className="max-w-[600px] py-3 lg:py-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#dce5d9] bg-white/75 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-[#456a51] shadow-sm shadow-[#274734]/[.04]">
              <Sparkles className="h-3.5 w-3.5" /> Small trips, big memories
            </p>
            <h1 className="mt-7 max-w-[620px] font-heading text-[2.8rem] font-medium leading-[1.04] tracking-[-.055em] text-[#18372a] sm:text-6xl lg:text-[4.5rem]">
              Your next escape,
              <span className="mt-1 block font-normal italic text-[#68896a]">beautifully planned.</span>
            </h1>
            <p className="mt-6 max-w-[500px] text-base leading-7 text-[#617067] sm:text-lg sm:leading-8">
              Turn a few days off into a trip that feels like yours. Find places, map out each day, and keep the details in one calm little corner.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/register" className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-full bg-[#24513d] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(36,81,61,.19)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#193f2f] hover:shadow-[0_14px_30px_rgba(36,81,61,.23)] focus:outline-none focus:ring-4 focus:ring-emerald-900/15">
                Plan your first trip <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/login" className="inline-flex min-h-[52px] items-center justify-center rounded-full px-5 text-sm font-bold text-[#315e45] transition hover:bg-white/80">
                I already have an account
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#66776b] sm:gap-x-6">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#5b815e]" /> Made for short getaways</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#5b815e]" /> Your budget stays in view</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
            <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full border border-[#dce4d6] sm:-left-7 sm:-top-7 sm:h-36 sm:w-36" />
            <figure className="group relative min-h-[350px] overflow-hidden rounded-[1.6rem] bg-[#dce7dd] shadow-[0_26px_70px_rgba(37,61,43,.17)] sm:min-h-[460px] sm:rounded-[2rem] lg:min-h-[530px]">
              <img
                src="https://images.unsplash.com/photo-1757196892572-0b792002ad4c?auto=format&fit=crop&w=1800&q=85"
                alt="Palm trees leaning over a calm tropical beach"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.025]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102e26]/65 via-[#102e26]/5 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3.5 py-2 text-xs font-bold text-[#294839] shadow-lg shadow-black/10 backdrop-blur sm:left-7 sm:top-7">
                <Compass className="h-3.5 w-3.5" /> A little room to roam
              </div>
              <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-white/75">Take the scenic route</p>
                <p className="mt-2 font-heading text-2xl font-medium tracking-tight sm:text-3xl">Make space for the good part.</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">A slower morning, a new favorite place, and a plan that leaves room for both.</p>
              </figcaption>
            </figure>
            <div className="absolute -bottom-5 right-4 hidden items-center gap-3 rounded-2xl border border-[#e8e8dc] bg-white p-3.5 shadow-[0_14px_36px_rgba(31,49,35,.13)] sm:flex lg:-right-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7efe0] text-[#9a6930]"><Wallet className="h-5 w-5" /></span>
              <span><span className="block text-[10px] font-bold uppercase tracking-[.14em] text-[#879187]">Your trip, your pace</span><span className="mt-0.5 block text-sm font-bold text-[#294839]">Thoughtful from day one</span></span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e8e8df] bg-white/65">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-7 sm:grid-cols-3 sm:gap-0 sm:px-8 sm:py-8 lg:px-12">
          {[
            [MapPin, 'Places worth the detour', 'Start with spots picked for your kind of trip.'],
            [CalendarDays, 'Days that feel doable', 'Build a practical itinerary at your own pace.'],
            [Wallet, 'A budget with breathing room', 'Keep your spending in view as you plan.'],
          ].map(([Icon, title, detail], index) => (
            <div key={title} className={`flex items-start gap-3.5 ${index > 0 ? 'sm:border-l sm:border-[#e5e8df] sm:pl-7 lg:pl-10' : ''}`}>
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#edf2e9] text-[#456a51]"><Icon className="h-[18px] w-[18px]" /></span>
              <span><span className="block text-sm font-bold text-[#294839]">{title}</span><span className="mt-1 block max-w-[260px] text-xs leading-5 text-[#748078]">{detail}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#71896f]">From first thought to takeoff</p>
            <h2 className="mt-2 font-heading text-3xl font-medium tracking-[-.035em] text-[#18372a] sm:text-4xl">Less tab juggling. More daydreaming.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#68756c]">A few simple steps help you get from “we should go” to a plan everyone can follow.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['01', 'Discover', 'Find destinations and experiences that match your interests.'],
            ['02', 'Make it yours', 'Set your dates, group size, budget and preferred pace.'],
            ['03', 'Go with a plan', 'See your days, costs and checklist together in one place.'],
          ].map(([number, title, detail], index) => (
            <article key={number} className="group relative overflow-hidden rounded-2xl border border-[#e5e7de] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#cbd8c8] hover:shadow-[0_16px_38px_rgba(39,63,45,.08)] sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-[.16em] text-[#8b9a8c]">STEP {number}</span>
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${['bg-[#eaf2e7] text-[#315f48]', 'bg-[#f6edde] text-[#9a6930]', 'bg-[#e8edf2] text-[#476780]'][index]}`}>
                  {index === 0 ? <MapPin className="h-5 w-5" /> : index === 1 ? <CalendarDays className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </span>
              </div>
              <h3 className="mt-8 font-heading text-xl font-semibold tracking-tight text-[#294839]">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[#748078]">{detail}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#57765c]">Made for real trips <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" /></span>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#e9efe5] px-6 py-6 sm:flex-row sm:px-8">
          <div>
            <p className="font-heading text-xl font-semibold text-[#294839]">Your next few days are waiting.</p>
            <p className="mt-1 text-sm text-[#68756c]">Create an account and start putting the pieces together.</p>
          </div>
          <Link to="/register" className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-[#24513d] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#193f2f]">
            Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
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
