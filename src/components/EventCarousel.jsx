import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from './EventCard';
import Reveal from './Reveal';
import { events } from '../data/events';

const popular = events.filter((e) => e.popular).sort((a, b) => a.date - b.date);
const GAP = 24; // must match gap-6 below
const AUTOPLAY_MS = 4500;

// distance between the start of one slide and the next
const stepOf = (el) => (el.children.length > 1 ? el.children[1].offsetLeft - el.children[0].offsetLeft : 0);

export default function EventCarousel() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const [positions, setPositions] = useState(popular.length);
  const [paused, setPaused] = useState(false);
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const current = Math.min(active, positions - 1);

  // how many cards fit on screen decides how many "stops" the carousel has
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const step = stepOf(el);
    if (!step) return;
    const perView = Math.max(1, Math.round((el.clientWidth + GAP) / step));
    setPositions(Math.max(1, popular.length - perView + 1));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const go = useCallback((index) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: index * stepOf(el), behavior: 'smooth' });
  }, []);

  const onScroll = () => {
    const el = track.current;
    const step = stepOf(el);
    if (!step) return;
    setActive(Math.min(positions - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  const next = () => go(current + 1 >= positions ? 0 : current + 1);
  const prev = () => go(current - 1 < 0 ? positions - 1 : current - 1);

  // auto scroll: moves on every few seconds, loops back to the first card
  useEffect(() => {
    if (paused || reduceMotion || positions < 2) return undefined;
    const timer = setTimeout(() => go(current + 1 >= positions ? 0 : current + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [current, paused, reduceMotion, positions, go]);

  const arrow =
    'absolute top-1/4 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line/70 bg-surface/90 text-ink shadow-lg shadow-midnight/10 backdrop-blur transition duration-200 hover:scale-105 hover:bg-brand hover:text-brand-ink active:scale-95 sm:h-12 sm:w-12';

  return (
    <section className="py-16 sm:py-24" aria-labelledby="popular-title">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="popular-title" className="text-4xl sm:text-5xl">
            Popular right now
          </h2>
          <span aria-hidden className="mx-auto mt-5 block h-[3px] w-14 rounded-full bg-accent" />
          <p className="mt-5 text-muted">The events people are registering for this month.</p>
        </Reveal>

        <Reveal delay={120}>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Popular events"
            className="relative mt-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <button onClick={prev} aria-label="Previous event" className={`${arrow} left-2 sm:-left-5 lg:-left-6`}>
              <ChevronLeft size={22} />
            </button>

            <div
              ref={track}
              onScroll={onScroll}
              className="no-scrollbar relative flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-6"
            >
              {popular.map((event) => (
                <div key={event.id} className="w-full shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  {/* on phones: one card, centered */}
                  <div className="mx-auto h-full max-w-md sm:max-w-none">
                    <EventCard event={event} />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={next} aria-label="Next event" className={`${arrow} right-2 sm:-right-5 lg:-right-6`}>
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="mt-2 flex justify-center gap-2" role="group" aria-label="Choose event position">
            {Array.from({ length: positions }, (_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to position ${i + 1}`}
                aria-current={i === current}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-accent' : 'w-2 bg-line/60 hover:bg-line'}`}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/events" className="btn-ghost">
              View all events <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}