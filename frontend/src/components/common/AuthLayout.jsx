import React from 'react';
import { Compass, MapPin, Sparkles } from 'lucide-react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#f7f6f1] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[min(760px,calc(100vh-132px))] max-w-6xl overflow-hidden rounded-[2rem] border border-[#e5e8df] bg-white shadow-[0_28px_80px_rgba(29,54,37,.09)] lg:grid-cols-[1.02fr_.98fr]">
        <aside className="relative hidden overflow-hidden bg-[#1d4636] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#173c2d]/95 via-[#1b4937]/80 to-[#182e27]/65" aria-hidden="true" />
          <div className="absolute -right-24 top-28 h-80 w-80 rounded-full border border-white/15" aria-hidden="true" />
          <div className="absolute -right-10 top-44 h-52 w-52 rounded-full border border-white/10" aria-hidden="true" />

          <div className="relative">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20"><Compass className="h-5 w-5" /></span>
              <span className="text-lg font-extrabold tracking-tight">TravelWise</span>
            </div>
            <p className="mt-16 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-[#d7e5d5]">
              <Sparkles className="h-3.5 w-3.5" /> A little room to roam
            </p>
            <h2 className="mt-5 max-w-md font-heading text-4xl font-medium leading-[1.08] tracking-[-.04em] xl:text-5xl">
              The best trips start with a simple idea.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              Find places worth the detour, make a plan that fits your pace, and keep every detail close at hand.
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#e8eddf] text-[#315940]"><MapPin className="h-5 w-5" /></span>
            <div>
              <p className="text-sm font-bold">Made for the days away</p>
              <p className="mt-0.5 text-xs text-white/70">Thoughtful plans for short getaways.</p>
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-[430px]">{children}</div>
        </main>
      </div>
      <p className="mx-auto mt-5 max-w-6xl px-2 text-center text-[11px] font-medium tracking-wide text-[#879187]">PLAN LESS. BE THERE MORE.</p>
    </div>
  );
}
