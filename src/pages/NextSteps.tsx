import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, CalendarCheck } from 'lucide-react';

export default function NextSteps() {
  return (
    <div className="py-24 bg-hellgrau">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Nächste Schritte</h1>
          <p className="text-xl text-anthrazit/70 max-w-3xl mx-auto">
            So starten wir gemeinsam in Ihre digitale Zukunft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-12 rounded-3xl card-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">1. Kontakt aufnehmen</h3>
            <p className="text-anthrazit/70 mb-8">Senden Sie uns eine Nachricht über das Kontaktformular.</p>
            <Link to="/#kontakt" className="text-primary font-bold hover:text-accent transition-colors">Zum Formular</Link>
          </div>
          
          <div className="bg-white p-12 rounded-3xl card-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
              <CalendarCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">2. Erstgespräch</h3>
            <p className="text-anthrazit/70 mb-8">Wir vereinbaren einen Termin für ein unverbindliches Kennenlernen.</p>
            <span className="text-anthrazit/30 font-bold">Kostenlos</span>
          </div>
          
          <div className="bg-white p-12 rounded-3xl card-shadow text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
              <ArrowRight size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">3. Angebot</h3>
            <p className="text-anthrazit/70 mb-8">Sie erhalten ein maßgeschneidertes Angebot für Ihren Betrieb.</p>
            <span className="text-anthrazit/30 font-bold">Individuell</span>
          </div>
        </div>

        <div className="relative rounded-[3rem] overflow-hidden h-[400px] flex items-center justify-center bg-overlay">
          <img
            src="/assets/img/Bild_Koch_Tech.jpg"
            alt="Success"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/success/1200/600';
            }}
          />
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-4xl font-display font-bold mb-8">Bereit für den nächsten Schritt?</h2>
            <Link
              to="/#kontakt"
              className="btn-xl bg-accent text-anthrazit font-bold hover:bg-white transition-colors inline-flex items-center space-x-2"
            >
              <span>Jetzt Erstgespräch buchen</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
