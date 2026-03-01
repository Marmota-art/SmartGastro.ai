import { motion } from 'motion/react';
import { Search, FileText, Database, Settings, Rocket } from 'lucide-react';

const STEPS = [
  { title: 'Analyse & Strategie', icon: <Search size={32} />, desc: 'Wir analysieren Ihren Betrieb und identifizieren Potenziale für digitale Optimierung.' },
  { title: 'Konzeption', icon: <FileText size={32} />, desc: 'Erstellung eines individuellen Konzepts für Ihre digitalen Gastro-Lösungen.' },
  { title: 'Bearbeitung Ihrer Daten', icon: <Database size={32} />, desc: 'Import, Strukturierung und Qualitätsprüfung Ihrer Daten unter Berücksichtigung des Datenschutzes.' },
  { title: 'Implementierung', icon: <Settings size={32} />, desc: 'Einrichtung der Systeme und Schulung Ihres Teams vor Ort oder online.' },
  { title: 'Go-Live & Support', icon: <Rocket size={32} />, desc: 'Begleitung beim Start und fortlaufende Unterstützung für Ihren digitalen Erfolg.' },
];

export default function Process() {
  return (
    <div className="py-24 bg-hellgrau">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Projektablauf</h1>
          <p className="text-xl text-anthrazit/70 max-w-3xl mx-auto">
            In fünf klaren Schritten zu Ihrem digitalisierten Gastronomiebetrieb.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary/10 -translate-x-1/2 rounded-full"></div>
          
          <div className="space-y-16">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-center lg:text-right">
                  {idx % 2 === 0 && (
                    <div className="lg:pr-12">
                      <h3 className="text-2xl font-display font-bold mb-4 text-primary">{step.title}</h3>
                      <p className="text-anthrazit/70 leading-relaxed">{step.desc}</p>
                    </div>
                  )}
                </div>
                
                <div className="relative z-10 w-20 h-20 bg-white rounded-full shadow-xl border-4 border-primary flex items-center justify-center text-primary shrink-0">
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-anthrazit font-bold text-sm">
                    {idx + 1}
                  </div>
                  {step.icon}
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  {idx % 2 !== 0 && (
                    <div className="lg:pl-12">
                      <h3 className="text-2xl font-display font-bold mb-4 text-primary">{step.title}</h3>
                      <p className="text-anthrazit/70 leading-relaxed">{step.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
