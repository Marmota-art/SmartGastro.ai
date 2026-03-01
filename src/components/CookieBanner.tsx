import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (type: 'all' | 'none' | 'config') => {
    localStorage.setItem('cookie-consent', type);
    setIsVisible(false);
    if (type === 'all') {
      // Initialize analytics if needed
      console.log('Analytics enabled');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-black/5 p-6 md:p-8">
            <h3 className="text-lg font-display font-bold mb-4">Cookie-Einstellungen</h3>
            <p className="text-sm text-anthrazit/70 mb-6 leading-relaxed">
              Wir nutzen Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Einige sind essenziell, andere helfen uns, diese Website und Ihre Erfahrung zu verbessern.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleConsent('all')}
                className="btn-xl bg-primary text-white text-sm font-semibold hover:bg-accent hover:text-anthrazit"
              >
                Alle annehmen
              </button>
              <button
                onClick={() => handleConsent('none')}
                className="btn-xl bg-hellgrau text-anthrazit text-sm font-semibold hover:bg-black/5"
              >
                Nur essenzielle
              </button>
              <button
                onClick={() => handleConsent('config')}
                className="btn-xl border border-black/10 text-anthrazit text-sm font-semibold hover:bg-black/5"
              >
                Konfigurieren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
