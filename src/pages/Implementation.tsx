import { motion } from 'motion/react';
import { Brain, BarChart3, Clock, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';
import SmartGastroText from '../components/SmartGastroText';

export default function Implementation() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary">
            Implementierung moderner Gastro-Lösungen
          </h1>
          <p className="text-xl text-anthrazit/70 max-w-3xl leading-relaxed">
            Wir begleiten Sie bei der Einführung digitaler Tools, von der QR-Speisekarte bis zum KI-gestützten Management. Unser Fokus liegt auf der praktischen Anwendung im stressigen Gastro-Alltag.
          </p>
        </div>

        {/* AI Solution Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-primary rounded-full text-sm font-bold">
                <Brain size={18} />
                <span>KI-Lösung: <SmartGastroText withEngine /></span>
              </div>
              <h2 className="text-3xl font-display font-bold">Mise en place & Nachfrageprognose</h2>
              <p className="text-lg text-anthrazit/70 leading-relaxed">
                Unsere KI-Lösung revolutioniert Ihre Vorbereitung. Durch die Analyse historischer Daten, Wettervorhersagen und lokaler Events berechnet die <SmartGastroText withEngine className="text-lg" /> präzise Prognosen für Ihren Tag.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-hellgrau rounded-2xl">
                  <BarChart3 className="text-primary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Präzise Prognosen</h4>
                  <p className="text-sm text-anthrazit/60">Gästeanzahl und Umsatz-Forecast auf Basis von ML-Modellen.</p>
                </div>
                <div className="p-6 bg-hellgrau rounded-2xl">
                  <Clock className="text-primary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Mise-en-Place Optimierung</h4>
                  <p className="text-sm text-anthrazit/60">Genaue Mengenvorgaben für die Küche zur Vermeidung von Food Waste.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] rotate-2"></div>
              <img
                src="/assets/img/dashboard_demo.png"
                alt="SmartGastro Engine Dashboard"
                className="relative rounded-[2rem] shadow-2xl border border-black/5 w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/dashboard/1200/800';
                }}
              />
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-black/5 flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold uppercase tracking-wider">Live Engine V3.3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Prototype & Development */}
        <section className="py-16 border-t border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/assets/img/wireframe_demo.png"
                alt="Development Process"
                className="rounded-[2rem] shadow-xl w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/wireframe/1200/800';
                }}
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-2xl font-display font-bold">Vom Prototyp zur High-End Lösung</h3>
              <p className="text-anthrazit/70 leading-relaxed">
                Wir entwickeln unsere Tools nah am Gastronomen. Jede Funktion der <SmartGastroText withEngine className="text-sm" /> wurde im echten Betrieb getestet und optimiert. Manuelle Overrides erlauben es dem Küchenchef, jederzeit korrigierend einzugreifen – die KI lernt daraus.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <ShieldCheck className="text-primary" size={20} />
                  <span className="text-sm font-medium">Datenschutzkonforme Cloud-Lösung</span>
                </li>
                <li className="flex items-center space-x-3">
                  <ShieldCheck className="text-primary" size={20} />
                  <span className="text-sm font-medium">Einfache POS-Integration</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
