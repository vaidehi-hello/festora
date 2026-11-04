import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const timer = useRef(null);

  const toast = useCallback((text) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(''), 3000);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
        {message && (
          <div className="flex animate-pop items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-ink shadow-xl">
            <CheckCircle2 size={18} /> {message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
