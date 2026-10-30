import React from 'react';
import { ArrowUpRight, Compass, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children, mode = 'login' }) {
  const isRegister = mode === 'register';

  return (
    <div className="auth-scene flex min-h-screen items-center bg-[#d9ef68] p-0 sm:p-4 lg:p-6">
      <div className="auth-board relative mx-auto min-h-screen w-full max-w-[1500px] overflow-hidden bg-[#413ce9] text-white shadow-[0_30px_90px_rgba(34,39,129,.24)] sm:min-h-[min(850px,calc(100vh-32px))]">
        <div className="auth-sun absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full bg-[#6660ff]" />
        <div className="auth-lines absolute inset-0 opacity-30" />
        <header className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:px-12">
          <Link to="/" className="flex items-center gap-2.5 text-white"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#dcf264] text-[#25257f]"><Compass className="h-[18px] w-[18px]" /></span><span className="text-sm font-extrabold tracking-[.02em]">TravelWise</span></Link>
          <Link to="/" className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[.16em] text-white/75 transition hover:text-[#e2f671]">Back to explore <ArrowUpRight className="h-3.5 w-3.5" /></Link>
        </header>

        <div className="auth-cover relative mx-4 h-[230px] overflow-hidden rounded-[1.4rem] sm:mx-8 sm:h-[290px] lg:absolute lg:bottom-0 lg:right-0 lg:top-0 lg:mx-0 lg:h-auto lg:w-[68%] lg:rounded-none">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=90" alt="A mountain ridge above the clouds" className="auth-photo absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2e31b6]/25 via-transparent to-[#11104c]/55" />
          <div className="absolute inset-0 bg-[#413ce9]/10 mix-blend-color" />
          <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 lg:p-12">
            <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.22em] text-[#f2ffb6]"><Sparkles className="h-3.5 w-3.5" /> {isRegister ? 'The first page of your next story' : 'Your saved places are waiting'}</div>
            <div className="relative z-10">
              <h2 className="max-w-[640px] font-serif text-4xl font-medium leading-[.9] tracking-[-.055em] text-white sm:text-6xl lg:text-[5.3rem]">{isRegister ? <>Somewhere<br /><i className="font-normal text-[#e0f36d]">new is calling.</i></> : <>There’s a world<br /><i className="font-normal text-[#e0f36d]">out there.</i></>}</h2>
              <p className="mt-4 hidden max-w-xs text-sm leading-6 text-white/80 sm:block">{isRegister ? 'Make room for the detours, the long lunches and the stories.' : 'Pick up your plans and take the next little escape from here.'}</p>
            </div>
            <div className="hidden items-center justify-between lg:flex"><span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#17145e]/30 px-3 py-2 text-[9px] font-bold uppercase tracking-[.13em] text-white backdrop-blur-md"><MapPin className="h-3.5 w-3.5 text-[#e0f36d]" /> Western Ghats · 12° 21' N</span><span className="font-serif text-[10px] italic text-white/75">TAKE THE LONG WAY HOME</span></div>
          </div>
          <div className="auth-orbit absolute -right-20 top-[-55px] hidden h-[370px] w-[370px] rounded-full border border-white/45 lg:block"><span className="absolute left-[8%] top-[48%] grid h-10 w-10 place-items-center rounded-full bg-[#e0f36d] text-[#292886] shadow-[0_0_35px_rgba(224,243,109,.6)]"><Compass className="h-5 w-5" /></span></div>
        </div>

        <main className="auth-pass relative z-10 mx-4 mb-8 mt-[-18px] border border-[#252983]/15 bg-[#fbf8ec] px-5 py-6 text-[#22264d] shadow-[0_24px_65px_rgba(22,18,88,.22)] sm:mx-8 sm:px-8 sm:py-8 lg:absolute lg:left-[6%] lg:top-1/2 lg:mx-0 lg:mb-0 lg:mt-0 lg:w-[470px] lg:-translate-y-[43%] lg:px-10 lg:py-10 xl:left-[8%]">
          <div className="auth-ticket-edge pointer-events-none absolute inset-x-0 top-0 h-2" />
          <div className="mb-6 flex items-center justify-between border-b border-dashed border-[#c9c6b6] pb-3"><span className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[#4a46d8]">{isRegister ? 'Your travel pass · 01' : 'Your travel pass · Welcome back'}</span><span className="font-mono text-[9px] text-[#999787]">TW / 2026</span></div>
          {children}
          <span className="absolute -bottom-3 right-8 h-6 w-6 rounded-full border border-[#252983]/10 bg-[#413ce9]" />
          <span className="absolute -bottom-3 left-8 h-6 w-6 rounded-full border border-[#252983]/10 bg-[#413ce9]" />
        </main>

        <div className="pointer-events-none absolute bottom-6 left-[8%] hidden text-[9px] font-extrabold uppercase tracking-[.22em] text-white/55 lg:block">Plan less · Be there more</div>
      </div>
    </div>
  );
}
