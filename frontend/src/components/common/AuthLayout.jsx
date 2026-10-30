import React from 'react';
import { ArrowUpRight, Compass, MapPin, Sparkles } from 'lucide-react';

export default function AuthLayout({ children, mode = 'login' }) {
  const isRegister = mode === 'register';

  return (
    <div className="auth-scene relative min-h-[calc(100vh-68px)] overflow-hidden bg-[#f2eee4] p-0 sm:px-5 sm:py-5 lg:px-8">
      <div className="auth-shell mx-auto grid min-h-[calc(100vh-68px)] max-w-[1500px] overflow-hidden bg-[#fbf9f3] shadow-[0_32px_100px_rgba(23,48,43,.15)] sm:min-h-[min(800px,calc(100vh-108px))] lg:grid-cols-[1.05fr_.95fr]">
        <aside className="auth-poster relative min-h-[260px] overflow-hidden bg-[#193b38] text-white sm:min-h-[340px] lg:min-h-[min(800px,calc(100vh-108px))]">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=90" alt="Sunlight crossing a mountain range" className="auth-photo absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,34,30,.38)_0%,rgba(15,34,29,.12)_36%,rgba(13,30,27,.82)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,40,34,.35),transparent)]" />
          <div className="relative flex h-full min-h-[260px] flex-col justify-between p-5 sm:min-h-[340px] sm:p-8 lg:min-h-[min(800px,calc(100vh-108px))] lg:p-12 xl:p-14">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-white/10 text-[#f1c28c] backdrop-blur"><Compass className="h-5 w-5" /></span><span className="text-sm font-extrabold tracking-[.02em]">TravelWise</span></div>
              <span className="hidden text-[9px] font-bold uppercase tracking-[.23em] text-white/65 sm:block">A field guide for going</span>
            </div>
            <div className="poster-copy relative z-10 mt-12 max-w-[570px] lg:mt-20">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#f3c68f]"><Sparkles className="h-3.5 w-3.5" /> {isRegister ? 'Start with a daydream' : 'Your trip is right where you left it'}</p>
              <h2 className="mt-5 font-heading text-[2.6rem] font-medium leading-[.93] tracking-[-.065em] sm:text-6xl xl:text-[5rem]">{isRegister ? <>Somewhere<br />new is <span className="font-serif font-normal italic text-[#f3c68f]">calling.</span></> : <>The good days<br />are <span className="font-serif font-normal italic text-[#f3c68f]">up ahead.</span></>}</h2>
              <p className="mt-5 max-w-[340px] text-sm leading-7 text-white/75">{isRegister ? 'Keep the places you love. Find a few you didn’t know to look for.' : 'Your saved places, little plans, and next escape are waiting.'}</p>
            </div>
            <div className="relative mt-9 flex items-end justify-between gap-4 lg:mt-12">
              <div className="flex items-center gap-3 text-white"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#f1c58d] text-[#25453d]"><MapPin className="h-4 w-4" /></span><div><p className="text-[10px] font-bold uppercase tracking-[.16em]">The Western Ghats</p><p className="mt-1 text-[10px] text-white/70">12° 21' N · a slower way through</p></div></div>
              <div className="poster-stamp hidden h-[72px] w-[72px] rotate-[-12deg] items-center justify-center rounded-full border border-dashed border-white/75 text-center font-serif text-[10px] italic leading-4 text-white sm:flex">TAKE<br />THE LONG<br />WAY HOME</div>
            </div>
          </div>
          <span className="auth-floating-note absolute right-8 top-[44%] hidden rounded-xl border border-white/25 bg-[#183931]/40 px-4 py-3 text-[10px] text-white shadow-xl backdrop-blur-md sm:block"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#efbe7e]" /> Three days. Plenty of stories.</span>
        </aside>

        <main className="relative flex items-center justify-center px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-[5.5rem]">
          <ArrowUpRight className="absolute right-8 top-8 hidden h-5 w-5 text-[#c9c4b6] lg:block" />
          <div className="auth-form w-full max-w-[420px]">{children}</div>
        </main>
      </div>
      <p className="mx-auto mt-4 hidden max-w-[1500px] items-center justify-between px-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#928f82] sm:flex"><span>Plan less. Be there more.</span><span>TRAVELWISE · 2026</span></p>
    </div>
  );
}
