import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Solutions from './pages/Solutions';
import HowWeWork from './pages/HowWeWork';
import References from './pages/References';
import Thanks from './pages/Thanks';
import Impressum from './pages/Impressum';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import { ACADEMY_ENABLED } from './constants';

// Shop und Academy (mit Stripe und PayPal) nur laden, wenn sie gebraucht werden.
// Solange ACADEMY_ENABLED aus ist, wird dieser Code nie heruntergeladen.
const Academy = lazy(() => import('./pages/Academy'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const DemoKarte = lazy(() => import('./pages/DemoKarte'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Warten, bis die Zielseite gerendert ist
      const t = window.setTimeout(() => {
        document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  // Die Startseite bringt ihren eigenen Kopf (Entwurf V2) mit.
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  // Die Demo-Speisekarte (per QR-Code) zeigt sich wie die Karte eines Restaurants, ohne Website-Rahmen.
  const isDemo = pathname === '/demo-karte';
  return (
    <ShopProvider>
      <div className="flex flex-col min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn-accent">Zum Inhalt springen</a>
        <ScrollToTop />
        {!isHome && !isDemo && <Header />}
        <main id="main" className="flex-grow">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leistungen" element={<Solutions />} />
            <Route path="/preise" element={<Pricing />} />
            <Route path="/demo-karte" element={<DemoKarte />} />
            <Route path="/referenzen" element={<References />} />
            <Route path="/so-arbeiten-wir" element={<HowWeWork />} />
            <Route path="/schulung" element={ACADEMY_ENABLED ? <Academy /> : <Navigate to="/" replace />} />
            <Route path="/ueber" element={<About />} />
            <Route path="/warenkorb" element={ACADEMY_ENABLED ? <Cart /> : <Navigate to="/" replace />} />
            <Route path="/checkout" element={ACADEMY_ENABLED ? <Checkout /> : <Navigate to="/" replace />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Privacy />} />
            <Route path="/sicherheit" element={<Security />} />

            {/* Alte Adressen weiterleiten (Google, Lesezeichen) */}
            <Route path="/loesungen" element={<Navigate to="/leistungen" replace />} />
            <Route path="/implementierung" element={<Navigate to="/leistungen#engine" replace />} />
            <Route path="/projektablauf" element={<Navigate to="/so-arbeiten-wir" replace />} />
            <Route path="/konditionen" element={<Navigate to="/so-arbeiten-wir#konditionen" replace />} />
            <Route path="/naechste-schritte" element={<Navigate to="/so-arbeiten-wir" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </main>
        {!isDemo && <Footer />}
        {!isDemo && <CookieBanner />}
      </div>
    </ShopProvider>
  );
}
