import { Link } from 'react-router-dom';
import { CalendarCheck, ChevronDown, Search, Ticket } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useTitle } from '../hooks/useTitle';

const steps = [
  { icon: Search, title: 'Discover', text: 'Search by name or venue, or filter by the kind of event you want.' },
  { icon: Ticket, title: 'Register', text: 'Fill in a short form with your name, email and phone. It takes under a minute.' },
  { icon: CalendarCheck, title: 'Show up', text: 'Track your events in My tickets and add them to your calendar.' },
];

const faqs = [
  ['Is registration free?', 'Registration itself is free. Each event shows its own entry price, and many are free to attend.'],
  ['Where are my registrations stored?', 'In your browser’s local storage, on this device. Nothing is sent to a server.'],
  ['Can I cancel a registration?', 'Yes. Open My tickets and choose Cancel on the event you want to drop.'],
  ['Does it work on my phone?', 'Yes. The layout adapts from phones to large desktop screens, with light and dark themes.'],
];

export default function About() {
  useTitle('About');
  return (
    <div className="container-x py-12 sm:py-16">
      <Reveal className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl">A calmer way to find what is on</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Festora brings the events happening around you into one clean place, so you can spend less time searching and more time showing up.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 90}>
            <div className="h-full rounded-3xl border border-line/60 bg-surface p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-line/30">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 max-w-3xl">
        <h2 className="text-3xl">Common questions</h2>
        <div className="mt-6 divide-y divide-line/60 rounded-3xl border border-line/60 bg-surface hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-midnight/10">
          {faqs.map(([q, a]) => (
            <details key={q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {q}
                <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
        <Link to="/events" className="btn-primary mt-8">
          Browse events
        </Link>
      </Reveal>
    </div>
  );
}
