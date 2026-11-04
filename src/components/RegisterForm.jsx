import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CalendarDays, Loader2, Mail, Phone, User } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import { events } from '../data/events';
import { fmtShort } from '../lib/format';
import { addRegistration, seatsLeft, useRegistrations } from '../lib/storage';

const empty = { name: '', email: '', phone: '' };

function validate(values, event, regs) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = 'Please enter your full name.';
  else if (!/^[A-Za-z][A-Za-z .'-]{1,59}$/.test(name)) errors.name = 'Use letters only, at least 2 characters.';

  const email = values.email.trim().toLowerCase();
  if (!email) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Enter a valid email, like name@example.com.';
  else if (regs.some((r) => r.eventId === event.id && r.email === email))
    errors.email = 'This email is already registered for this event.';

  // accepts 9876543210, +91 98765 43210, 098765-43210
  const digits = values.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Enter a valid 10-digit mobile number.';

  return errors;
}

function Field({ id, label, icon: Icon, error, touched, ...props }) {
  const showError = touched && error;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <Icon size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          id={id}
          name={id}
          aria-invalid={!!showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={`input ${showError ? '!border-red-500 focus:!ring-red-500/30' : ''}`}
          {...props}
        />
      </div>
      {showError && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export default function RegisterForm({ event }) {
  const navigate = useNavigate();
  const regs = useRegistrations();
  const [values, setValues] = useState(empty);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const left = seatsLeft(event, regs);
  const errors = useMemo(() => validate(values, event, regs), [values, event, regs]);

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    const first = Object.keys(errors)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const reg = {
        id: `KX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        eventId: event.id,
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        createdAt: new Date().toISOString(),
      };
      addRegistration(reg);
      setSubmitting(false);
      setDone(reg);
      setValues(empty);
      setTouched({});
    }, 700);
  };

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field id="name" label="Full name" icon={User} value={values.name} onChange={onChange} onBlur={onBlur} error={errors.name} touched={touched.name} placeholder="Your full name" autoComplete="name" />
        <Field id="email" label="Email address" icon={Mail} type="email" value={values.email} onChange={onChange} onBlur={onBlur} error={errors.email} touched={touched.email} placeholder="you@example.com" autoComplete="email" />
        <Field id="phone" label="Phone number" icon={Phone} type="tel" inputMode="tel" value={values.phone} onChange={onChange} onBlur={onBlur} error={errors.phone} touched={touched.phone} placeholder="98765 43210" autoComplete="tel" />

        <div>
          <label htmlFor="event" className="mb-1.5 block text-sm font-semibold">
            Selected event
          </label>
          <div className="relative">
            <CalendarDays size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <select id="event" value={event.id} onChange={(e) => navigate(`/events/${e.target.value}`)} className="input appearance-none truncate pr-4">
              {events.map((ev) => (
                <option key={ev.id} value={ev.id} disabled={seatsLeft(ev, regs) === 0 && ev.id !== event.id}>
                  {ev.title} ({fmtShort(ev.date)})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" disabled={submitting || left === 0} className="btn-primary w-full py-3.5">
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Registering…
            </>
          ) : left === 0 ? (
            'Sold out'
          ) : (
            'Register now'
          )}
        </button>
        <p className="text-center text-xs text-muted">
          {left === 0 ? 'Pick another event from the list above.' : `${left} seats left. Your details stay on this device.`}
        </p>
      </form>

      {done && <ConfirmModal reg={done} event={event} onClose={() => setDone(null)} />}
    </>
  );
}
