import { motion } from 'motion/react';
import { BRAND } from '../constants';
import SmartGastroText from '../components/SmartGastroText';

export default function About() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-primary">Über <SmartGastroText /></h1>
            <div className="space-y-6 text-lg text-anthrazit/80 leading-relaxed">
              <p className="font-semibold text-xl text-anthrazit">
                Thomas Ballinari – gelernter Koch, Küchenchef, langjähriger Pächter eines grossen Landgasthof und zertifizierter KI-Spezialist, implementiert Kassensysteme mit digitalen Speisekarten, Kalkulation & KI-Lösungen für Gastronomiebetriebe in der Schweiz.
              </p>
              <p>
                Meine Mission: Ich will, dass Gastronominnen und Gastronomen wieder Gastgeber sein können – präsent im Gastraum, kreativ in der Küche – und nicht gefangen in Hektik, Excel-Tabellen oder Personalnot.
              </p>
              <p>
                Mit <SmartGastroText className="text-lg" /> bringen wir die neuesten technologischen Entwicklungen direkt in Ihren Betrieb. Wir verstehen die Herausforderungen der Branche aus erster Hand und bieten Lösungen, die wirklich funktionieren.
              </p>
              <div className="pt-8">
                <a
                  href={`mailto:${BRAND.email}`}
                  className="btn-xl bg-primary text-white font-bold hover:bg-accent hover:text-anthrazit inline-block"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-[3rem] -rotate-3"></div>
              <img
                src="/assets/img/Thomas_Ballinari.jpg"
                alt="Thomas Ballinari"
                className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/5]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/chef/800/1000';
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
