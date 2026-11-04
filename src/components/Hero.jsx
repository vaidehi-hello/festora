import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Poster from './Poster';
import Countdown from './Countdown';
import { categories, events } from '../data/events';
import { fmtShort, fmtTime } from '../lib/format';

const next = [...events].sort((a, b) => a.date - b.date)[0];
const freeCount = events.filter((e) => e.price === 0).length;

export default function Hero() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/events?q=${encodeURIComponent(term)}` : '/events');
  };

  const rise = (ms) => ({ animationDelay: `${ms}ms` });

  return (
    <section className="dark hero-bg relative overflow-hidden rounded-b-[2.5rem] text-ink sm:rounded-b-[4rem]">
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sand/40 blur-3xl dark:bg-steel/30" />

      <div className="container-x relative grid grid-cols-1 items-center gap-14 pb-24 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
        <div>
          <h1 style={rise(0)} className="animate-rise text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            Find events worth showing up for.
          </h1>
          <p style={rise(120)} className="mt-6 max-w-lg animate-rise text-lg leading-relaxed text-muted">
            Concerts, seminars, workshops and food fairs happening near you. Search, pick a date and register in under a minute.
          </p>

          <form
            onSubmit={submit}
            role="search"
            style={rise(240)}
            className="mt-8 flex max-w-xl animate-rise items-center gap-2 rounded-full border border-line bg-surface p-1.5 shadow-lg shadow-midnight/5 focus-within:border-accent"
          >
            <Search size={20} className="ml-4 shrink-0 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events, venues or topics"
              aria-label="Search events"
              className="w-0 min-w-0 flex-1 bg-transparent px-2 py-3 text-sm placeholder:text-muted/70 focus:outline-none"
            />
            <button type="submit" className="btn-primary px-6">
              Search
            </button>
          </form>

          <div style={rise(340)} className="-mx-5 mt-5 animate-rise sm:mx-0 sm:max-w-xl">
  <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1 [mask-image:linear-gradient(to_right,black_88%,transparent)] sm:flex-wrap sm:overflow-visible sm:px-0 sm:[mask-image:none]">
    {categories.map((c) => (
      <Link
        key={c.name}
        to={`/events?category=${encodeURIComponent(c.name)}`}
        className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line/80 px-3.5 py-1.5 text-sm text-muted transition hover:border-accent hover:bg-line/20 hover:text-ink"
      >
        <c.icon size={15} /> {c.name}
      </Link>
    ))}
  </div>
</div>

          <dl
  style={rise(440)}
  className="stats-band mt-8 grid max-w-lg animate-rise grid-cols-3 divide-x divide-[#B49A5F]/30 rounded-2xl border border-[#B49A5F]/40 py-5 shadow-xl shadow-black/30"
>
  {[
    [events.length, 'Events'],
    [categories.length, 'Categories'],
    [freeCount, 'Free entry'],
  ].map(([n, label]) => (
    <div key={label} className="flex flex-col-reverse px-2 text-center">
      <dt className="mt-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/80 sm:text-xs sm:tracking-[0.2em]">{label}</dt>
      <dd className="font-display text-4xl leading-none text-[#E3D3A4] sm:text-5xl">{n}</dd>
    </div>
  ))}
</dl>
        </div>

        <div style={rise(200)} className="relative mx-auto w-full max-w-md animate-rise lg:max-w-none lg:pl-8">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-b-[2rem] rounded-t-[999px] border border-accent/60 lg:left-8" />
          <Link
            to={`/events/${next.id}`}
            aria-label={`Next event: ${next.title}`}
            className="relative block aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[999px]"
          >
            <Poster event={next} eager className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
          </Link>

          <div className="absolute -bottom-8 left-0 w-[82%] animate-float rounded-3xl border border-line/60 bg-surface p-4 shadow-2xl shadow-midnight/20 sm:-left-6 lg:left-2">
            <p className="text-xs text-muted">Next up</p>
            <Link to={`/events/${next.id}`} className="mt-0.5 flex items-center justify-between gap-3 font-display text-lg leading-snug hover:underline">
              <span>{next.title}</span>
              <ArrowRight size={18} className="shrink-0" />
            </Link>
            <p className="mb-3 mt-1 text-xs text-muted">
              {fmtShort(next.date)}, {fmtTime(next.date)} · {next.venue}
            </p>
            <Countdown date={next.date} small />
          </div>
        </div>
      </div>
    </section>
  );
}
