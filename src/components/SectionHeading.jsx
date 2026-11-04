import Reveal from './Reveal';

// Eyebrow label, serif title, gold ornament and a short intro. Always centered.
export default function SectionHeading({ id, eyebrow, title, text }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-4xl leading-tight sm:text-5xl">
        {title}
      </h2>
      <div aria-hidden className="mx-auto mt-5 flex items-center justify-center gap-3">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold" />
        <span className="h-2 w-2 rotate-45 bg-gold" />
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold" />
      </div>
      {text && <p className="mx-auto mt-5 max-w-xl text-muted">{text}</p>}
    </Reveal>
  );
}