import React from 'react';
import { ArrowUpRight, Compass, MapPin, Sparkles } from 'lucide-react';

export default function AuthLayout({ children, mode = 'login' }) {
  const isRegister = mode === 'register';

  return (
    <div className="auth-scene relative min-h-[calc(100vh-68px)] overflow-hidden bg-[#f3efe6] px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="auth-shell mx-auto grid min-h-[min(780px,calc(100vh-116px))] max-w-[1320px] overflow-hidden bg-[#fbf9f3] shadow-[0_32px_100px_rgba(23,48,43,.15)] lg:grid-cols-[1.08fr_.92fr]">
        <aside className="auth-poster relative min-h-[350px] overflow-hidden bg-[#193b38] text-white sm:min-h-[390px] lg:min-h-0">
          <div className="poster-glow absolute inset-0" aria-hidden="true" />
          <div className="poster-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <svg className="poster-contours absolute inset-0 h-full w-full" viewBox="0 0 760 850" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <circle cx="515" cy="298" r="96" stroke="#E7B578" strokeOpacity=".55" />
            <circle cx="515" cy="298" r="131" stroke="#E7B578" strokeOpacity=".28" />
            <circle cx="515" cy="298" r="174" stroke="#E7B578" strokeOpacity=".18" />
            <path d="M-80 621C91 506 182 534 284 428C384 324 450 372 519 299C587 227 666 185 819 191" stroke="#E3B478" strokeOpacity=".85" strokeWidth="2" strokeDasharray="5 10" className="auth-route" />
            <path d="M-90 722C80 607 176 647 293 529C397 424 464 458 563 379C645 313 720 296 838 318" stroke="#D6E5D5" strokeOpacity=".13" />
            <path d="M-58 758C111 642 210 682 322 566C432 453 503 496 600 414C681 344 749 341 843 357" stroke="#D6E5D5" strokeOpacity=".12" />
            <path d="M-44 510C94 419 178 449 270 350C361 253 445 283 471 191" stroke="#D6E5D5" strokeOpacity=".12" />
            <circle cx="515" cy="298" r="7" fill="#E7B578" />
            <circle cx="284" cy="428" r="6" fill="#F4E8CC" />
          </svg>

          <div className="relative flex h-full min-h-[350px] flex-col justify-between p-6 sm:min-h-[390px] sm:p-9 lg:min-h-[680px] lg:p-12 xl:p-14">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-[#f1c28c]"><Compass className="h-5 w-5" /></span>
                <span className="text-sm font-extrabold tracking-[.02em]">TravelWise</span>
              </div>
              <span className="hidden text-[9px] font-bold uppercase tracking-[.23em] text-white/45 sm:block">A field guide for going</span>
            </div>

            <div className="poster-copy relative z-10 mt-12 max-w-[540px] lg:mt-20">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#e9b77b]"><Sparkles className="h-3.5 w-3.5" /> {isRegister ? 'Start with a daydream' : 'Your trip is right where you left it'}</p>
              <h2 className="mt-5 font-heading text-[2.7rem] font-medium leading-[.96] tracking-[-.065em] sm:text-6xl xl:text-[4.6rem]">
                {isRegister ? <>A new map<br />is <span className="font-serif font-normal italic text-[#e9b77b]">yours to make.</span></> : <>The good<br />days are<br /><span className="font-serif font-normal italic text-[#e9b77b]">up ahead.</span></>}
              </h2>
              <p className="mt-5 max-w-[340px] text-sm leading-7 text-[#d2ddd1]/75">{isRegister ? 'Keep the places you love. Find a few you didn’t know to look for.' : 'Your saved places, little plans, and next escape are waiting.'}</p>
            </div>

            <div className="relative mt-9 flex items-end justify-between gap-4 lg:mt-12">
              <div className="flex items-center gap-3 text-[#d9e0d4]">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8b779] text-[#25453d]"><MapPin className="h-4 w-4" /></span>
                <div><p className="text-[10px] font-bold uppercase tracking-[.16em]">The Western Ghats</p><p className="mt-1 text-[10px] text-white/50">12° 21' N · a slower way through</p></div>
              </div>
              <div className="poster-stamp hidden h-[72px] w-[72px] rotate-[-12deg] items-center justify-center rounded-full border border-dashed border-[#e7b578]/65 text-center font-serif text-[10px] italic leading-4 text-[#e7b578] sm:flex">TAKE<br />THE LONG<br />WAY HOME</div>
            </div>
            <span className="absolute bottom-[30%] right-[16%] hidden animate-float rounded-xl border border-white/15 bg-[#244b44]/80 px-3 py-2 text-[10px] text-[#f0ede1] shadow-xl backdrop-blur-md sm:block"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#e7b578]" /> Three days. Plenty of stories.</span>
          </div>
        </aside>

        <main className="relative flex items-center justify-center px-5 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-[4.5rem]">
          <ArrowUpRight className="absolute right-8 top-8 hidden h-5 w-5 text-[#c9c4b6] lg:block" />
          <div className="auth-form w-full max-w-[420px]">{children}</div>
        </main>
      </div>
      <p className="mx-auto mt-4 flex max-w-[1320px] items-center justify-between px-2 text-[9px] font-bold uppercase tracking-[.2em] text-[#928f82]"><span>Plan less. Be there more.</span><span>TRAVELWISE · 2026</span></p>
    </div>
  );
}
