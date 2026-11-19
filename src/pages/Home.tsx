import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, GraduationCap, Check, Home as HomeIcon, Utensils, CalendarDays, BarChart3, Settings, PlayCircle, Globe, Layers, type LucideIcon } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SmartGastroText from '../components/SmartGastroText';
import { Reveal, SectionHead, ReferenceGrid, CtaBand, ContactSection, ServiceGrid } from '../components/Sections';
import { CONTACT_HREF, ACADEMY_ENABLED } from '../constants';

const STEPS = [
  { n: '01', title: 'Erstgespräch', text: 'Kostenlos und unverbindlich. Wir klären, wo es im Betrieb hakt.' },
  { n: '02', title: 'Analyse & Konzept', text: 'Ich schaue mir Abläufe, Karte und Kasse an und mache einen klaren Vorschlag.' },
  { n: '03', title: 'Einrichtung & Schulung', text: 'Ich richte alles ein, übernehme Ihre Daten und schule Ihr Team.' },
  { n: '04', title: 'Go-Live & Begleitung', text: 'Start ohne Betriebsunterbruch. Danach bleibe ich Ihr Ansprechpartner.' },
];

function IconTile({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary">
      <Icon size={24} />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <PageMeta
        title="SmartGastro.ai | Kassensystem, Website und KI für Restaurants aus einer Hand"
        description="Kassensystem-Auswahl und -Einrichtung, Restaurant-Website, digitale Speisekarte, Order & Pay und KI-Lösungen aus einer Hand. Von Thomas Ballinari, Koch und zertifiziertem KI-Spezialisten."
      />

      {/* HERO + SCHALTZENTRALE + KARTEN: dunkelgrüne Bühne */}
      <div className="relative -mt-[72px] bg-[#0B2618] text-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[38rem] -left-40 w-[40rem] h-[40rem] rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-[36rem] h-[36rem] rounded-full bg-forest/60 blur-3xl" />
        </div>

        {/* HERO */}
        <section className="relative pt-[72px] lg:min-h-[720px] flex items-center">
          <div className="hidden lg:block absolute inset-0">
            <img
              src="/assets/img/v3/hero-qr-phone.webp"
              alt="QR-Speisekarte auf dem Tisch und Gast mit digitaler Speisekarte auf dem Handy"
              fetchPriority="high"
              className="absolute right-0 top-0 h-full w-full lg:w-[66%] object-cover object-[70%_top]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B2618] via-[#0B2618]/80 to-[#0B2618]/20 lg:from-35% lg:via-[#0B2618]/55 lg:via-45% lg:to-transparent lg:to-62%" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B2618] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
          </div>

          {/* Seitliche Icon-Leiste */}
          <nav aria-label="Schnellzugriff" className="hidden xl:flex absolute left-7 top-[180px] flex-col items-center gap-5 z-10">
            {[
              { to: '/', label: 'Startseite', Icon: HomeIcon, active: true },
              { to: '/leistungen', label: 'Leistungen', Icon: Utensils },
              { to: CONTACT_HREF, label: 'Erstgespräch buchen', Icon: CalendarDays },
              { to: '/referenzen', label: 'Referenzen', Icon: BarChart3 },
              { to: '/so-arbeiten-wir', label: 'So arbeiten wir', Icon: Settings },
            ].map(({ to, label, Icon, active }) => (
              <Link key={label} to={to} aria-label={label} title={label}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${active ? 'bg-primary/80 text-white shadow-lg shadow-black/30' : 'text-white/85 hover:bg-white/10'}`}>
                <Icon size={22} />
              </Link>
            ))}
          </nav>

          <div className="container-x relative w-full pt-10 pb-12 lg:py-24">
            <div className="max-w-xl xl:pl-14">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.1rem] font-extrabold text-creme drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
              >
                Ihre Gastronomie digital, einfach,{' '}
                <span className="relative inline-block text-accent">
                  aus einer Hand.
                  <svg aria-hidden="true" viewBox="0 0 300 14" className="absolute left-1 -bottom-3 w-[92%] h-3.5 text-accent" preserveAspectRatio="none"><path d="M3 10C80 2 190 1 297 6" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" /></svg>
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-9 text-lg sm:text-xl text-white/90 leading-relaxed max-w-md">
                Website, digitale Speisekarte und ein smartes System für mehr Gäste, Reservierungen und Umsatz.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to={CONTACT_HREF} className="btn-primary !bg-primary hover:!bg-[#0FA84A] text-base !px-8 !py-4">Jetzt starten <ArrowRight size={18} /></Link>
                <Link to="/so-arbeiten-wir" className="btn-ghost-dark !border-white/70 text-base !px-7 !py-4 backdrop-blur-sm"><PlayCircle size={20} /> In 2 Minuten erklärt</Link>
              </motion.div>
            </div>
            <img
              src="/assets/img/v3/hero-qr-phone.webp"
              alt=""
              aria-hidden="true"
              className="lg:hidden mt-10 w-full aspect-[4/3] rounded-[2rem] object-cover object-[65%_top] shadow-2xl shadow-black/40"
            />
          </div>
        </section>

        {/* SCHALTZENTRALE */}
        <section className="relative container-x pb-6">
          <Reveal>
            <div className="relative flex flex-col lg:block rounded-[2rem] overflow-hidden bg-[#F6F1E4] text-anthrazit lg:min-h-[360px]">
              <img
                src="/assets/img/v3/dashboard-laptop.webp"
                alt="SmartGastro Übersicht mit Bestellungen, Reservierungen und Umsatz auf dem Laptop"
                loading="lazy"
                className="relative lg:absolute lg:right-0 lg:inset-y-0 w-full lg:w-[56%] h-64 sm:h-80 lg:h-full object-cover object-left order-2"
              />
              {/* weiche Welle zwischen Text und Bild */}
              <svg aria-hidden="true" viewBox="0 0 120 400" preserveAspectRatio="none" className="hidden lg:block absolute inset-y-0 left-[44%] -ml-px h-full w-28 text-[#F6F1E4]">
                <path d="M0 0H60C120 70 20 150 70 220C110 280 40 340 90 400H0Z" fill="currentColor" />
              </svg>
              <div className="relative order-1 p-8 sm:p-12 lg:p-14 lg:w-[50%]">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-forest">Ihre digitale Schaltzentrale</p>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] font-extrabold text-forest-deep">
                  Alles im Überblick.<br />Weniger Aufwand.<br />
                  <span className="relative inline-block">
                    Mehr Zeit für Ihre Gäste.
                    <svg aria-hidden="true" viewBox="0 0 300 12" className="absolute left-0 -bottom-4 w-[70%] h-3 text-accent" preserveAspectRatio="none"><path d="M3 8C90 3 200 2 297 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" /></svg>
                  </span>
                </h2>
              </div>
            </div>
          </Reveal>
        </section>

        {/* DREI KARTEN */}
        <section className="relative container-x pt-6 pb-20">
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Website */}
            <Reveal>
              <Link to="/leistungen#website" className="group relative flex h-full min-h-[270px] rounded-[2rem] overflow-hidden bg-[#F6F1E4] text-anthrazit">
                <img src="/assets/img/v3/card-website.webp" alt="Restaurant-Website auf dem Laptop" loading="lazy" className="w-[55%] object-cover object-left group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="flex-1 p-5 pl-3 flex flex-col justify-center">
                  <IconTile Icon={Globe} />
                  <h3 className="mt-4 text-[1.35rem] sm:text-2xl leading-[1.05] font-extrabold text-forest-deep hyphens-auto break-words" lang="de">Ihre Website</h3>
                  <p className="mt-2 text-anthrazit/75 leading-snug">Modern, mobil und auf Ihr Restaurant zugeschnitten.</p>
                </div>
              </Link>
            </Reveal>

            {/* Reservierungen */}
            <Reveal delay={0.08}>
              <Link to="/leistungen" className="group relative flex h-full min-h-[270px] rounded-[2rem] overflow-hidden bg-[#F6F1E4] text-anthrazit">
                <img src="/assets/img/v3/card-reservieren.webp" alt="Online-Reservierung auf dem Handy" loading="lazy" className="w-[45%] object-cover object-center group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="flex-1 p-5 flex flex-col justify-center">
                  <IconTile Icon={CalendarDays} />
                  <h3 className="mt-4 text-[1.35rem] sm:text-2xl leading-[1.05] font-extrabold text-forest-deep hyphens-auto break-words" lang="de">Mehr Reservierungen</h3>
                  <p className="mt-2 text-anthrazit/75 leading-snug">Einfach online, rund um die Uhr.</p>
                </div>
              </Link>
            </Reveal>

            {/* Alles in einer Lösung */}
            <Reveal delay={0.16}>
              <Link to="/leistungen" className="group relative flex h-full min-h-[270px] rounded-[2rem] overflow-hidden bg-[#F6F1E4] text-anthrazit">
                <div className="flex-1 p-6 pr-2 flex flex-col justify-center relative z-10">
                  <IconTile Icon={Layers} />
                  <h3 className="mt-4 text-[1.35rem] sm:text-2xl leading-[1.05] font-extrabold text-forest-deep hyphens-auto break-words" lang="de">Alles in einer Lösung</h3>
                  <p className="mt-2 text-anthrazit/75 leading-snug">Website, Speisekarte, Reservierungen und smarte Automatisierung.</p>
                </div>
                <div className="relative w-[42%] shrink-0">
                  <img src="/assets/img/v3/card-teller.webp" alt="Angerichteter Teller" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  <svg aria-hidden="true" viewBox="0 0 40 300" preserveAspectRatio="none" className="absolute inset-y-0 -left-px h-full w-8 text-[#F6F1E4]">
                    <path d="M0 0H22C2 60 34 120 14 180C2 230 30 270 18 300H0Z" fill="currentColor" />
                  </svg>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      </div>

      {/* PROBLEM → VERSPRECHEN */}
      <section className="py-20 border-y border-linie bg-white">
        <div className="container-x grid lg:grid-cols-[1fr_1.3fr] gap-12 items-start">
          <Reveal>
            <p className="eyebrow mb-4">Warum SmartGastro</p>
            <h2 className="h-section">Wieder mehr Zeit als Gastgeber.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="font-display text-2xl md:text-3xl leading-snug text-anthrazit/85">
              «Ich will, dass Gastronominnen und Gastronomen wieder Gastgeber sein können, präsent im Gastraum und kreativ in der Küche, und nicht gefangen in Hektik, Excel-Tabellen oder Personalnot.»
            </blockquote>
            <p className="mt-5 text-sm font-semibold text-anthrazit/55">Thomas Ballinari, Gründer</p>
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                ['Aus der Praxis', 'Als Koch, Küchenchef und langjähriger Pächter kenne ich den Druck am Pass.'],
                ['Alles aus einer Hand', 'Speisekarte, Kasse, Daten und Schulung, abgestimmt auf Ihren Betrieb.'],
                ['Ein Ansprechpartner', 'Persönlich und direkt, von der Analyse bis zum Go-Live.'],
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

      {/* RUNDUM-SERVICE */}
      <section className="py-24">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHead
              eyebrow="Rundum-Service"
              title={<>Alles aus einer Hand, <span className="text-forest">von der Kasse bis zur KI.</span></>}
              lead="Statt fünf Anbieter zu koordinieren, haben Sie einen Ansprechpartner. Ich kümmere mich um alles, was Ihr Restaurant digital braucht, Schritt für Schritt oder als Komplettpaket."
            />
            <Link to="/leistungen" className="btn-ghost self-start md:self-auto">Alle Leistungen <ArrowRight size={16} /></Link>
          </div>
          <ServiceGrid />

          {ACADEMY_ENABLED && (
          <Reveal delay={0.1}>
            <Link to="/schulung" className="mt-6 group card p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:border-forest/40 transition-colors">
              <span className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shrink-0"><GraduationCap size={24} /></span>
              <div className="flex-grow">
                <p className="font-display text-xl font-bold"><SmartGastroText withAcademy /></p>
                <p className="text-anthrazit/70 mt-1">Lieber selbst umsetzen? Die Masterclass «Digitale Speisekarte» zeigt in 12 Video-Lektionen Schritt für Schritt, wie es geht. Ab CHF 9 pro Lektion.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-semibold text-forest shrink-0">Zur Academy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          </Reveal>
          )}
        </div>
      </section>

      {/* REFERENZEN */}
      <section className="py-24 bg-white border-y border-linie">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHead eyebrow="Referenzen" title="Im Einsatz in der Ostschweiz" lead="Vom Landgasthof bis zur Pizzeria in der Stadt." />
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
