import { useSyncExternalStore } from 'react';

// Registrations live in localStorage so they survive a refresh.
const KEY = 'kexplore:registrations';
const listeners = new Set();
let raw = null;
let cache = [];

function read() {
  let next = '[]';
  try {
    next = localStorage.getItem(KEY) ?? '[]';
  } catch {
    /* storage blocked – fall back to empty list */
  }
  if (next !== raw) {
    raw = next;
    try {
      cache = JSON.parse(next);
    } catch {
      cache = [];
    }
  }
  return cache;
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useRegistrations = () => useSyncExternalStore(subscribe, read);

export function addRegistration(reg) {
  write([...read(), reg]);
}

export function removeRegistration(id) {
  write(read().filter((r) => r.id !== id));
}

// seats still free = total - already booked - registered on this device
export const seatsLeft = (event, regs) =>
  Math.max(0, event.seats - event.booked - regs.filter((r) => r.eventId === event.id).length);
