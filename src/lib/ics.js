const pad = (n) => String(n).padStart(2, '0');
const stamp = (d) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
const esc = (s) => s.replace(/([,;])/g, '\\$1');

// Downloads an .ics file so the event can be added to any calendar app.
export function downloadIcs(ev) {
  const end = new Date(ev.date.getTime() + ev.durationHrs * 3600000);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//K Explore//EN',
    'BEGIN:VEVENT',
    `UID:${ev.id}@kexplore`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(ev.date)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${esc(ev.title)}`,
    `LOCATION:${esc(`${ev.venue}, ${ev.city}`)}`,
    `DESCRIPTION:${esc(ev.short)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  const url = URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${ev.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
