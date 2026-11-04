import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Ticket, Trash2 } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useToast } from '../components/Toast';
import { bySlug } from '../data/events';
import { fmtDay, fmtMonth, fmtShort, fmtTime } from '../lib/format';
import { removeRegistration, useRegistrations } from '../lib/storage';
import { useTitle } from '../hooks/useTitle';

export default function MyTickets() {
  useTitle('My tickets');
  const regs = useRegistrations();
  const toast = useToast();

  const items = regs
    .map((r) => ({ reg: r, event: bySlug(r.eventId) }))
    .filter((x) => x.event)
    .sort((a, b) => a.event.date - b.event.date);

  const cancel = (reg, event) => {
    if (window.confirm(`Cancel your registration for ${event.title}?`)) {
      removeRegistration(reg.id);
      toast('Registration cancelled');
    }
  };

  return (
    <div className="container-x py-12 sm:py-16">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl">My tickets</h1>
        <p className="mt-3 max-w-xl text-muted">Every event you registered for on this device.</p>
      </Reveal>

      {items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-line px-6 py-20 text-center">
          <Ticket size={40} className="mx-auto text-muted" strokeWidth={1.5} />
          <h2 className="mt-4 text-2xl">No tickets yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted">Find something you like and register. It will show up here.</p>
          <Link to="/events" className="btn-primary mt-6">
            Browse events
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {items.map(({ reg, event }, i) => (
            <Reveal key={reg.id} delay={(i % 2) * 80}>
              <article className="flex overflow-hidden rounded-3xl border border-line/60 bg-surface">
                <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-brand px-3 text-brand-ink sm:w-28">
                  <span className="font-display text-4xl leading-none">{fmtDay(event.date)}</span>
                  <span className="mt-1 text-sm">{fmtMonth(event.date)}</span>
                </div>
                <div className="flex-1 border-l border-dashed border-line p-5">
                  <Link to={`/events/${event.id}`} className="font-display text-xl leading-snug hover:underline">
                    {event.title}
                  </Link>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                    <CalendarDays size={15} className="text-accent" /> {fmtShort(event.date)}, {fmtTime(event.date)}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                    <MapPin size={15} className="text-accent" /> {event.venue}
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="text-muted">Registered as </span>
                    <strong>{reg.name}</strong>
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-line/30 px-3 py-1 text-xs font-bold tracking-wider">{reg.id}</span>
                    <button onClick={() => cancel(reg, event)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline dark:text-red-400">
                      <Trash2 size={15} /> Cancel
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
