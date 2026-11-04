import { useEffect } from 'react';

const SITE = 'Festora';

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} – ${SITE}` : `${SITE} – Events worth showing up for`;
  }, [title]);
}