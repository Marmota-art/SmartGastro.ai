import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Plus, Minus, Calculator } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { PageHero, Reveal, SectionHead, CtaBand } from '../components/Sections';
import { CONTACT_HREF } from '../constants';

const PACKAGES = [
  {
    name: 'QR-Karte Basic',
    for: 'Für Cafés, Bistros und Bars',
    price: 'ab CHF 490',
    features: [
      'Digitale Speisekarte per QR-Code',
      'Einrichtung inklusive',
      'Einfache Einrichtung',
      'QR-Codes für Ihre Tische',
      'Hygienisch und unkompliziert',
    ],
    highlight: false,
  },
  {
    name: 'QR-Menu Hero',
    for: 'Für Restaurants mit vielfältiger Karte',
    price: 'ab CHF 2’900',
    features: [
      'Alles aus «Basic»',
      'Mehrere Kategorien und Bilder',
      'Individuell gestaltetes Design',
      'Mehrsprachige Karte',
      'Auswertungen und Berichte',
    ],
    highlight: true,
  },
  {
    name: 'Order & Pay',
    for: 'Für Betriebe mit viel Service-Last',
    price: 'CHF 9’800',
    features: [
      'Direktbestellung am Tisch',
      'Integrierte Zahlungslösung',
      'Anbindung an Ihr Kassensystem',
      'Schulung Ihres Teams',
      'Spürbare Entlastung im Service',
    ],
    highlight: false,
  },
  {
    name: 'Multi-Standort',
    for: 'Für Gruppen und Hotellerie',
    price: 'ab CHF 18’000',
    features: [
      'Zentrales Management aller Standorte',
      'PMS- und POS-Integration',
      'Individuelle Anpassungen',
      'KI-gestützte Optimierung',
      'Ein Ansprechpartner für alles',
    ],
    highlight: false,
  },
];

const FAQ = [
  { q: 'Was kostet das Erstgespräch?', a: 'Nichts. Das Erstgespräch ist kostenlos und unverbindlich. Danach erhalten Sie ein massgeschneidertes Angebot für Ihren Betrieb.' },
  { q: 'Warum «ab»-Preise?', a: 'Jeder Betrieb ist anders: Umfang der Karte, Anzahl Sprachen, Kassensystem. Den genauen Preis kennen Sie vor dem Start – ohne versteckte Kosten.' },
  { q: 'Muss ich meinen Betrieb dafür schliessen?', a: 'Nein. Einrichtung und Schulung planen wir so, dass der Go-Live ohne Betriebsunterbruch stattfindet.' },
  { q: 'Wie kann ich bezahlen?', a: 'Per Kreditkarte, TWINT oder Banküberweisung. Alle Preise verstehen sich exkl. 8.1 % MwSt.' },
  { q: 'Was ist, wenn ich zuerst selbst lernen möchte?', a: 'Dann ist die SmartGastro Academy ideal: Die Masterclass «Digitale Speisekarte» gibt es ab CHF 9 pro Lektion.' },
];

function chf(n: number) {
  return 'CHF ' + Math.round(n).toLocaleString('de-CH');
}

type SliderProps = { label: string; value: number; set: (v: number) => void; min: number; max: number; step: number; fmt: (v: number) => string };

function Slider({ label, value, set, min, max, step, fmt }: SliderProps) {
  return (
    <label className="block">
      <span className="flex justify-between text-sm font-semibold"><span>{label}</span><span className="text-forest">{fmt(value)}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full mt-3 accent-[#0B5D33]" />
    </label>
  );
}

/** Beispielrechnung – alle Werte sind Annahmen des Nutzers, keine Versprechen. */
function WasteCalculator() {
  const [einsatz, setEinsatz] = useState(25000);
  const [anteil, setAnteil] = useState(8);
  const [reduktion, setReduktion] = useState(20);
  const proJahr = einsatz * 12 * (anteil / 100) * (reduktion / 100);

  return (
    <div className="card p-7 md:p-10 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
      <div className="space-y-7">
        <Slider label="Wareneinsatz pro Monat" value={einsatz} set={setEinsatz} min={5000} max={150000} step={1000} fmt={chf} />
        <Slider label="Anteil, der heute im Abfall landet" value={anteil} set={setAnteil} min={1} max={20} step={1} fmt={(v) => `${v} %`} />
        <Slider label="Angenommene Reduktion durch Prognosen" value={reduktion} set={setReduktion} min={5} max={50} step={5} fmt={(v) => `${v} %`} />
      </div>
      <div className="rounded-2xl bg-forest text-white p-8 text-center">
        <p className="text-sm text-white/70">Mögliches Sparpotenzial pro Jahr</p>
        <p className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-accent">{chf(proJahr)}</p>
        <p className="text-xs text-white/55 mt-4 leading-relaxed">Beispielrechnung mit Ihren Annahmen. Die tatsächliche Wirkung hängt von Ihrem Betrieb ab – im Erstgespräch rechnen wir es mit Ihren Zahlen durch.</p>
        <Link to={CONTACT_HREF} className="btn-accent mt-6 !py-3 text-sm">Mit meinen Zahlen rechnen <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageMeta
        title="Preise & Pakete"
        description="Transparente Preise für digitale Speisekarten (ab CHF 490), Order & Pay und Multi-Standort-Lösungen – dazu Kassensystem, Website und KI auf Anfrage. Erstgespräch kostenlos."
      />
      <PageHero
        eyebrow="Preise & Pakete"
        title={<>Klare Preise. <span className="text-forest">Keine Überraschungen.</span></>}
        lead="Wählen Sie das Paket, das zu Ihrem Betrieb passt. Alle Preise exkl. 8.1 % MwSt. – das Erstgespräch ist immer kostenlos."
      />

      <section className="pb-24">
        <div className="container-x grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div className={`relative h-full rounded-3xl p-7 flex flex-col ${p.highlight ? 'bg-forest text-white shadow-[0_30px_60px_-25px_rgba(11,93,51,0.7)]' : 'card'}`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent text-anthrazit text-xs font-bold uppercase tracking-wider px-3 py-1.5">Empfehlung</span>
                )}
                <h2 className="text-2xl">{p.name}</h2>
                <p className={`text-sm mt-1 ${p.highlight ? 'text-white/70' : 'text-anthrazit/55'}`}>{p.for}</p>
                <p className="font-display text-3xl font-extrabold mt-6">{p.price}</p>
                <p className={`text-xs mt-1 ${p.highlight ? 'text-white/55' : 'text-anthrazit/45'}`}>exkl. 8.1 % MwSt.</p>
                <ul className="mt-7 space-y-3 flex-grow">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={18} className={`shrink-0 ${p.highlight ? 'text-accent' : 'text-primary'}`} />
                      <span className={p.highlight ? 'text-white/90' : 'text-anthrazit/80'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={CONTACT_HREF} className={`mt-8 ${p.highlight ? 'btn-accent' : 'btn-ghost'}`}>
                  Angebot anfragen <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container-x mt-8">
          <p className="text-sm text-anthrazit/55">
            Die Pakete oben betreffen Speisekarte und Order &amp; Pay. <Link to="/leistungen" className="text-forest font-semibold hover:underline">Alle Leistungen ansehen</Link>
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="rounded-[2rem] bg-forest text-white p-8 md:p-12 grid lg:grid-cols-[1fr_1.3fr] gap-10 relative overflow-hidden grain">
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-primary/50 blur-3xl" />
            <div className="relative">
              <p className="eyebrow !text-accent mb-4"><span className="w-6 h-px bg-accent" />Rundum-Service</p>
              <h2 className="text-3xl md:text-4xl leading-tight">Weitere Leistungen – einzeln oder als Komplettpaket</h2>
              <p className="mt-4 text-white/75 leading-relaxed">Kasse, Website und KI hängen stark von Ihrem Betrieb ab. Nach dem kostenlosen Erstgespräch erhalten Sie ein verbindliches Angebot – ohne versteckte Kosten.</p>
              <Link to={CONTACT_HREF} className="btn-accent mt-7">Angebot anfragen <ArrowRight size={16} /></Link>
            </div>
            <ul className="relative divide-y divide-white/10 self-center">
              {[
                ['Beratung & Analyse', 'Erstgespräch kostenlos'],
                ['Kassensystem-Auswahl', 'auf Anfrage'],
                ['Kassensystem-Einrichtung & Programmierung', 'auf Anfrage'],
                ['Restaurant-Website & Design', 'auf Anfrage'],
                ['Schnittstellen & Verbindungen', 'auf Anfrage'],
                ['KI-Lösungen (SmartGastro Engine)', 'auf Anfrage'],
                ['Komplettpaket – alles aus einer Hand', 'individuelles Angebot'],
              ].map(([t, p]) => (
                <li key={t} className="flex justify-between gap-4 py-3.5">
                  <span className="font-medium">{t}</span>
                  <span className="text-sm text-accent text-right shrink-0">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-linie">
        <div className="container-x">
          <div className="flex items-start gap-4 mb-12">
            <span className="hidden sm:flex w-12 h-12 rounded-2xl bg-accent items-center justify-center shrink-0"><Calculator size={22} /></span>
            <SectionHead eyebrow="Rechenbeispiel" title="Was bringt weniger Food Waste?" lead="Schieben Sie die Regler auf die Werte Ihres Betriebs." />
          </div>
          <WasteCalculator />
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid lg:grid-cols-[1fr_1.5fr] gap-12">
          <SectionHead eyebrow="Häufige Fragen" title="Gut zu wissen" />
          <div className="divide-y divide-linie border-y border-linie">
            {FAQ.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="w-full flex justify-between items-center gap-6 py-6 text-left font-display text-lg font-semibold"
                >
                  {f.q}
                  <span className="w-8 h-8 rounded-full border border-linie flex items-center justify-center shrink-0">{open === i ? <Minus size={16} /> : <Plus size={16} />}</span>
                </button>
                {open === i && <p className="pb-6 -mt-2 text-anthrazit/70 leading-relaxed max-w-2xl">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
