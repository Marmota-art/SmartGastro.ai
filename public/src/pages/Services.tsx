import { motion } from 'motion/react';
import { Sparkles, Brain, TrendingUp, Calculator, ShoppingCart, Bell, ArrowRight } from 'lucide-react';

const AI_FEATURES = [
  { title: 'Nachfrage-Prognosen', icon: <TrendingUp size={28} />, desc: 'Optimieren Sie Ihren Wareneinkauf und Personalplanung durch präzise Vorhersagen.' },
  { title: 'Rezept-Kalkulation', icon: <Calculator size={28} />, desc: 'Automatisierte Berechnung von Deckungsbeiträgen und Wareneinsatz.' },
  { title: 'Upsell-Empfehlungen', icon: <ShoppingCart size={28} />, desc: 'KI-gestützte Vorschläge für Ihre Gäste zur Steigerung des Durchschnittsbons.' },
  { title: 'Lager-Alerts', icon: <Bell size={28} />, desc: 'Intelligente Benachrichtigungen bei drohenden Engpässen oder Überbeständen.' },
];

export default function Services() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Unsere Leistungen</h1>
          <p className="text-xl text-anthrazit/70 max-w-3xl mx-auto">
            Wir bieten ganzheitliche digitale Lösungen, die Ihren Gastronomiebetrieb effizienter und profitabler machen.
          </p>
        </div>

        {/* AI Section */}
        <section className="mb-32">
          <div className="bg-anthrazit rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-anthrazit">
                  <Brain size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold">Erweiterungen mit KI-Technologien</h2>
              </div>
              <p className="text-xl text-white/70 mb-16 max-w-2xl leading-relaxed">
                Wir integrieren modernste KI-Modelle wie <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Gemini</a> und <a href="https://www.genspark.ai/invite_member?invite_code=NzRiNDY0NWFMY2Q4M0wwNDgwTDgxZTRMNzliZDRlOTU0Zjk3" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Genspark</a> für präzise Nachfrageprognosen und Prozessoptimierung.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {AI_FEATURES.map((feature, idx) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-accent mb-6">{feature.icon}</div>
                    <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-8 text-primary">Digitale Speisekarten & QR-Bestellung</h2>
            <div className="space-y-6 text-lg text-anthrazit/70 leading-relaxed">
              <p>
                Unsere QR-Lösungen sind mehr als nur ein PDF auf dem Handy. Wir bieten interaktive Menüs, die Ihre Gäste begeistern und Ihr Personal entlasten.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-anthrazit">
                    <ArrowRight size={14} />
                  </div>
                  <span>Einfache Aktualisierung in Echtzeit</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-anthrazit">
                    <ArrowRight size={14} />
                  </div>
                  <span>Direktbestellung & Integrierte Zahlung</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-anthrazit">
                    <ArrowRight size={14} />
                  </div>
                  <span>Mehrsprachigkeit auf Knopfdruck</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/assets/img/Bild_QR_Basic.jpeg"
              alt="Digitale Speisekarte Basic"
              className="rounded-3xl shadow-xl w-full h-full object-cover aspect-square"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/menu/600/600';
              }}
            />
            <img
              src="/assets/img/Bild_QR_Hero.jpeg"
              alt="Digitale Speisekarte Hero"
              className="rounded-3xl shadow-xl w-full h-full object-cover aspect-square mt-8"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/service/600/600';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
