export const fmtDay = (d) => d.toLocaleDateString('en-IN', { day: 'numeric' });
export const fmtMonth = (d) => d.toLocaleDateString('en-IN', { month: 'short' });
export const fmtShort = (d) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
export const fmtFull = (d) =>
  d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
export const fmtTime = (d) => d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
export const fmtPrice = (p) => (p === 0 ? 'Free' : `₹${p.toLocaleString('en-IN')}`);
export const fmtDuration = (h) => (h >= 24 ? `${h / 24} day` : `${h} hr${h === 1 ? '' : 's'}`);
