import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Compass, Menu, Moon, Sun, Ticket, X } from 'lucide-react';
import { useRegistrations } from '../lib/storage';

const links = [
  { to: '/', label: 'Discover' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/tickets', label: 'My tickets' },
];

export default function Navbar({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const count = useRegistrations().length;

  useEffect(() => {
  setOpen(false);
}, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative py-1 text-sm font-semibold transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-accent after:transition-all ${
      isActive ? 'text-ink after:w-full' : 'text-muted after:w-0 hover:text-ink hover:after:w-full'
    }`;

  return (
    <header
  className={`sticky top-0 z-50 border-b border-line/40 bg-bg/90 backdrop-blur-lg transition-shadow duration-300 ${
    scrolled || open ? 'shadow-md shadow-midnight/10' : ''
  }`}
>
      <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Main">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Festora home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-ink">
            <Compass size={20} />
          </span>
          <span className="font-display text-xl font-medium">Festora</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
              {l.to === '/tickets' && count > 0 && (
                <span className="ml-1.5 rounded-full bg-accent/25 px-1.5 py-0.5 text-[11px] text-ink">{count}</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:bg-line/20"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/events" className="btn-primary hidden px-5 py-2.5 sm:inline-flex">
            <Ticket size={16} /> Get tickets
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className={`grid transition-all duration-300 md:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="container-x flex flex-col gap-1 pb-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold ${isActive ? 'bg-line/30 text-ink' : 'text-muted hover:bg-line/20'}`
                }
              >
                {l.label}
                {l.to === '/tickets' && count > 0 && ` (${count})`}
              </NavLink>
            ))}
            <Link to="/events" className="btn-primary mt-2">
              <Ticket size={16} /> Get tickets
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
