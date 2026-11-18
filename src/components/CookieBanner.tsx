import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

/** Kompakter Hinweis unten rechts, verdeckt keine Buttons. Die Seite setzt keine Tracking-Cookies. */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookie-consent')) setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (type: 'all' | 'none') => {
    try { localStorage.setItem('cookie-consent', type); } catch { /* ignore */ }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label="Cookie-Hinweis"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ delay: 1.2 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:max-w-sm z-[60] bg-white rounded-2xl border border-linie shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] p-5"
        >
          <p className="text-sm text-anthrazit/75 leading-relaxed">
            Diese Website verwendet nur technisch notwendige Speicherungen und keine Tracking-Cookies.{' '}
            <Link to="/datenschutz" className="underline underline-offset-2 hover:text-forest">Datenschutz</Link>
          </p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => handleConsent('all')} className="flex-1 rounded-full bg-forest text-white text-sm font-semibold py-2.5 hover:bg-primary transition-colors">
              Verstanden
            </button>
            <button onClick={() => handleConsent('none')} className="flex-1 rounded-full border border-linie text-sm font-semibold py-2.5 hover:bg-hellgrau transition-colors">
              Nur notwendige
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
