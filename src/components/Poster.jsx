import { useState } from 'react';
import { categoryMap } from '../data/events';

// Event image with a graceful fallback if the photo fails to load.
export default function Poster({ event, className = '', imgClass = '', eager = false }) {
  const [failed, setFailed] = useState(false);
  const Icon = categoryMap[event.category].icon;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-navy to-steel ${className}`}>
      {failed ? (
        <div className="grid h-full w-full place-items-center text-cream/70">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={event.image}
          alt={event.title}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClass}`}
        />
      )}
    </div>
  );
}
