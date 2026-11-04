import { useCountdown } from '../hooks/useCountdown';

function Unit({ value, label, small }) {
  return (
    <div className="flex-1 rounded-xl bg-bg px-2 py-2 text-center">
      <div className={`font-display tabular-nums ${small ? 'text-xl' : 'text-3xl'}`}>{String(value).padStart(2, '0')}</div>
      <div className="text-[11px] text-muted">{label}</div>
    </div>
  );
}

export default function Countdown({ date, small = false }) {
  const { done, days, hours, minutes, seconds } = useCountdown(date);
  if (done) return <p className="text-sm font-semibold text-muted">This event has started.</p>;
  return (
    <div className="flex gap-2" role="timer" aria-label="Time until the event starts">
      <Unit value={days} label="days" small={small} />
      <Unit value={hours} label="hours" small={small} />
      <Unit value={minutes} label="mins" small={small} />
      <Unit value={seconds} label="secs" small={small} />
    </div>
  );
}
