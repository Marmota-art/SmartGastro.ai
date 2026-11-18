import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChefHat, QrCode, Smartphone, LineChart, GraduationCap, Sparkles, Check } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SmartGastroText from '../components/SmartGastroText';
import { Reveal, SectionHead, ReferenceGrid, CtaBand, ContactSection } from '../components/Sections';
import { REFERENCES, CONTACT_HREF } from '../constants';

const OFFERS = [
  {
    icon: <QrCode size={22} />,
    title: 'Digitale Speisekarte',
    text: 'Ihre Karte per QR-Code am Tisch – im eigenen Look, mehrsprachig, mit Bildern und Allergenen. Preise ändern Sie in Sekunden statt neu zu drucken.',
    img: '/assets/img/v2/loesung-speisekarte.webp',
    href: '/loesungen#speisekarte',
    price: 'ab CHF 490',
  },
  {
    icon: <Smartphone size={22} />,
    title: 'Order & Pay',
    text: 'Gäste bestellen und bezahlen direkt am Tisch, die Bestellung landet in Ihrer Kasse. Ihr Service gewinnt Zeit für das, was zählt: Gastfreundschaft.',
    img: '/assets/img/v2/loesung-orderpay.webp',
    href: '/loesungen#order-pay',
    price: 'CHF 9’800',
  },
  {
    icon: <LineChart size={22} />,
    title: 'KI-Prognosen',
    text: 'Die SmartGastro Engine lernt aus Ihren Kassendaten, Wetter und Events – und sagt Ihnen, wie viele Gäste kommen und was die Küche vorbereiten soll.',
    img: '/assets/img/v2/engine-dashboard.webp',
    href: '/loesungen#engine',
    price: 'auf Anfrage',
  },
];

const STEPS = [
  { n: '01', title: 'Erstgespräch', text: 'Kostenlos und unverbindlich. Wir klären, wo es im Betrieb hakt.' },
  { n: '02', title: 'Analyse & Konzept', text: 'Ich schaue mir Abläufe, Karte und Kasse an und mache einen klaren Vorschlag.' },
  { n: '03', title: 'Einrichtung & Schulung', text: 'Ich richte alles ein, übernehme Ihre Daten und schule Ihr Team.' },
  { n: '04', title: 'Go-Live & Begleitung', text: 'Start ohne Betriebsunterbruch – und ich bleibe Ihr Ansprechpartner.' },
];

export default function Home() {
  return (
    <>
      <PageMeta
        title="SmartGastro.ai – Digitale Speisekarten, Order & Pay und KI für die Gastronomie"
        description="Thomas Ballinari, gelernter Koch und zertifizierter KI-Spezialist, führt digitale Speisekarten, Order & Pay und KI-Prognosen in Schweizer Gastrobetrieben ein – ohne Betriebsunterbruch."
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-40 w-[42rem] h-[42rem] rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute top-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="container-x pt-8 pb-20 md:pt-14 md:pb-28 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="chip mb-7">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Digitalisierung für Schweizer Gastrobetriebe
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem] font-extrabold"
            >
              Mehr Zeit für Ihre Gäste.{' '}
              <span className="relative whitespace-nowrap text-forest">
                Weniger Hektik
                <svg aria-hidden="true" viewBox="0 0 300 12" className="absolute left-0 -bottom-1 w-full h-3 text-accent" preserveAspectRatio="none"><path d="M2 9c60-6 150-8 296-3" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" /></svg>
              </span>{' '}
              im Betrieb.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lead mt-7 max-w-xl">
              Digitale Speisekarten, Order &amp; Pay und KI-Prognosen – eingeführt von einem gelernten Koch, der selbst jahrelang einen grossen Landgasthof geführt hat. Ohne Betriebsunterbruch.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link to={CONTACT_HREF} className="btn-primary text-base">Kostenloses Erstgespräch <ArrowRight size={18} /></Link>
              <Link to="/loesungen" className="btn-ghost text-base">Lösungen ansehen</Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-anthrazit/45 mb-4">Betriebe, die mit SmartGastro arbeiten</p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {REFERENCES.map((r) => (
                  <li key={r.id}>
                    <Link to="/referenzen" className="font-display font-semibold text-anthrazit/70 hover:text-forest transition-colors">
                      {r.name} <span className="font-sans font-normal text-sm text-anthrazit/45">· {r.place}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-forest" />
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-[#8d9298]">
              <img src="/assets/img/v2/thomas.webp" alt="Thomas Ballinari, Gründer von SmartGastro.ai" fetchPriority="high" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute left-6 bottom-6 text-white">
                <p className="font-display text-xl font-bold">Thomas Ballinari</p>
                <p className="text-sm text-white/80">Gründer SmartGastro.ai</p>
              </div>
            </div>
            <div className="absolute -left-3 sm:-left-8 top-10 chip !py-2.5 !px-4 !text-sm">
              <ChefHat size={18} className="text-forest" /> Gelernter Koch &amp; Küchenchef
            </div>
            <div className="absolute -right-2 sm:-right-6 top-1/2 chip !py-2.5 !px-4 !text-sm">
              <Sparkles size={18} className="text-forest" /> Zertifizierter KI-Spezialist
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM → VERSPRECHEN */}
      <section className="py-20 border-y border-linie bg-white">
        <div className="container-x grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <Reveal>
            <p className="eyebrow mb-4"><span className="w-6 h-px bg-primary" />Warum SmartGastro</p>
            <h2 className="h-section">Gastgeber sein – nicht Excel-Verwalter.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="font-display text-2xl md:text-3xl leading-snug text-anthrazit/85">
              «Ich will, dass Gastronominnen und Gastronomen wieder Gastgeber sein können – präsent im Gastraum, kreativ in der Küche – und nicht gefangen in Hektik, Excel-Tabellen oder Personalnot.»
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-anthrazit/55">Thomas Ballinari, Gründer</p>
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                ['Aus der Praxis', 'Koch, Küchenchef und langjähriger Pächter – ich kenne den Druck am Pass.'],
                ['Alles aus einer Hand', 'Speisekarte, Kasse, Daten und Schulung – abgestimmt auf Ihren Betrieb.'],
                ['Ein Ansprechpartner', 'Von der Analyse bis zum Go-Live – persönlich und direkt.'],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl bg-hellgrau p-5">
                  <p className="font-display font-bold">{t}</p>
                  <p className="text-sm text-anthrazit/65 mt-2 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ANGEBOTE */}
      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHead eyebrow="Lösungen" title="Drei Wege zu einem entspannteren Betrieb" />
            <Link to="/preise" className="btn-ghost self-start md:self-auto">Alle Preise <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFERS.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.08}>
                <Link to={o.href} className="group card overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)] transition-all duration-500">
                  <div className="relative h-52 overflow-hidden bg-anthrazit">
                    <img src={o.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute left-5 top-5 w-11 h-11 rounded-2xl bg-white text-forest flex items-center justify-center shadow">{o.icon}</span>
                  </div>
                  <div className="p-7 flex flex-col flex-grow">
                    <h3 className="text-2xl">{o.title}</h3>
                    <p className="mt-3 text-anthrazit/70 leading-relaxed flex-grow">{o.text}</p>
                    <div className="mt-7 pt-5 border-t border-linie flex items-center justify-between">
                      <span className="text-sm font-semibold text-anthrazit/60">{o.price}</span>
                      <span className="inline-flex items-center gap-1.5 font-semibold text-forest">
                        Mehr erfahren <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Link to="/schulung" className="mt-6 group card p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-forest/40 transition-colors">
              <span className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shrink-0"><GraduationCap size={24} /></span>
              <div className="flex-grow">
                <p className="font-display text-xl font-bold"><SmartGastroText withAcademy /></p>
                <p className="text-anthrazit/70 mt-1">Lieber selbst umsetzen? Die Masterclass «Digitale Speisekarte» zeigt in 12 Video-Lektionen Schritt für Schritt, wie es geht – ab CHF 9 pro Lektion.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-semibold text-forest shrink-0">Zur Academy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* REFERENZEN */}
      <section className="py-24 bg-white border-y border-linie">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHead eyebrow="Referenzen" title="Im Einsatz in der Ostschweiz" lead="Vom Landgasthof bis zur Stadtpizzeria – echte Betriebe, echte Projekte." />
            <Link to="/referenzen" className="btn-ghost self-start md:self-auto">Alle Referenzen <ArrowRight size={16} /></Link>
          </div>
          <ReferenceGrid />
        </div>
      </section>

      {/* ABLAUF */}
      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="So arbeiten wir" title="In vier Schritten zum digitalen Betrieb" lead="Klar strukturiert, transparent im Preis und ohne dass Ihr Service darunter leidet." />
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <li className="relative h-full card p-7">
                  <span className="font-display text-5xl font-extrabold text-accent">{s.n}</span>
                  <h3 className="text-xl mt-4">{s.title}</h3>
                  <p className="mt-2 text-anthrazit/65 leading-relaxed">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-anthrazit/70">
            {['Erstgespräch kostenlos', 'Transparente Preise', 'Bezahlung per Karte, TWINT oder Überweisung', 'Datenschutz nach Schweizer Standard'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2"><Check size={16} className="text-primary" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
      <ContactSection />
    </>
  );
}
