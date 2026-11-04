import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { categories, events } from '../data/events';

export default function Categories() {
  return (
    <section className="border-y border-line/30 bg-line/15 py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 id="cat-title" className="text-3xl sm:text-4xl">
            Explore by category
          </h2>
          <p className="mt-2 text-muted">Pick what you are into and see everything that is coming up.</p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => {
            const count = events.filter((e) => e.category === c.name).length;
            const Icon = c.icon;
            return (
              <Reveal key={c.name} delay={(i % 4) * 80}>
                <Link
                  to={`/events?category=${encodeURIComponent(c.name)}`}
                  className="group flex h-full flex-col rounded-3xl border border-line/70 bg-bg p-6 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-midnight/10"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-line/30 text-ink transition duration-300 group-hover:bg-brand group-hover:text-brand-ink">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-5 text-xl font-medium">{c.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.blurb}</p>
                  <span className="mt-5 flex items-center justify-between pt-1 text-sm font-semibold">
                    {count} {count === 1 ? 'event' : 'events'}
                    <ArrowUpRight size={18} className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
