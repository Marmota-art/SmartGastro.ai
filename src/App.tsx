import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import Process from './pages/Process';
import Conditions from './pages/Conditions';
import NextSteps from './pages/NextSteps';
import Implementation from './pages/Implementation';
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
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <ShopProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ueber" element={<About />} />
            <Route path="/preise" element={<Pricing />} />
            <Route path="/leistungen" element={<Services />} />
            <Route path="/projektablauf" element={<Process />} />
            <Route path="/konditionen" element={<Conditions />} />
            <Route path="/naechste-schritte" element={<NextSteps />} />
            <Route path="/implementierung" element={<Implementation />} />
            <Route path="/schulung" element={<Academy />} />
            <Route path="/warenkorb" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thanks" element={<Thanks />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Privacy />} />
            <Route path="/sicherheit" element={<Security />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </ShopProvider>
  );
}
