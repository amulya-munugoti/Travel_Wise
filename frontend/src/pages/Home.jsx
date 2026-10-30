import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Bookmark, CalendarDays, Compass, MapPin, Plane, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const destinations = [
  {
    name: 'The mountain air',
    place: 'Coorg · Karnataka',
    days: '3 days, unhurried',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1100&q=85',
    number: '01',
    tone: 'mountain',
  },
  {
    name: 'Salt in your hair',
    place: 'Gokarna · Karnataka',
    days: '2 days by the sea',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85',
    number: '02',
    tone: 'ocean',
  },
  {
    name: 'Somewhere greener',
    place: 'Wayanad · Kerala',
    days: '4 days, off-grid',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1100&q=85',
    number: '03',
    tone: 'forest',
  },
];

const promises = [
  { icon: Compass, title: 'Find your kind of place', copy: 'Skip the endless search. Start with places worth the detour.' },
  { icon: CalendarDays, title: 'Leave room to wander', copy: 'Build an easy day-by-day plan around your pace and your people.' },
  { icon: Bookmark, title: 'Keep the good bits', copy: 'Save the stops, small details and plans you’ll want to find again.' },
];

function useScrollReveals() {
  useEffect(() => {
    const targets = document.querySelectorAll('.scroll-reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('in-view'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -45px 0px' });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function JourneyOrbit() {
  return (
    <div className="journey-orbit pointer-events-none absolute right-[-70px] top-[12%] z-[1] grid h-[250px] w-[250px] place-items-center sm:right-[2%] sm:top-[10%] sm:h-[340px] sm:w-[340px] lg:right-[7%] lg:top-[12%] lg:h-[410px] lg:w-[410px]" aria-hidden="true">
      <div className="orbit-ring orbit-ring-one absolute inset-[8%] rounded-full border border-white/25" />
      <div className="orbit-ring orbit-ring-two absolute inset-[18%] rounded-full border border-dashed border-[#f1c28c]/65" />
      <div className="orbit-plane absolute inset-[18%] rounded-full"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#f0bd80] text-[#183d37] shadow-[0_0_28px_rgba(240,189,128,.55)]"><Plane className="h-4 w-4 -rotate-12" /></span></div>
      <div className="orbit-globe relative grid h-[112px] w-[112px] place-items-center overflow-hidden rounded-full border border-white/35 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,.4),transparent_23%),radial-gradient(circle_at_70%_78%,#24564d,#153733_70%)] shadow-[0_0_90px_rgba(234,184,123,.26)] sm:h-[150px] sm:w-[150px] lg:h-[176px] lg:w-[176px]">
        <span className="absolute inset-x-[-30%] top-[35%] h-[38%] rotate-[-28deg] rounded-[50%] border border-white/30" />
        <span className="absolute inset-y-[-20%] left-[31%] w-[38%] rotate-[22deg] rounded-[50%] border border-white/25" />
        <Compass className="relative h-8 w-8 text-[#f1c28c] sm:h-10 sm:w-10" />
      </div>
      <span className="absolute left-[3%] top-[30%] rounded-full border border-white/30 bg-[#183b37]/65 px-3 py-2 text-[8px] font-extrabold uppercase tracking-[.17em] text-white backdrop-blur-md sm:left-[-1%]">Route found · 03 days</span>
      <span className="absolute bottom-[16%] right-[2%] rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[8px] font-extrabold uppercase tracking-[.17em] text-[#f4cc9b] backdrop-blur-md">12° 21' N · 75° 44' E</span>
    </div>
  );
}

function PhotoCard({ destination, index }) {
  return (
    <article className={`destination-card group destination-card-${index + 1} relative min-h-[420px] overflow-hidden bg-[#24423b] sm:min-h-[500px]`}>
      <img src={destination.image} alt={destination.place} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10231e]/85 via-[#10231e]/10 to-transparent" />
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-[#142722]/35 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-white backdrop-blur-md sm:left-6 sm:top-6">
        <span className="h-1.5 w-1.5 rounded-full bg-[#f1bd7d]" /> {destination.days}
      </div>
      <span className="absolute right-5 top-5 font-serif text-sm italic text-white/75 sm:right-6 sm:top-6">{destination.number}</span>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-white/75"><MapPin className="h-3 w-3" /> {destination.place}</p>
        <h3 className="mt-3 max-w-[280px] font-heading text-3xl font-medium leading-[1.05] tracking-[-.05em] sm:text-4xl">{destination.name}</h3>
        <Link to="/register" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.17em] text-[#f2bd80]">Make it your trip <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
      </div>
    </article>
  );
}

function WelcomeHome() {
  useScrollReveals();
  return (
    <div className="overflow-hidden bg-[#f3efe5] text-[#213b34]">
      <section className="photo-hero relative flex min-h-[690px] items-end overflow-hidden bg-[#173a35] sm:min-h-[760px] lg:min-h-[calc(100vh-68px)]">
        <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90" alt="Mountain lake at sunrise" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,30,26,.78)_0%,rgba(13,34,29,.44)_49%,rgba(11,28,26,.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(11,28,25,.55)_0%,transparent_45%)]" />
        <div className="absolute inset-0 bg-[#17352e]/10 mix-blend-multiply" />
        <JourneyOrbit />

        <div className="relative mx-auto grid w-full max-w-[1500px] items-end gap-10 px-5 pb-12 pt-20 sm:px-10 sm:pb-16 lg:grid-cols-[1fr_350px] lg:px-16 lg:pb-[6.5rem] xl:px-24">
          <div className="hero-copy max-w-[790px] text-white">
            <p className="mb-6 flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[.24em] text-[#f3ca97]"><span className="h-px w-8 bg-[#f3ca97]" /> A little further from ordinary</p>
            <h1 className="font-heading text-[4rem] font-medium leading-[.89] tracking-[-.075em] sm:text-7xl lg:text-[6.6rem] xl:text-[7.5rem]">
              Your weekend,<br />off the <span className="font-serif font-normal italic text-[#f0bf83]">map.</span>
            </h1>
            <p className="mt-7 max-w-[450px] text-sm leading-7 text-white/80 sm:text-base sm:leading-8">Trade the usual for somewhere that stays with you. Find the place, make a loose plan, then go.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/register" className="group inline-flex min-h-[55px] items-center justify-center gap-4 bg-[#d06d4e] px-6 text-xs font-extrabold uppercase tracking-[.12em] text-white shadow-[0_16px_36px_rgba(11,27,23,.28)] transition hover:-translate-y-1 hover:bg-[#df7957]">Find your next escape <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
              <Link to="/login" className="inline-flex min-h-[55px] items-center justify-center gap-2 border border-white/35 bg-white/5 px-6 text-xs font-bold uppercase tracking-[.1em] text-white backdrop-blur-md transition hover:bg-white/15">I’m coming back</Link>
            </div>
          </div>

          <aside className="hero-trip-card relative z-[2] mt-5 max-w-[330px] justify-self-end border border-white/25 bg-[#f7f1e6]/95 p-5 text-[#233c35] shadow-[0_24px_70px_rgba(9,26,22,.28)] backdrop-blur-lg sm:mt-7 lg:mt-0 xl:mr-5">
            <div className="flex items-center justify-between border-b border-[#ded7c8] pb-3">
              <span className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[#b75f43]">A weekend note / 014</span><Sparkles className="h-4 w-4 text-[#c56747]" />
            </div>
            <h2 className="mt-4 font-heading text-[1.65rem] font-semibold leading-none tracking-[-.045em]">Where the clouds<br />come to rest.</h2>
            <p className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.1em] text-[#748078]"><MapPin className="h-3 w-3 text-[#c56747]" /> Coorg, Karnataka</p>
            <div className="mt-5 grid grid-cols-3 border-y border-[#ded7c8] py-3 text-center">
              <div><strong className="block font-heading text-lg">03</strong><span className="text-[8px] font-bold uppercase tracking-[.14em] text-[#7c8278]">Days</span></div>
              <div className="border-x border-[#ded7c8]"><strong className="block font-heading text-lg">02</strong><span className="text-[8px] font-bold uppercase tracking-[.14em] text-[#7c8278]">Trails</span></div>
              <div><strong className="block font-heading text-lg">01</strong><span className="text-[8px] font-bold uppercase tracking-[.14em] text-[#7c8278]">Good idea</span></div>
            </div>
            <div className="mt-4 flex items-center justify-between"><span className="text-[10px] font-medium text-[#6e786f]">The long way is the right way.</span><span className="grid h-8 w-8 place-items-center rounded-full bg-[#d06d4e] text-white"><ArrowUpRight className="h-4 w-4" /></span></div>
            <span className="absolute -right-3 -top-4 rotate-6 border border-[#e8bf8d]/65 bg-[#f3c78e] px-3 py-1.5 text-[8px] font-extrabold uppercase tracking-[.16em] text-[#574932] shadow-lg">3 days away</span>
          </aside>
        </div>
        <a href="#get-inspired" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[8px] font-bold uppercase tracking-[.23em] text-white/70 lg:flex">Scroll into the good part <ArrowDown className="h-4 w-4 animate-bounce" /></a>
        <span className="absolute right-8 top-8 hidden text-right text-[9px] font-bold uppercase leading-5 tracking-[.19em] text-white/70 lg:block">12° 21' N<br />75° 44' E</span>
      </section>

      <div className="marquee-band overflow-hidden border-y border-[#d8d2c5] bg-[#e9e4d8] py-4">
        <div className="marquee-track flex w-max items-center gap-8 text-[10px] font-extrabold uppercase tracking-[.23em] text-[#51675a] sm:gap-12 sm:text-xs">
          {Array.from({ length: 4 }, (_, index) => <React.Fragment key={index}><span>Leave the feed</span><span className="text-[#c96b4b]">✳</span><span>Take the road</span><span className="text-[#c96b4b]">✳</span><span>Keep the story</span><span className="text-[#c96b4b]">✳</span></React.Fragment>)}
        </div>
      </div>

      <section id="get-inspired" className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 sm:py-24 lg:px-16 xl:px-24">
        <div className="scroll-reveal mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div className="section-reveal max-w-xl"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#bd6244]">Three days can change the week</p><h2 className="mt-4 font-heading text-4xl font-medium leading-[.96] tracking-[-.065em] text-[#203a34] sm:text-6xl">Pick your kind<br />of <span className="font-serif italic text-[#c66a4a]">away.</span></h2></div>
          <p className="max-w-xs pb-1 text-sm leading-6 text-[#738078]">A little inspiration for wherever your mind wanders first.</p>
        </div>
        <div className="scroll-reveal grid gap-4 md:grid-cols-3 md:gap-5">{destinations.map((destination, index) => <PhotoCard key={destination.name} destination={destination} index={index} />)}</div>
      </section>

      <section className="relative overflow-hidden bg-[#183b37] text-[#f7f2e8]">
        <div className="absolute -right-40 -top-60 h-[520px] w-[520px] rounded-full border border-white/[.08]" /><div className="absolute -right-24 -top-44 h-[360px] w-[360px] rounded-full border border-white/[.08]" />
        <div className="scroll-reveal relative mx-auto grid max-w-[1500px] gap-12 px-5 py-16 sm:px-10 sm:py-20 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-16 xl:px-24">
          <div><p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.2em] text-[#edbd80]"><Compass className="h-4 w-4" /> A better kind of travel planning</p><h2 className="mt-5 max-w-lg font-heading text-4xl font-medium leading-[.98] tracking-[-.06em] sm:text-6xl">Less itinerary.<br /><span className="font-serif font-normal italic text-[#edbd80]">More in it.</span></h2><p className="mt-5 max-w-md text-sm leading-7 text-white/65">A good getaway doesn’t need a spreadsheet. Just a few places you’re excited about and enough room for the unexpected.</p><Link to="/register" className="group mt-8 inline-flex min-h-[52px] items-center gap-4 bg-[#d06d4e] px-5 text-xs font-extrabold uppercase tracking-[.12em] text-white transition hover:bg-[#df7957]">Start making yours <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
          <div className="itinerary-pop relative mx-auto w-full max-w-[560px]">
            <div className="overflow-hidden border border-white/15 bg-[#213f39] p-5 shadow-2xl sm:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-4"><div><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[#edbd80]">Your three-day feeling</p><h3 className="mt-1 font-heading text-xl font-semibold">A long weekend in Coorg</h3></div><span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#edbd80]"><CalendarDays className="h-4 w-4" /></span></div>
              <div className="mt-5 space-y-4">
                {[['FRI', 'Arrive slowly', 'A coffee stop, winding roads, nowhere to be'], ['SAT', 'Follow the green', 'A forest walk and lunch under the trees'], ['SUN', 'One last view', 'Take the scenic route back home']].map(([day, title, note], i) => <div key={day} className="trip-day-row flex items-start gap-4"><span className="w-9 pt-1 text-[9px] font-extrabold tracking-[.16em] text-[#edbd80]">{day}</span><span className="relative mt-1 grid h-3 w-3 shrink-0 place-items-center rounded-full border border-[#edbd80]"><i className="h-1 w-1 rounded-full bg-[#edbd80]" />{i < 2 && <i className="absolute top-3 h-10 w-px bg-white/20" />}</span><span className="pb-1"><strong className="block text-sm font-semibold">{title}</strong><small className="mt-1 block text-[10px] text-white/50">{note}</small></span></div>)}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-[9px] font-bold uppercase tracking-[.15em] text-white/50"><span>Plans are meant to breathe</span><span className="text-[#edbd80]">01 / 03</span></div>
            </div>
            <span className="absolute -bottom-3 -left-3 -rotate-3 bg-[#edbd80] px-3 py-2 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#234239] shadow-lg">Easy does it</span>
          </div>
        </div>
      </section>

      <section className="scroll-reveal mx-auto flex max-w-[1500px] flex-col items-center gap-5 px-5 py-14 text-center sm:px-10 sm:py-20">
        <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#bd6244]">The next story is yours</p><h2 className="font-heading text-4xl font-medium tracking-[-.06em] text-[#203a34] sm:text-5xl">Where will you disappear to?</h2><div className="mt-2 flex flex-col gap-3 sm:flex-row"><Link to="/register" className="inline-flex min-h-[52px] items-center justify-center gap-3 bg-[#cf6546] px-6 text-xs font-extrabold uppercase tracking-[.12em] text-white transition hover:bg-[#b95337]">Let’s find out <ArrowRight className="h-4 w-4" /></Link><Link to="/login" className="inline-flex min-h-[52px] items-center justify-center px-6 text-xs font-extrabold uppercase tracking-[.12em] text-[#415d51] hover:bg-[#e8e3d7]">Sign in</Link></div>
      </section>
    </div>
  );
}

function WorkspaceHome({ firstName }) {
  return (
    <div className="min-h-[70vh] bg-[#f3efe5] text-[#203a34]">
      <section className="relative flex min-h-[390px] items-end overflow-hidden bg-[#183b37] sm:min-h-[470px]">
        <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=85" alt="Mountain lake at sunrise" className="hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#102822]/80 via-[#102822]/45 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1500px] px-5 pb-12 pt-20 text-white sm:px-10 sm:pb-16 lg:px-16 xl:px-24"><p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.21em] text-[#f0bf83]"><Compass className="h-3.5 w-3.5" /> The map is still unfolding</p><h1 className="mt-5 font-heading text-4xl font-medium tracking-[-.06em] sm:text-6xl">Welcome back{firstName ? `, ${firstName}` : ''}.</h1><p className="mt-4 max-w-lg text-sm leading-7 text-white/75 sm:text-base">Pick up an old idea or follow a new one. A few days away can start right here.</p><Link to="/create-trip" className="group mt-7 inline-flex min-h-[50px] items-center gap-3 bg-[#cf6546] px-5 text-xs font-extrabold uppercase tracking-[.12em] text-white">Sketch a new trip <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
      </section>
      <section className="mx-auto grid max-w-[1500px] gap-4 px-5 py-9 sm:px-10 sm:py-14 md:grid-cols-3 lg:px-16 xl:px-24">
        {promises.map(({ icon: Icon, title, copy }, i) => <Link key={title} to={['/places', '/create-trip', '/saved-trips'][i]} className="group border-t-2 border-[#d8d3c6] bg-[#faf8f1] p-6 transition hover:-translate-y-1 hover:border-[#cb6547] hover:shadow-[0_18px_42px_rgba(38,57,47,.08)] sm:p-7"><div className="flex items-center justify-between"><span className="font-serif text-xs italic text-[#a19b8b]">/ 0{i + 1}</span><span className="grid h-10 w-10 place-items-center rounded-full bg-[#eae8dc] text-[#bc6144] transition group-hover:bg-[#cf6546] group-hover:text-white"><Icon className="h-[18px] w-[18px]" /></span></div><h2 className="mt-7 font-heading text-xl font-semibold tracking-[-.035em]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#738078]">{copy}</p></Link>)}
      </section>
    </div>
  );
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const firstName = user?.full_name?.trim().split(/\s+/)[0];
  return isAuthenticated ? <WorkspaceHome firstName={firstName} /> : <WelcomeHome />;
}
