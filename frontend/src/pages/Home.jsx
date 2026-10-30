import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Compass,
  MapPin,
  MoveUpRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const workspaceLinks = [
  {
    icon: MapPin,
    number: '01',
    title: 'Find your somewhere',
    detail: 'Little-known corners, local favourites, and places worth taking the long way for.',
    to: '/places',
    action: 'Wander around',
  },
  {
    icon: CalendarDays,
    number: '02',
    title: 'Make a few days count',
    detail: 'Build a loose, lovely plan around your dates, your pace, and your kind of trip.',
    to: '/create-trip',
    action: 'Plan a getaway',
  },
  {
    icon: Bookmark,
    number: '03',
    title: 'Keep the good bits',
    detail: 'Every stop, day plan and little detail, all in one place for when you need it.',
    to: '/saved-trips',
    action: 'Open my trips',
  },
];

function RouteArtwork() {
  return (
    <div className="relative mx-auto aspect-[.94] w-full max-w-[510px] sm:aspect-[1.08]">
      <div className="absolute inset-3 rotate-[3deg] rounded-[2rem] bg-[#e5a35c] sm:inset-5" />
      <div className="travel-map animate-map-float absolute inset-0 overflow-hidden rounded-[1.8rem] border border-white/20 bg-[#183d39] shadow-[0_32px_80px_rgba(16,39,35,.28)] sm:rounded-[2rem]">
        <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(ellipse at 25% 28%, #43796a 0, transparent 31%), radial-gradient(ellipse at 76% 78%, #284f49 0, transparent 36%), linear-gradient(135deg,#173b37,#244d46 58%,#173732)' }} />
        <div className="absolute -left-10 top-10 h-48 w-48 rounded-full border border-white/[.08]" />
        <div className="absolute -left-4 top-16 h-36 w-36 rounded-full border border-white/[.08]" />
        <div className="absolute -right-16 bottom-4 h-64 w-64 rounded-full border border-white/[.08]" />
        <div className="absolute right-[-20px] top-[-22px] h-64 w-64 rounded-full border border-white/[.08]" />
        <div className="absolute left-6 top-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#c4d4bf] sm:left-8 sm:top-8">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/5"><Compass className="h-3.5 w-3.5" /></span>
          Travel, loosely planned
        </div>
        <div className="absolute right-7 top-8 rotate-12 font-serif text-xs text-[#d9a25f]">N</div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 520" fill="none" aria-hidden="true">
          <path className="route-line" d="M112 398C143 355 152 318 198 303C241 289 280 318 306 268C331 220 296 181 344 146C365 130 389 126 408 103" stroke="#E8B779" strokeWidth="2.5" strokeDasharray="4 9" strokeLinecap="round" />
          <path d="M76 406C132 376 171 397 207 371C243 346 246 332 286 339" stroke="#FFFFFF" strokeOpacity=".12" strokeWidth="1" />
          <path d="M153 128C181 153 190 176 215 187C241 198 254 193 272 215" stroke="#FFFFFF" strokeOpacity=".12" strokeWidth="1" />
          <circle cx="112" cy="398" r="8" fill="#E8B779" stroke="#F7E6C7" strokeWidth="3" />
          <circle cx="306" cy="268" r="8" fill="#E8B779" stroke="#F7E6C7" strokeWidth="3" />
          <circle cx="408" cy="103" r="8" fill="#E8B779" stroke="#F7E6C7" strokeWidth="3" />
        </svg>
        <span className="absolute left-[12%] top-[76%] text-[9px] font-semibold uppercase tracking-[.2em] text-white/55">Start anywhere</span>
        <span className="absolute right-[10%] top-[18%] text-[9px] font-semibold uppercase tracking-[.2em] text-white/55">Find your own way</span>

        <div className="animate-note-float absolute bottom-5 left-5 right-5 rounded-[1.35rem] border border-white/60 bg-[#f8f3e8] p-4 text-[#203a34] shadow-[0_16px_45px_rgba(8,25,22,.25)] sm:bottom-7 sm:left-7 sm:right-7 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[#c76143]">A field note · No. 014</p>
              <h2 className="mt-1 font-heading text-xl font-semibold tracking-[-.04em] sm:text-2xl">The Western Ghats</h2>
              <p className="mt-1 flex items-center gap-1 text-xs text-[#68756c]"><MapPin className="h-3 w-3" /> Karnataka, India <span className="mx-1 text-[#c6bdae]">·</span> 3 slow days</p>
            </div>
            <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e9e5d8] text-[#bb5e40]"><MoveUpRight className="h-4 w-4" /></span>
          </div>
          <div className="mt-4 flex items-center gap-2 border-t border-[#e1dccf] pt-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d56f4c]" />
            <span className="text-[10px] font-semibold text-[#5d6b63]">Coffee at first light</span>
            <span className="h-px flex-1 border-t border-dashed border-[#c9c3b6]" />
            <span className="text-[10px] font-semibold text-[#5d6b63]">The scenic route</span>
          </div>
        </div>
      </div>
      <div className="absolute -right-1 top-[27%] hidden -rotate-6 rounded-full bg-[#d96645] px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-[.16em] text-white shadow-lg sm:block">Take the scenic route</div>
    </div>
  );
}

function WelcomeHome() {
  return (
    <div className="overflow-hidden bg-[#f4f0e7] text-[#203a34]">
      <section className="home-hero relative mx-auto grid min-h-[650px] max-w-[1440px] items-center gap-10 px-5 py-14 sm:px-10 sm:py-16 lg:min-h-[690px] lg:grid-cols-[1fr_.94fr] lg:gap-4 lg:px-16 lg:py-12 xl:px-24">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#e4e5d5]/60 blur-3xl" />
        <div className="relative z-10 max-w-[620px] pb-4 lg:pb-14">
          <div className="motion-rise mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8d7c9] bg-[#faf8f1] px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-[.17em] text-[#526c5c]">
            <Sparkles className="h-3.5 w-3.5 text-[#c96143]" /> Made for your next little escape
          </div>
          <h1 className="motion-rise font-heading text-[3.45rem] font-medium leading-[.96] tracking-[-.075em] text-[#193b35] sm:text-7xl lg:text-[5.7rem]" style={{ animationDelay: '100ms' }}>
            Go where<br />the day <span className="relative inline-block font-serif font-normal italic text-[#ce6545]">takes you<span className="absolute -bottom-1 left-0 right-0 -rotate-2 border-b-2 border-[#d9a46c]" /></span>.
          </h1>
          <p className="motion-rise mt-7 max-w-[440px] text-[15px] leading-7 text-[#64736b] sm:text-base sm:leading-8" style={{ animationDelay: '180ms' }}>A few free days can take you a long way. Find places with a little character, then shape a trip that feels like yours.</p>
          <div className="motion-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: '260ms' }}>
            <Link to="/register" className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#cf6546] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(190,86,59,.2)] transition hover:-translate-y-0.5 hover:bg-[#b95337]">
              Plan your first getaway <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/login" className="inline-flex min-h-[54px] items-center justify-center rounded-full px-6 text-sm font-bold text-[#365b50] transition hover:bg-white/60">I have an account</Link>
          </div>
          <div className="mt-11 flex items-center gap-4 border-t border-[#dedbce] pt-5 text-xs text-[#738078] sm:max-w-[450px]">
            <span className="flex -space-x-2" aria-hidden="true"><i className="h-7 w-7 rounded-full border-2 border-[#f4f0e7] bg-[#cb7854]" /><i className="h-7 w-7 rounded-full border-2 border-[#f4f0e7] bg-[#a5ae8c]" /><i className="h-7 w-7 rounded-full border-2 border-[#f4f0e7] bg-[#d9b976]" /></span>
            <span><strong className="font-bold text-[#294a40]">Small trips, big stories.</strong><br />Your next one starts with a feeling.</span>
            <ArrowDownRight className="ml-auto h-5 w-5 text-[#c76a48]" />
          </div>
        </div>
        <div className="relative z-10 lg:pl-4"><RouteArtwork /></div>
        <div className="pointer-events-none absolute bottom-4 right-8 hidden font-serif text-[10px] uppercase tracking-[.3em] text-[#8d978b] xl:block">12° 21' N &nbsp; 75° 44' E</div>
      </section>
      <div className="border-y border-[#d9d7ca] bg-[#ebe8dd]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#65776c] sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>Less scrolling. More going.</span><span className="hidden h-px flex-1 border-t border-dashed border-[#c7c5b8] sm:mx-8 sm:block" /><span>Made for 2–4 day getaways</span><span className="hidden h-px flex-1 border-t border-dashed border-[#c7c5b8] sm:mx-8 sm:block" /><span>Keep the good bits close</span>
        </div>
      </div>
    </div>
  );
}

function WorkspaceHome({ firstName }) {
  return (
    <div className="min-h-[70vh] bg-[#f4f0e7] text-[#203a34]">
      <section className="relative overflow-hidden bg-[#183d39] text-[#f5f0e5]">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 80% 0%, #638673 0, transparent 38%), radial-gradient(ellipse at 10% 100%, #355b4d 0, transparent 42%)' }} />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-14 sm:px-10 sm:py-20 md:flex-row md:items-end lg:px-16">
          <div>
            <p className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.21em] text-[#dcb37c]"><Compass className="h-3.5 w-3.5" /> Your map is still unfolding</p>
            <h1 className="mt-5 font-heading text-4xl font-medium leading-tight tracking-[-.06em] sm:text-6xl">Welcome back{firstName ? `, ${firstName}` : ''}.</h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#c7d2c5] sm:text-base">Pick up an old idea or follow a new one. A few days away can start right here.</p>
          </div>
          <Link to="/create-trip" className="group inline-flex min-h-[52px] w-fit items-center gap-3 rounded-full bg-[#d46a49] px-5 text-sm font-bold text-white transition hover:bg-[#e07a58]">Sketch a new trip <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
          <span className="absolute right-8 top-7 hidden font-serif text-[10px] uppercase tracking-[.3em] text-white/40 lg:block">Your next chapter / 001</span>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-9 sm:px-10 sm:py-12 md:grid-cols-3 lg:px-16">
        {workspaceLinks.map(({ icon: Icon, number, title, detail, to, action }) => (
          <article key={to} className="group flex min-h-[260px] flex-col border-t-2 border-[#d8d3c6] bg-[#faf8f1] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#cb6547] hover:shadow-[0_18px_42px_rgba(38,57,47,.08)] sm:p-7">
            <div className="flex items-center justify-between"><span className="font-serif text-xs italic text-[#a19b8b]">/ {number}</span><span className="grid h-10 w-10 place-items-center rounded-full bg-[#eae8dc] text-[#bc6144] transition group-hover:bg-[#cf6546] group-hover:text-white"><Icon className="h-[18px] w-[18px]" /></span></div>
            <h2 className="mt-7 font-heading text-xl font-semibold tracking-[-.035em] text-[#29483d]">{title}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-[#738078]">{detail}</p>
            <Link to={to} className="mt-6 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#b95e40]">{action} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link>
          </article>
        ))}
      </section>
    </div>
  );
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const firstName = user?.full_name?.trim().split(/\s+/)[0];
  return isAuthenticated ? <WorkspaceHome firstName={firstName} /> : <WelcomeHome />;
}
