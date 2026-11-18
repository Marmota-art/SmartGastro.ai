import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import Academy from './pages/Academy';
import Cart from './pages/Cart';
import Thanks from './pages/Thanks';
import Impressum from './pages/Impressum';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import Checkout from './pages/Checkout';

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
  return (
    <ShopProvider>
      <div className="flex flex-col min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn-accent">Zum Inhalt springen</a>
        <ScrollToTop />
        <Header />
        <main id="main" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loesungen" element={<Solutions />} />
            <Route path="/preise" element={<Pricing />} />
            <Route path="/referenzen" element={<References />} />
            <Route path="/so-arbeiten-wir" element={<HowWeWork />} />
            <Route path="/schulung" element={<Academy />} />
            <Route path="/ueber" element={<About />} />
            <Route path="/warenkorb" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Privacy />} />
            <Route path="/sicherheit" element={<Security />} />

            {/* Alte Adressen weiterleiten (Google, Lesezeichen) */}
            <Route path="/leistungen" element={<Navigate to="/loesungen" replace />} />
            <Route path="/implementierung" element={<Navigate to="/loesungen#engine" replace />} />
            <Route path="/projektablauf" element={<Navigate to="/so-arbeiten-wir" replace />} />
            <Route path="/konditionen" element={<Navigate to="/so-arbeiten-wir#konditionen" replace />} />
            <Route path="/naechste-schritte" element={<Navigate to="/so-arbeiten-wir" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </ShopProvider>
  );
}
