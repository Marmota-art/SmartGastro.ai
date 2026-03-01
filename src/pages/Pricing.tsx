import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const PACKAGES = [
  {
    name: 'Starter "QR-Karte Basic"',
    price: 'ab CHF 490',
    vat: '+8.1% MwSt.',
    features: [
      'Hygiene & Unkompliziertheit',
      'Einfache Einrichtung',
      'Digitale Speisekarte via QR-Code',
      'Ideal für kleine Cafés & Bistros',
    ],
    cta: 'Jetzt anfragen',
    img: 'Bild_QR_Basic.jpg',
  },
  {
    name: 'Starter "QR-Menu Hero"',
    price: 'ab CHF 2’900',
    vat: '+8.1% MwSt.',
    features: [
      'Erweiterte Funktionen',
      'Mehrere Kategorien & Bilder',
      'Anpassbares Design',
      'Analytics & Berichte',
    ],
    cta: 'Jetzt anfragen',
    img: 'Bild_QR_Hero.jpg',
  },
  {
    name: 'Pro "Order & Pay"',
    price: 'CHF 9’800',
    vat: '+8.1% MwSt.',
    features: [
      'Direktbestellung am Tisch',
      'Integrierte Zahlungslösungen',
      'Kassensystem-Anbindung',
      'Personalentlastung pur',
    ],
    cta: 'Jetzt anfragen',
    img: 'Bild_Order_Pay.jpg',
  },
  {
    name: 'Enterprise "Multi Standort"',
    price: 'ab CHF 18’000',
    vat: '+8.1% MwSt.',
    features: [
      'Zentrales Management',
      'PMS/POS Integration',
      'Individuelle Anpassungen',
      'KI-gestützte Optimierung',
    ],
    cta: 'Jetzt anfragen',
    img: 'Bild_flambieren.jpeg',
  },
];

export default function Pricing() {
  return (
    <div className="py-24 bg-hellgrau">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Preise & Pakete</h1>
          <p className="text-xl text-anthrazit/70">Wählen Sie das passende Paket für Ihren Erfolg.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden card-shadow flex flex-col h-full"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={`/assets/img/${pkg.img}`}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${pkg.name}/400/300`;
                  }}
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-bold mb-4 min-h-[3rem]">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-xs text-anthrazit/50 block mt-1">{pkg.vat}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3 text-sm text-anthrazit/70">
                      <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/#kontakt"
                  className="w-full btn-xl bg-hellgrau text-anthrazit text-sm font-bold hover:bg-primary hover:text-white text-center"
                >
                  {pkg.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link
            to="/leistungen"
            className="inline-flex items-center space-x-2 btn-xl bg-primary text-white font-bold hover:bg-accent hover:text-anthrazit"
          >
            <span>Leistungen ansehen</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
