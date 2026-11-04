import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CalendarPlus, CalendarDays, CheckCircle2, MapPin } from 'lucide-react';
import { downloadIcs } from '../lib/ics';
import { fmtShort, fmtTime } from '../lib/format';

export default function ConfirmModal({ reg, event, onClose }) {
  const doneRef = useRef(null);

  useEffect(() => {
    doneRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-midnight/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="w-full max-w-md animate-pop rounded-3xl bg-surface p-7 text-center shadow-2xl">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent">
          <CheckCircle2 size={34} />
        </span>
        <h2 id="confirm-title" className="mt-5 text-3xl">
          You are in, {reg.name.split(' ')[0]}!
        </h2>
        <p className="mt-2 text-sm text-muted">
          We saved your registration. A confirmation will be sent to <strong className="text-ink">{reg.email}</strong>.
        </p>

        <div className="mt-6 rounded-2xl border border-dashed border-line bg-bg p-4 text-left">
          <p className="font-display text-lg leading-snug">{event.title}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <CalendarDays size={16} className="text-accent" /> {fmtShort(event.date)}, {fmtTime(event.date)}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} className="text-accent" /> {event.venue}
          </p>
          <p className="mt-3 border-t border-line/60 pt-3 text-xs text-muted">
            Ticket ID <span className="font-bold tracking-wider text-ink">{reg.id}</span>
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button onClick={() => downloadIcs(event)} className="btn-ghost">
            <CalendarPlus size={16} /> Add to calendar
          </button>
          <Link to="/tickets" onClick={onClose} className="btn-ghost">
            View my tickets
          </Link>
        </div>
        <button ref={doneRef} onClick={onClose} className="btn-primary mt-3 w-full">
          Done
        </button>
      </div>
    </div>
  );
}
