import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, TrendingUp, Calculator, ShoppingCart, Bell, ShieldCheck, Plug, SlidersHorizontal,
  ExternalLink, KeyRound, MonitorCog, Globe, QrCode, BrainCircuit, Smartphone,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SmartGastroText from '../components/SmartGastroText';
import { PageHero, Reveal, CtaBand, ServiceGrid, SERVICE_ICONS } from '../components/Sections';
import { CONTACT_HREF, ENGINE_DEMO, SERVICES, ACADEMY_ENABLED } from '../constants';

const svc = (id: string) => SERVICES.find((s) => s.id === id)!;

function Points({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((p) => (
        <li key={p} className="flex items-start gap-3">
          <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${dark ? 'bg-accent text-anthrazit' : 'bg-forest/10 text-forest'}`}><Check size={14} strokeWidth={3} /></span>
          <span className={dark ? 'text-white/85' : 'text-anthrazit/80'}>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Eyebrow({ n, children, dark = false }: { n: string; children: ReactNode; dark?: boolean }) {
  return (
    <p className={`eyebrow mb-4 ${dark ? '!text-accent' : ''}`}>
      {n} · {children}
    </p>
  );
}

/** Kleine Karte für einen Leistungsbaustein innerhalb eines Themenblocks. */
function SubCard({ id }: { id: string }) {
  const s = svc(id);
  return (
    <div id={id} className="scroll-mt-28 card p-6 h-full">
      <span className="w-11 h-11 rounded-xl bg-forest text-white flex items-center justify-center">{SERVICE_ICONS[id]}</span>
      <h3 className="text-xl mt-5">{s.title}</h3>
      <p className="mt-2 text-sm text-anthrazit/65 leading-relaxed">{s.short}</p>
      <Points items={s.points} />
    </div>
  );
}

const AI_FEATURES = [
  { title: 'Nachfrage-Prognosen', icon: <TrendingUp size={22} />, desc: 'Gästezahl und Umsatz pro Tag als Grundlage für Einkauf und Personalplanung.' },
  { title: 'Mise-en-place-Vorgaben', icon: <SlidersHorizontal size={22} />, desc: 'Genaue Mengen für die Küche, damit weniger im Abfall landet.' },
  { title: 'Rezept-Kalkulation', icon: <Calculator size={22} />, desc: 'Deckungsbeiträge und Wareneinsatz automatisch berechnet.' },
  { title: 'Upsell-Empfehlungen', icon: <ShoppingCart size={22} />, desc: 'Passende Vorschläge für Ihre Gäste, die den Durchschnittsbon erhöhen.' },
  { title: 'Lager-Alerts', icon: <Bell size={22} />, desc: 'Hinweise bei drohenden Engpässen oder Überbeständen.' },
  { title: 'Kassen-Anbindung', icon: <Plug size={22} />, desc: 'Die Engine lernt direkt aus Ihren bestehenden Kassendaten.' },
];

/** Schematische Darstellung: alles ist mit der Kasse verbunden. */
function ConnectionHub() {
  const nodes = [
    { label: 'Website', icon: <Globe size={20} />, pos: 'left-0 top-0' },
    { label: 'QR-Speisekarte', icon: <QrCode size={20} />, pos: 'right-0 top-0' },
    { label: 'Order & Pay', icon: <Smartphone size={20} />, pos: 'left-0 bottom-0' },
    { label: 'KI-Engine', icon: <BrainCircuit size={20} />, pos: 'right-0 bottom-0' },
  ];
  return (
    <div className="relative aspect-square max-w-md mx-auto w-full">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-forest/25">
        {[[18, 14], [82, 14], [18, 86], [82, 86]].map(([x, y]) => (
          <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-forest text-white flex flex-col items-center justify-center text-center shadow-[0_20px_50px_-15px_rgba(11,93,51,0.7)]">
        <MonitorCog size={28} className="text-accent" />
        <span className="font-display font-bold mt-2">Ihre Kasse</span>
        <span className="text-xs text-white/70">das Herzstück</span>
      </div>
      {nodes.map((n) => (
        <div key={n.label} className={`absolute ${n.pos} w-[36%] card p-4 flex flex-col items-center text-center gap-2 shadow-sm`}>
          <span className="w-10 h-10 rounded-xl bg-accent text-anthrazit flex items-center justify-center">{n.icon}</span>
          <span className="text-sm font-semibold leading-tight">{n.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Stilisierte Restaurant-Website als Vorschau. */
function WebsiteMockup() {
  return (
    <div className="rounded-[1.5rem] bg-white border border-linie shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-linie bg-hellgrau">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 flex-1 rounded-full bg-white border border-linie text-[11px] text-anthrazit/50 px-3 py-1">www.ihr-restaurant.ch</span>
      </div>
      <div className="relative h-56 sm:h-64">
        <img src="/assets/img/v2/ambiente-teller.webp" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/10" />
        <div className="relative p-7 text-white max-w-[70%]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent font-semibold">Restaurant · Ostschweiz</p>
          <p className="font-display text-2xl sm:text-3xl font-bold mt-2 leading-tight">Saisonal. Regional. Mit Herz gekocht.</p>
          <div className="mt-5 flex gap-2">
            <span className="rounded-full bg-accent text-anthrazit text-xs font-semibold px-3 py-1.5">Tisch reservieren</span>
            <span className="rounded-full border border-white/40 text-xs font-semibold px-3 py-1.5">Speisekarte</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {['Tagesmenü', 'Öffnungszeiten', 'Anfahrt'].map((t) => (
          <div key={t} className="rounded-xl bg-hellgrau p-3">
            <div className="h-1.5 w-8 rounded bg-forest/50" />
            <p className="text-xs font-semibold mt-2">{t}</p>
            <div className="h-1.5 w-full rounded bg-anthrazit/10 mt-2" /><div className="h-1.5 w-2/3 rounded bg-anthrazit/10 mt-1.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Solutions() {
  return (
    <>
      <PageMeta
        title="Leistungen: Kassensystem, Website, Speisekarte und KI aus einer Hand"
        description="Beratung, Kassensystem-Auswahl und -Einrichtung, Restaurant-Website, digitale Speisekarte, Order & Pay, Schnittstellen und KI-Lösungen aus einer Hand für Schweizer Gastrobetriebe."
      />
      <PageHero
        eyebrow="Leistungen"
        title={<>Alles, was Ihr Restaurant digital braucht, <span className="text-forest">aus einer Hand.</span></>}
        lead="Von der ersten Analyse über Kassensystem und Website bis zur KI: Ich kümmere mich um alles und bin Ihr einziger Ansprechpartner. Einzeln buchbar oder als Komplettpaket."
      >
        <div className="mt-9 flex flex-col sm:flex-row gap-3">
          <Link to={CONTACT_HREF} className="btn-primary">Kostenloses Erstgespräch <ArrowRight size={18} /></Link>
          <Link to="/preise" className="btn-ghost">Preise ansehen</Link>
        </div>
      </PageHero>

      <section className="pb-24">
        <div className="container-x">
          <ServiceGrid />
        </div>
      </section>

      {/* KASSENSYSTEM */}
      <section id="kassensystem" className="py-24 bg-white border-y border-linie scroll-mt-20">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <Eyebrow n="01 bis 03">Beratung & Kassensystem</Eyebrow>
              <h2 className="h-section">Die passende Kasse, sauber eingerichtet.</h2>
              <p className="lead mt-5">
                Die Kasse ist das Herzstück Ihres Betriebs. Ich analysiere Ihre Abläufe, helfe bei der Wahl des passenden Systems und richte es komplett ein, damit Service und Küche vom ersten Abend an damit arbeiten können.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] overflow-hidden aspect-[16/10] bg-anthrazit">
                <img src="/assets/img/v2/loesung-kasse.webp" alt="Küche mit digitalen Bestell- und Kassenbildschirmen" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-5">
            {['beratung', 'kassenwahl', 'kasse'].map((id, i) => (
              <Reveal key={id} delay={i * 0.06}><SubCard id={id} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WEBSITE */}
      <section id="website" className="py-24 scroll-mt-20">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:order-2">
            <Eyebrow n="04">Website & Design</Eyebrow>
            <h2 className="h-section">Eine Website, die Gäste an den Tisch bringt.</h2>
            <p className="lead mt-5">{svc('website').short} Ihre Speisekarte und Öffnungszeiten pflegen Sie an einem Ort, so ist die Website immer aktuell.</p>
            <Points items={[...svc('website').points, 'Reservations- und Kontaktmöglichkeit', 'Hosting und Pflege auf Wunsch inklusive']} />
            <div className="mt-8"><Link to={CONTACT_HREF} className="btn-primary">Website anfragen <ArrowRight size={18} /></Link></div>
          </Reveal>
          <Reveal delay={0.1}><WebsiteMockup /></Reveal>
        </div>
      </section>

      {/* SPEISEKARTE & ORDER & PAY */}
      <section id="speisekarte" className="py-24 bg-white border-y border-linie scroll-mt-20">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <Eyebrow n="05">Digitale Speisekarte & Order & Pay</Eyebrow>
            <h2 className="h-section">Bestellen und bezahlen direkt am Tisch.</h2>
            <p className="lead mt-5">
              Mehr als ein PDF auf dem Handy: eine interaktive Karte im Look Ihres Betriebs, auf Wunsch mit Bestellen und Bezahlen am Tisch. Die Bestellung geht ohne Umweg an Küche und Kasse.
            </p>
            <Points items={['Zugriff per QR-Code, ohne App', 'Mehrsprachig, mit Bildern und Allergenen', 'Bestellen und Bezahlen am Tisch', 'Preise und Tagesangebote in Echtzeit ändern']} />
            <p className="mt-6 text-sm text-anthrazit/55">Im Einsatz: Pizzeria Di Grano, St. Gallen</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/preise" className="btn-primary">Preise ansehen <ArrowRight size={18} /></Link>
              <span className="font-display text-lg font-bold">ab CHF 490 <span className="font-sans text-sm font-normal text-anthrazit/50">exkl. MwSt.</span></span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4] bg-anthrazit"><img src="/assets/img/v2/loesung-speisekarte.webp" alt="Koch mit QR-Speisekarte und Tablet" loading="lazy" className="w-full h-full object-cover" /></div>
              <div className="rounded-[1.5rem] overflow-hidden aspect-[3/4] bg-anthrazit mt-10"><img src="/assets/img/v2/loesung-orderpay.webp" alt="Service mit Tablet für Order & Pay" loading="lazy" className="w-full h-full object-cover" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCHNITTSTELLEN */}
      <section id="schnittstellen" className="py-24 scroll-mt-20">
        <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="lg:order-2">
            <Eyebrow n="06">Schnittstellen & Verbindungen</Eyebrow>
            <h2 className="h-section">Alle Systeme sind verbunden.</h2>
            <p className="lead mt-5">
              Kasse, Website, Speisekarte, Bestellungen und KI arbeiten zusammen. Ein Preis wird einmal geändert und stimmt danach überall. Doppelte Erfassung und Excel-Listen fallen weg.
            </p>
            <Points items={svc('schnittstellen').points} />
          </Reveal>
          <Reveal delay={0.1}><ConnectionHub /></Reveal>
        </div>
      </section>

      {/* KI / ENGINE */}
      <section id="engine" className="py-24 scroll-mt-20 bg-forest-deep text-white relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-[40rem] h-[40rem] rounded-full bg-primary/30 blur-3xl" />
        <div className="container-x relative">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
            <Reveal>
              <Eyebrow n="07" dark>KI-Lösungen</Eyebrow>
              <h2 className="h-section">
                KI-Prognosen mit der <SmartGastroText withEngine dark />
              </h2>
              <p className="mt-6 text-lg text-white/75 leading-relaxed">
                Die Engine analysiert Ihre Kassendaten, Wettervorhersagen und lokale Events und berechnet präzise Prognosen für Ihren Tag: wie viele Gäste kommen, was die Küche vorbereiten soll und wo Sie Personal sparen können.
              </p>
              <p className="mt-4 text-white/75 leading-relaxed">
                Entwickelt mit echten Betriebsdaten, unter anderem mit mehrjährigen Kassendaten des Restaurants Löwenburg in Lienz. Der Küchenchef behält das letzte Wort: Manuelle Korrekturen sind jederzeit möglich, die KI lernt daraus.
              </p>

              <div className="mt-8 rounded-2xl bg-white/[0.07] border border-white/15 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-grow">
                  <span className="w-10 h-10 rounded-xl bg-accent text-anthrazit flex items-center justify-center shrink-0"><KeyRound size={18} /></span>
                  <div>
                    <p className="font-semibold">Live-Demo testen</p>
                    <p className="text-sm text-white/65">Demo-Passwort: <span className="font-mono text-accent">{ENGINE_DEMO.password}</span></p>
                  </div>
                </div>
                <a href={ENGINE_DEMO.url} target="_blank" rel="noopener noreferrer" className="btn-accent !py-3 text-sm">
                  Demo öffnen <ExternalLink size={16} />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
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

      {/* SCHULUNG */}
      <section id="schulung" className="py-24 scroll-mt-20">
        <div className="container-x grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <Reveal>
            <Eyebrow n="08">Schulung & Betreuung</Eyebrow>
            <h2 className="h-section">Schulung und Betreuung nach dem Start</h2>
            <p className="lead mt-5">{svc('schulung').short}</p>
            <Points items={ACADEMY_ENABLED ? [...svc('schulung').points, 'Video-Kurse der SmartGastro Academy für neue Mitarbeitende'] : svc('schulung').points} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-accent p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-anthrazit/60">Komplettpaket</p>
              <p className="font-display text-3xl md:text-4xl font-extrabold mt-3 leading-tight">Ein Ansprechpartner für Ihr ganzes Restaurant.</p>
              <p className="mt-4 text-anthrazit/75 leading-relaxed">Beratung, Kasse, Website, Speisekarte, Schnittstellen und KI, geplant als ein Projekt mit einem verbindlichen Angebot nach dem Erstgespräch.</p>
              <Link to={CONTACT_HREF} className="btn-primary mt-7">Komplettpaket anfragen <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Welche Leistungen braucht Ihr Betrieb?" text="Im kostenlosen Erstgespräch schauen wir, wo Sie heute stehen und was sich für Sie lohnt." />
    </>
  );
}
