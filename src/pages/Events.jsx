import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SearchX, X } from 'lucide-react';
import EventCard from '../components/EventCard';
import Reveal from '../components/Reveal';
import { categories, events } from '../data/events';
import { useTitle } from '../hooks/useTitle';

export default function Events() {
  useTitle('Events');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? 'All';
  const sort = params.get('sort') ?? 'soonest';
  const freeOnly = params.get('free') === '1';

  // keep filters in the URL so links and the back button work
  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'All' && value !== 'soonest') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = events.filter((e) => {
      const matchesText = !term || [e.title, e.short, e.venue, e.category].some((s) => s.toLowerCase().includes(term));
      return matchesText && (category === 'All' || e.category === category) && (!freeOnly || e.price === 0);
    });
    const sorters = {
      soonest: (a, b) => a.date - b.date,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
    };
    return list.sort(sorters[sort]);
  }, [q, category, sort, freeOnly]);

  const hasFilters = q || category !== 'All' || freeOnly || sort !== 'soonest';
  const chip = (active) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
      active ? 'border-brand bg-brand text-brand-ink' : 'border-line text-muted hover:border-accent hover:text-ink'
    }`;

  return (
    <div className="container-x py-12 sm:py-16">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl">Everything on the calendar</h1>
        <p className="mt-3 max-w-xl text-muted">Search by name or venue, filter by category and open any event to register.</p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Search events, venues or topics"
            aria-label="Search events"
            className="input rounded-full py-3.5"
          />
          {q && (
            <button onClick={() => update('q', '')} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-line/30">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <select
            value={sort}
            onChange={(e) => update('sort', e.target.value)}
            aria-label="Sort events"
            className="rounded-full border border-line bg-bg px-5 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            <option value="soonest">Soonest first</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
          <button onClick={() => update('free', freeOnly ? '' : '1')} aria-pressed={freeOnly} className={chip(freeOnly)}>
            Free only
          </button>
        </div>
      </div>

      <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
        {['All', ...categories.map((c) => c.name)].map((name) => (
          <button key={name} onClick={() => update('category', name)} aria-pressed={category === name} className={chip(category === name)}>
            {name}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-muted" aria-live="polite">
        <p>
          {results.length} {results.length === 1 ? 'event' : 'events'} found
        </p>
        {hasFilters && (
          <button onClick={() => setParams({}, { replace: true })} className="font-semibold text-ink underline underline-offset-4">
            Reset filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((event, i) => (
            <Reveal key={event.id} delay={(i % 3) * 70}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-line px-6 py-20 text-center">
          <SearchX size={40} className="mx-auto text-muted" strokeWidth={1.5} />
          <h2 className="mt-4 text-2xl">No events match yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Try a different word, pick another category or clear the filters.</p>
          <button onClick={() => setParams({}, { replace: true })} className="btn-primary mt-6">
            Show all events
          </button>
        </div>
      )}
    </div>
  );
}
