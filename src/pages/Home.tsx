import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, LayoutDashboard, Users, CreditCard, ClipboardList, Calendar } from 'lucide-react';
import SmartGastroText from '../components/SmartGastroText';

const CARDS = [
  { title: 'Preise & Pakete', subtitle: 'Transparent und fair kalkuliert.', img: 'Bild_Preise_Pakete.jpg', link: '/preise', icon: <CreditCard size={32} /> },
  { title: 'Leistungen', subtitle: 'Von QR-Speisekarten bis Order & Pay.', img: 'Bild_Leistungen.jpg', link: '/leistungen', icon: <Sparkles size={32} /> },
  { title: 'Projektablauf', subtitle: 'Schritt für Schritt zum Go‑Live.', img: 'Bild_Projektablauf.jpg', link: '/projektablauf', icon: <ClipboardList size={32} /> },
  { title: 'Konditionen', subtitle: 'Zahlung, Spesen & Formalitäten.', img: 'Bild_Konditionen.jpg', link: '/konditionen', icon: <Users size={32} /> },
  { title: 'Nächste Schritte', subtitle: 'So starten wir gemeinsam.', img: 'Bild_QR_Hero.jpg', link: '/naechste-schritte', icon: <Calendar size={32} /> },
  { title: 'Implementierung', subtitle: 'Moderne Gastro-Lösungen.', img: 'Bild_Implementierung.jpg', link: '/implementierung', icon: <LayoutDashboard size={32} /> },
];

export default function Home() {
  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-overlay overflow-hidden">
        <img
          src="/assets/img/Bild_Rest_Tech.jpg"
          alt="Smart Gastro Technology"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/restaurant-tech/1920/1080?blur=2';
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          >
            KI in der Gastronomie – Digitale Lösungen für smarte Gastgeber:innen
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium mb-10 opacity-90"
          >
            Wir bereiten etwas Großartiges für Sie vor
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={scrollToContact}
              className="btn-xl bg-primary text-white text-lg font-bold hover:bg-accent hover:text-anthrazit w-full sm:w-auto"
            >
              Erstgespräch buchen
            </motion.button>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/ueber"
                className="btn-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold hover:bg-white hover:text-anthrazit w-full sm:w-auto inline-block text-center"
              >
                Über <SmartGastroText dark />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-8 italic">
            "Ich will, dass Gastronominnen und Gastronomen wieder Gastgeber sein können – präsent im Gastraum, kreativ in der Küche – und nicht gefangen in Hektik, Excel-Tabellen oder Personalnot."
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={card.link}
                  className="group relative block h-96 rounded-3xl overflow-hidden card-shadow bg-anthrazit"
                >
                  <img
                    src={`/assets/img/${card.img}`}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${card.title}/600/800`;
                    }}
                  />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className="mb-4 text-accent">{card.icon}</div>
                    <h3 className="text-xl font-display font-bold leading-tight group-hover:text-accent transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {card.subtitle}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Was Sie erwarten */}
      <section className="py-24 bg-hellgrau">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Was Sie erwarten</h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl card-shadow flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <LayoutDashboard size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Implementierung moderner Gastro-Lösungen</h3>
              <p className="text-anthrazit/70 leading-relaxed mb-8 flex-grow">
                Wir begleiten Sie bei der Einführung digitaler Tools, von der QR-Speisekarte bis zum KI-gestützten Management.
              </p>
              <Link
                to="/implementierung"
                className="inline-flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors group"
              >
                <span>Mehr erfahren</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white p-10 rounded-3xl card-shadow flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Umfassende Online-Kurse</h3>
              <p className="text-anthrazit/70 leading-relaxed mb-8 flex-grow">
                Lernen Sie in Ihrem eigenen Tempo, wie Sie KI und digitale Tools effizient in Ihren Betrieb integrieren.
              </p>
              <Link
                to="/schulung"
                className="inline-flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors group"
              >
                <span>Zu den Kursen</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="bg-white p-10 rounded-3xl card-shadow flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Persönliche Beratung</h3>
              <p className="text-anthrazit/70 leading-relaxed mb-8 flex-grow">
                Profitieren Sie von unserer langjährigen Erfahrung in der Gastronomie und Technologie.
              </p>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center space-x-2 text-primary font-bold hover:text-accent transition-colors group text-left"
              >
                <span>Jetzt anfragen</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Kontaktformular */}
      <section id="kontakt" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Erstgespräch buchen</h2>
            <p className="text-anthrazit/70">Wir freuen uns auf Ihre Nachricht und melden uns zeitnah bei Ihnen.</p>
          </div>
          
          <form
            name="kontakt"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/thanks"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="kontakt" />
            <p className="hidden">
              <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-anthrazit/60">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-6 py-4 bg-hellgrau rounded-2xl border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all outline-none"
                  placeholder="Ihr Name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-anthrazit/60">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-6 py-4 bg-hellgrau rounded-2xl border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all outline-none"
                  placeholder="ihre@email.ch"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="firma" className="text-sm font-bold uppercase tracking-wider text-anthrazit/60">Firma / Restaurant (optional)</label>
              <input
                type="text"
                id="firma"
                name="firma"
                className="w-full px-6 py-4 bg-hellgrau rounded-2xl border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all outline-none"
                placeholder="Name Ihres Betriebs"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="nachricht" className="text-sm font-bold uppercase tracking-wider text-anthrazit/60">Nachricht</label>
              <textarea
                id="nachricht"
                name="nachricht"
                required
                rows={5}
                className="w-full px-6 py-4 bg-hellgrau rounded-2xl border-transparent focus:border-primary focus:bg-white focus:ring-0 transition-all outline-none resize-none"
                placeholder="Wie können wir Ihnen helfen?"
              ></textarea>
            </div>
            
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                required
                className="mt-1 rounded text-primary focus:ring-primary"
              />
              <label htmlFor="privacy" className="text-sm text-anthrazit/70 leading-relaxed">
                Ich stimme zu, dass meine Angaben zur Beantwortung meiner Anfrage gespeichert werden. Keine Weitergabe an Dritte.
              </label>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full btn-xl bg-primary text-white text-lg font-bold hover:bg-accent hover:text-anthrazit"
              >
                Nachricht senden
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
