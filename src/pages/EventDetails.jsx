import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, CalendarPlus, Check, Clock, MapPin, Share2, Ticket, Users } from 'lucide-react';
import Poster from '../components/Poster';
import Countdown from '../components/Countdown';
import RegisterForm from '../components/RegisterForm';
import EventCard from '../components/EventCard';
import Reveal from '../components/Reveal';
import { useToast } from '../components/Toast';
import { bySlug, categoryMap, events } from '../data/events';
import { fmtDuration, fmtFull, fmtPrice, fmtTime } from '../lib/format';
import { downloadIcs } from '../lib/ics';
import { seatsLeft, useRegistrations } from '../lib/storage';
import { useTitle } from '../hooks/useTitle';

export default function EventDetails() {
  const { slug } = useParams();
  const event = bySlug(slug);
  const toast = useToast();
  const regs = useRegistrations();
  useTitle(event?.title ?? 'Event not found');

  if (!event) {
    return (
      <div className="container-x py-28 text-center">
        <h1 className="text-4xl">We could not find that event</h1>
        <p className="mt-3 text-muted">It may have been removed or the link is incorrect.</p>
        <Link to="/events" className="btn-primary mt-8">
          Browse all events
        </Link>
      </div>
    );
  }

  const left = seatsLeft(event, regs);
  const Icon = categoryMap[event.category].icon;
  const related = events.filter((e) => e.category === event.category && e.id !== event.id);
  const more = (related.length ? related : events.filter((e) => e.id !== event.id)).slice(0, 3);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: event.title, url });
      else {
        await navigator.clipboard.writeText(url);
        toast('Link copied to clipboard');
      }
    } catch {
      /* share dialog dismissed */
    }
  };

  const facts = [
    { icon: CalendarDays, label: 'Date', value: fmtFull(event.date) },
    { icon: Clock, label: 'Time', value: `${fmtTime(event.date)} · ${fmtDuration(event.durationHrs)}` },
    { icon: MapPin, label: 'Venue', value: `${event.venue}, ${event.city}` },
    { icon: Ticket, label: 'Entry', value: fmtPrice(event.price) },
  ];

  return (
    <div className="container-x py-8 sm:py-12">
      <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink">
        <ArrowLeft size={16} /> All events
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.45fr_1fr]">
        <div>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem]">
              <Poster event={event} eager className="aspect-[16/9] w-full" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3.5 py-1.5 text-sm font-semibold text-midnight backdrop-blur">
                <Icon size={16} /> {event.category}
              </span>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <h1 className="text-4xl leading-tight sm:text-5xl">{event.title}</h1>
            <p className="mt-2 text-muted">Hosted by {event.organizer}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => downloadIcs(event)} className="btn-ghost py-2.5">
                <CalendarPlus size={16} /> Add to calendar
              </button>
              <button onClick={share} className="btn-ghost py-2.5">
                <Share2 size={16} /> Share
              </button>
            </div>
          </Reveal>

          <Reveal className="mt-8 grid gap-4 sm:grid-cols-2">
            {facts.map(({ icon: I, label, value }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-line/60 bg-surface p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-line/30">
                  <I size={20} />
                </span>
                <div>
                  <p className="text-xs text-muted">{label}</p>
                  <p className="font-semibold leading-snug">{value}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="text-2xl">About this event</h2>
            <div className="mt-3 space-y-4 leading-relaxed text-muted">
              {event.about.split('\n\n').map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <h2 className="text-2xl">What is included</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/25">
                    <Check size={14} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Reveal className="rounded-[2rem] border border-line/60 bg-surface p-6 shadow-xl shadow-midnight/5 sm:p-7">
            <p className="text-sm text-muted">Starts in</p>
            <div className="mt-2">
              <Countdown date={event.date} />
            </div>

            <div className="my-6 flex items-center justify-between rounded-2xl bg-bg px-4 py-3 text-sm">
              <span className="flex items-center gap-2 text-muted">
                <Users size={16} /> {left === 0 ? 'Sold out' : `${left} seats left`}
              </span>
              <span className="font-display text-xl">{fmtPrice(event.price)}</span>
            </div>

            <h2 className="mb-4 text-2xl">Register for this event</h2>
            <RegisterForm event={event} />
          </Reveal>
        </aside>
      </div>

      <section className="mt-20" aria-labelledby="more-title">
        <Reveal>
          <h2 id="more-title" className="text-3xl">
            {related.length ? `More in ${event.category}` : 'You might also like'}
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
