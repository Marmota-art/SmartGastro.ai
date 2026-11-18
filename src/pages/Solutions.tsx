import { Link } from 'react-router-dom';
import { ArrowRight, Check, TrendingUp, Calculator, ShoppingCart, Bell, ShieldCheck, Plug, SlidersHorizontal } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SmartGastroText from '../components/SmartGastroText';
import { PageHero, Reveal, CtaBand } from '../components/Sections';
import { CONTACT_HREF } from '../constants';

const BLOCKS = [
  {
    id: 'speisekarte',
    eyebrow: 'Lösung 1',
    title: 'Digitale Speisekarte',
    text: 'Mehr als ein PDF auf dem Handy: eine interaktive Karte im Look Ihres Betriebs, die Gäste gerne durchblättern – und die Sie selbst in Sekunden aktualisieren.',
    points: [
      'Zugriff per QR-Code am Tisch, ohne App',
      'Gestaltung in Ihren Farben, mit Logo und Bildern',
      'Mehrsprachig – ideal für Touristen und Geschäftsgäste',
      'Allergene und Herkunft übersichtlich ausgewiesen',
      'Preise und Tagesangebote in Echtzeit ändern – ohne Neudruck',
    ],
    img: '/assets/img/v2/loesung-speisekarte.webp',
    price: 'ab CHF 490',
    ref: 'Im Einsatz: Pizzeria Di Grano, St. Gallen',
  },
  {
    id: 'order-pay',
    eyebrow: 'Lösung 2',
    title: 'Order & Pay',
    text: 'Gäste bestellen und bezahlen direkt am Tisch. Die Bestellung geht ohne Umweg an Küche und Kasse – Ihr Service hat wieder Zeit für Beratung und Gastfreundschaft.',
    points: [
      'Direktbestellung am Tisch per Smartphone',
      'Integrierte Zahlungslösung direkt am Tisch',
      'Anbindung an Ihr Kassensystem',
      'Entlastet den Service in Stosszeiten',
      'Einführung und Schulung Ihres Teams inklusive',
    ],
    img: '/assets/img/v2/loesung-orderpay.webp',
    price: 'CHF 9’800',
    ref: 'Pilotprojekt Kassen- und Bestelllösung: Restaurant Café Park, St. Gallen',
  },
];

const AI_FEATURES = [
  { title: 'Nachfrage-Prognosen', icon: <TrendingUp size={22} />, desc: 'Gästezahl und Umsatz pro Tag – für Einkauf und Personalplanung.' },
  { title: 'Mise-en-place-Vorgaben', icon: <SlidersHorizontal size={22} />, desc: 'Genaue Mengen für die Küche, damit weniger im Abfall landet.' },
  { title: 'Rezept-Kalkulation', icon: <Calculator size={22} />, desc: 'Deckungsbeiträge und Wareneinsatz automatisch berechnet.' },
  { title: 'Upsell-Empfehlungen', icon: <ShoppingCart size={22} />, desc: 'Passende Vorschläge für Ihre Gäste – für einen höheren Durchschnittsbon.' },
  { title: 'Lager-Alerts', icon: <Bell size={22} />, desc: 'Hinweise bei drohenden Engpässen oder Überbeständen.' },
  { title: 'Kassen-Anbindung', icon: <Plug size={22} />, desc: 'Die Engine lernt direkt aus Ihren bestehenden Kassendaten.' },
];

export default function Solutions() {
  return (
    <>
      <PageMeta
        title="Lösungen: Digitale Speisekarte, Order & Pay, KI-Prognosen"
        description="Digitale QR-Speisekarten, Bestellen und Bezahlen am Tisch und KI-Prognosen aus Ihren Kassendaten – eingeführt von einem Koch für Schweizer Gastrobetriebe."
      />
      <PageHero
        eyebrow="Lösungen"
        title={<>Digitale Werkzeuge, die im <span className="text-forest">Gastro-Alltag</span> funktionieren.</>}
        lead="Von der QR-Speisekarte bis zur KI-Prognose: Ich führe nur ein, was Ihr Team im Stress auch wirklich nutzt."
      >
        <nav aria-label="Lösungen" className="mt-8 flex flex-wrap gap-2">
          <a href="#speisekarte" className="chip !text-sm !px-4 !py-2 hover:border-forest">Digitale Speisekarte</a>
          <a href="#order-pay" className="chip !text-sm !px-4 !py-2 hover:border-forest">Order &amp; Pay</a>
          <a href="#engine" className="chip !text-sm !px-4 !py-2 hover:border-forest">KI-Prognosen</a>
        </nav>
      </PageHero>

      {BLOCKS.map((b, i) => (
        <section key={b.id} id={b.id} className={`py-20 scroll-mt-20 ${i % 2 === 0 ? 'bg-white border-y border-linie' : ''}`}>
          <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal className={i % 2 ? 'lg:order-2' : ''}>
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] bg-anthrazit">
                <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="eyebrow mb-4"><span className="w-6 h-px bg-primary" />{b.eyebrow}</p>
              <h2 className="h-section">{b.title}</h2>
              <p className="lead mt-5">{b.text}</p>
              <ul className="mt-8 space-y-3">
                {b.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5"><Check size={14} strokeWidth={3} /></span>
                    <span className="text-anthrazit/80">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-anthrazit/55">{b.ref}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/preise" className="btn-primary">Preise ansehen <ArrowRight size={18} /></Link>
                <span className="font-display text-lg font-bold">{b.price} <span className="font-sans text-sm font-normal text-anthrazit/50">exkl. MwSt.</span></span>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ENGINE */}
      <section id="engine" className="py-24 scroll-mt-20 bg-forest-deep text-white relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-[40rem] h-[40rem] rounded-full bg-primary/30 blur-3xl" />
        <div className="container-x relative">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
            <Reveal>
              <p className="eyebrow !text-accent mb-4"><span className="w-6 h-px bg-accent" />Lösung 3</p>
              <h2 className="h-section">
                KI-Prognosen mit der <SmartGastroText withEngine dark />
              </h2>
              <p className="mt-6 text-lg text-white/75 leading-relaxed">
                Die Engine analysiert Ihre Kassendaten, Wettervorhersagen und lokale Events und berechnet präzise Prognosen für Ihren Tag: wie viele Gäste kommen, was die Küche vorbereiten soll und wo Sie Personal sparen können.
              </p>
              <p className="mt-4 text-white/75 leading-relaxed">
                Jede Funktion wurde mit echten Betriebsdaten entwickelt – unter anderem mit mehrjährigen Kassendaten des Restaurants Löwenburg in Lienz. Der Küchenchef behält das letzte Wort: Manuelle Korrekturen sind jederzeit möglich, die KI lernt daraus.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to={CONTACT_HREF} className="btn-accent">Live-Demo im Erstgespräch <ArrowRight size={18} /></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
                <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-accent" />Datenschutzkonforme Cloud</span>
                <span className="inline-flex items-center gap-2"><Plug size={16} className="text-accent" />Einfache Kassen-Anbindung</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-[1.5rem] p-2 bg-white/10 border border-white/15 shadow-2xl">
                <img src="/assets/img/v2/engine-dashboard.webp" alt="Dashboard der SmartGastro Engine mit Tagesprognose" loading="lazy" className="w-full rounded-[1.1rem]" />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl bg-white/[0.06] border border-white/10 p-6">
                  <span className="w-11 h-11 rounded-xl bg-accent text-anthrazit flex items-center justify-center">{f.icon}</span>
                  <h3 className="text-lg mt-4">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Welche Lösung passt zu Ihrem Betrieb?" text="Im Erstgespräch zeige ich Ihnen die Lösungen live und wir schauen, was sich für Sie wirklich lohnt." />
    </>
  );
}
