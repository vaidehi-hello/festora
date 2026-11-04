import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Compass, Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';
import { categories } from '../data/events';
import { useToast } from './Toast';

const socials = [
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'GitHub', icon: Github, href: 'https://github.com' },
];

export default function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setEmail('');
    toast('You are subscribed. Watch your inbox.');
  };

  const col = 'mb-4 font-display text-lg text-cream';
  const link = 'text-sm text-cream/70 transition hover:text-cream';

  return (
    <footer className="footer-bg border-t border-[#B49A5F]/50 text-cream">
      <div className="container-x grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sand text-midnight">
              <Compass size={20} />
            </span>
            <span className="font-display text-xl">Festora</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Discover events worth showing up for, and register in a minute.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream/80 transition hover:bg-cream hover:text-midnight"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className={col}>Quick links</h3>
          <ul className="space-y-3">
            {[
              ['/', 'Discover'],
              ['/events', 'All events'],
              ['/about', 'About'],
              ['/tickets', 'My tickets'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={col}>Categories</h3>
          <ul className="space-y-3">
            {categories.slice(0, 6).map((c) => (
              <li key={c.name}>
                <Link to={`/events?category=${encodeURIComponent(c.name)}`} className={link}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={col}>Stay updated</h3>
          <p className="text-sm text-cream/70">Get new events in your inbox every week.</p>
          <form onSubmit={subscribe} noValidate className="mt-4">
            <div className="flex rounded-full border border-cream/25 bg-cream/5 p-1 focus-within:border-sand">
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <Mail size={18} className="ml-3 mt-3 shrink-0 text-cream/60" />
              <input
                id="newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-invalid={!!error}
              className="w-0 min-w-0 flex-1 bg-transparent px-3 text-sm placeholder:text-cream/50 focus:outline-none"
              />
              <button className="rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-midnight transition hover:opacity-90 active:scale-95">
                Subscribe
              </button>
            </div>
            {error && <p className="mt-2 pl-4 text-xs text-cream-300">{error}</p>}
          </form>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-cream/60">
          <p>© {new Date().getFullYear()} FESTORA. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 transition hover:bg-cream hover:text-midnight"
          >
            Back to top <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
