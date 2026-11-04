import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import Poster from './Poster';
import { categoryMap } from '../data/events';
import { fmtDay, fmtMonth, fmtShort, fmtTime, fmtPrice } from '../lib/format';
import { seatsLeft, useRegistrations } from '../lib/storage';

export default function EventCard({ event }) {
  const regs = useRegistrations();
  const left = seatsLeft(event, regs);
  const Icon = categoryMap[event.category].icon;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/60 bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-midnight/10">
      <Link to={`/events/${event.id}`} aria-label={`View ${event.title}`} className="relative block aspect-[16/10] overflow-hidden">
        <Poster event={event} className="h-full w-full" imgClass="transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-midnight backdrop-blur">
          <Icon size={14} /> {event.category}
        </span>
       <span className="absolute right-4 top-4 rounded-2xl bg-crimson px-3 py-1.5 text-center leading-tight text-cream">
          <span className="block text-lg font-bold">{fmtDay(event.date)}</span>
          <span className="block text-[11px] font-semibold">{fmtMonth(event.date)}</span>
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-medium leading-snug">{event.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{event.short}</p>

        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li className="flex items-center gap-2">
            <CalendarDays size={16} className="shrink-0 text-accent" />
            {fmtShort(event.date)}, {fmtTime(event.date)}
          </li>
          <li className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-accent" />
            <span className="truncate">{event.venue}</span>
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <div className="font-display text-xl">{fmtPrice(event.price)}</div>
            <div className={`text-xs ${left === 0 ? 'font-semibold text-red-600 dark:text-red-400' : 'text-muted'}`}>
              {left === 0 ? 'Sold out' : left <= 40 ? `Only ${left} seats left` : `${left} seats left`}
            </div>
          </div>
          <Link to={`/events/${event.id}`} className="btn-primary px-5 py-2.5">
            Explore event <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
