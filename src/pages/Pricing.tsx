import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check, ArrowRight, Plus, Minus, Calculator, MessageCircle, ClipboardCheck, FileSignature,
  MonitorCog, QrCode, Globe, BrainCircuit, ChefHat, Coffee, UtensilsCrossed, Home as HomeIcon, Building2, Link2,
} from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { PageHero, Reveal, SectionHead, CtaBand } from '../components/Sections';
import { CONTACT_HREF } from '../constants';

/** Vom Erstgespräch zum verbindlichen Preis. */
const PATH = [
  { Icon: MessageCircle, title: 'Erstgespräch', text: 'Kostenlos und unverbindlich. Sie erzählen, wo es im Betrieb drückt.' },
  { Icon: ClipboardCheck, title: 'Analyse Ihres Betriebs', text: 'Ich sehe mir Abläufe, Karte und vor allem Ihre Kasse an: Was ist da, was lässt sich anbinden?' },
  { Icon: FileSignature, title: 'Ihr Angebot', text: 'Sie erhalten ein verbindliches Angebot mit Festpreis, zugeschnitten auf Ihren Betrieb. Ohne versteckte Kosten.' },
];

/** Was an der Kasse hängt. */
const KASSE_LINKS = [
  { Icon: QrCode, title: 'Digitale Speisekarte', text: 'Artikel und Preise kommen direkt aus der Kasse. Einmal ändern, am Tisch sofort aktuell.' },
  { Icon: ChefHat, title: 'Bestellen am Tisch', text: 'Bestellungen laufen ohne Umweg in die Kasse und auf den Bon in der Küche.' },
  { Icon: Globe, title: 'Website', text: 'Die Karte auf Ihrer Website zeigt dieselben Gerichte und Preise wie die Kasse.' },
  { Icon: BrainCircuit, title: 'KI und Prognosen', text: 'Die Kassendaten sind die Grundlage, um Gäste, Umsatz und Einkauf vorauszuplanen.' },
];

type Betrieb = {
  id: string;
  label: string;
  Icon: typeof Coffee;
  intro: string;
  bedarf: string[];
  kasse: string;
  analyse: string[];
  beispiel: { name: string; preis: string; note?: string }[];
};

/** Beispiele je Betriebsart. Alle Preise sind Richtwerte, der verbindliche Preis folgt nach der Analyse. */
const BETRIEBE: Betrieb[] = [
  {
    id: 'cafe',
    label: 'Café, Bistro, Bar',
    Icon: Coffee,
    intro: 'Kleine Karte, schneller Service, oft wechselnde Angebote.',
    bedarf: ['QR-Karte für Getränke und Speisen', 'Tagesangebote schnell ändern', 'Allergene und Zutaten auf einen Blick'],
    kasse: 'Preise und Artikel kommen aus Ihrer Kasse. Wer neu startet, bekommt eine passende Tablet-Kasse vorgeschlagen.',
    analyse: ['Welche Kasse ist im Einsatz?', 'Wie oft ändert sich die Karte?', 'Braucht es mehrere Sprachen?'],
    beispiel: [{ name: 'QR-Karte mit Kassenanbindung', preis: 'ab CHF 490' }],
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    Icon: UtensilsCrossed,
    intro: 'Vielfältige Karte, Stammgäste und Touristen, Service unter Druck.',
    bedarf: ['Speisekarte mit Bildern und Kategorien', 'Mehrsprachig für Gäste von auswärts', 'Auf Wunsch bestellen und bezahlen am Tisch'],
    kasse: 'Die Kasse ist die eine Quelle für Karte, Bestellungen und Website. Bestellungen vom Tisch landen direkt auf dem Küchenbon.',
    analyse: ['Lässt sich Ihre Kasse anbinden, und wie?', 'Wo verliert der Service heute Zeit?', 'Lohnt sich Bestellen am Tisch für Sie?'],
    beispiel: [
      { name: 'Speisekarte mit Bildern, mehrsprachig', preis: 'ab CHF 2’900' },
      { name: 'Bestellen und bezahlen am Tisch', preis: 'rund CHF 9’800', note: 'inkl. Anbindung an die Kasse und Schulung' },
    ],
  },
  {
    id: 'landgasthof',
    label: 'Landgasthof',
    Icon: HomeIcon,
    intro: 'Grosser Betrieb mit Saal, Bankette, schwankende Gästezahlen.',
    bedarf: ['Kasse einrichten oder neu aufbauen', 'Speisekarte und Website aus einem Guss', 'Prognosen für Einkauf und Personal'],
    kasse: 'Ich bereite Ihre Kassendaten der letzten Jahre auf. Daraus entstehen Karte, Auswertungen und Prognosen, wie im Restaurant Löwenburg.',
    analyse: ['Welche Daten liefert Ihre Kasse heute?', 'Wie läuft es bei Banketten und im Saal?', 'Wo entstehen Food Waste und Überstunden?'],
    beispiel: [
      { name: 'Speisekarte mit Kassenanbindung und Website', preis: 'ab CHF 2’900' },
      { name: 'Kasse, Daten und KI-Prognosen', preis: 'nach Analyse' },
    ],
  },
  {
    id: 'gruppe',
    label: 'Gruppe, Hotel',
    Icon: Building2,
    intro: 'Mehrere Standorte oder Hotel mit Restaurant und Bar.',
    bedarf: ['Zentrale Verwaltung aller Karten', 'Kasse und Hotelsoftware verbunden', 'Auswertungen über alle Standorte'],
    kasse: 'Alle Kassen und die Hotelsoftware werden angebunden. Preise und Artikel pflegen Sie zentral, jeder Standort ist sofort aktuell.',
    analyse: ['Welche Kassen und welche Hotelsoftware laufen?', 'Was soll zentral, was pro Standort gesteuert werden?', 'Welche Zahlen brauchen Sie für Entscheide?'],
    beispiel: [{ name: 'Mehrere Standorte, zentral verwaltet', preis: 'ab CHF 18’000' }],
  },
];

const FAQ = [
  { q: 'Warum gibt es keine fixen Paketpreise?', a: 'Weil jeder Betrieb anders ist: Kassensystem, Umfang der Karte, Sprachen, Abläufe. Die Preise auf dieser Seite sind Beispiele zur Orientierung. Ihren verbindlichen Festpreis erhalten Sie nach der Analyse, bevor irgendetwas startet.' },
  { q: 'Was kostet das Erstgespräch?', a: 'Nichts. Das Erstgespräch ist kostenlos und unverbindlich.' },
  { q: 'Funktioniert das mit meiner Kasse?', a: 'Das klären wir in der Analyse. Ich prüfe, wie sich Ihre bestehende Kasse anbinden lässt. Wenn sie nicht passt, vergleiche ich mit Ihnen Alternativen und richte die neue Kasse ein.' },
  { q: 'Muss ich meinen Betrieb dafür schliessen?', a: 'Nein. Einrichtung und Schulung plane ich so, dass der Start ohne Betriebsunterbruch gelingt.' },
  { q: 'Wie kann ich bezahlen?', a: 'Per Kreditkarte, TWINT oder Banküberweisung. Alle Preise verstehen sich exkl. 8.1 % MwSt.' },
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

/** Beispielrechnung: alle Werte sind Annahmen des Nutzers, keine Versprechen. */
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
        <p className="text-xs text-white/55 mt-4 leading-relaxed">Beispielrechnung mit Ihren Annahmen. Die tatsächliche Wirkung hängt von Ihrem Betrieb ab. Im Erstgespräch rechnen wir es mit Ihren Zahlen durch.</p>
        <Link to={CONTACT_HREF} className="btn-accent mt-6 !py-3 text-sm">Mit meinen Zahlen rechnen <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

export default function Pricing() {
  const [open, setOpen] = useState<number | null>(0);
  const [sel, setSel] = useState(1);
  const b = BETRIEBE[sel];

  return (
    <>
      <PageMeta
        title="Preise nach Analyse Ihres Betriebs"
        description="Ihr Preis entsteht aus der Analyse Ihres Betriebs. Beispielpreise für Café, Restaurant, Landgasthof und Hotel, mit Anbindung an Ihre Kasse. Erstgespräch kostenlos."
      />
      <PageHero
        eyebrow="Preise"
        title={<>Ihr Preis passt zu <span className="text-forest">Ihrem Betrieb.</span></>}
        lead="Kein Paket von der Stange. Ich analysiere zuerst Ihren Betrieb und Ihre Kasse, danach erhalten Sie ein verbindliches Angebot mit Festpreis. Die Preise auf dieser Seite sind Beispiele zur Orientierung."
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to={CONTACT_HREF} className="btn-primary">Kostenlose Analyse anfragen <ArrowRight size={18} /></Link>
          <a href="#beispiele" className="btn-ghost">Beispiele ansehen</a>
        </div>
      </PageHero>

      {/* Weg zum Preis */}
      <section className="pb-20">
        <div className="container-x">
          <ol className="grid md:grid-cols-3 gap-5">
            {PATH.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <li className="card h-full p-7 relative">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-forest/[0.08] text-forest flex items-center justify-center"><Icon size={22} /></span>
                    <span className="font-display text-4xl font-extrabold text-accent">{i + 1}</span>
                  </div>
                  <h2 className="text-xl mt-5">{title}</h2>
                  <p className="mt-2 text-anthrazit/70 leading-relaxed">{text}</p>
                  {i === 0 && <p className="mt-4 inline-flex rounded-full bg-accent/30 px-3 py-1 text-xs font-bold text-anthrazit">kostenlos</p>}
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Kassenanbindung */}
      <section className="pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] bg-forest text-white p-8 md:p-12 lg:p-14 grain">
            <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/50 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="eyebrow !text-accent mb-4"><Link2 size={14} /> Kassenanbindung</p>
                <h2 className="text-3xl md:text-[2.6rem] leading-[1.08]">Ihre Kasse ist das Herzstück. Alles andere hängt daran.</h2>
                <p className="mt-5 text-white/80 leading-relaxed text-lg">
                  Speisekarte, Bestellungen, Website und KI holen ihre Daten aus der Kasse. Darum ist die Anbindung bei mir immer Teil des Angebots, nicht ein teures Extra.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {['Einmal ändern, überall aktuell', 'Nichts doppelt erfassen', 'Bestehende Kasse anbinden oder passende neue einrichten'].map((t) => (
                    <li key={t} className="flex items-start gap-2.5"><Check size={20} className="text-accent shrink-0 mt-0.5" /><span>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="mx-auto w-fit flex items-center gap-3 rounded-2xl bg-accent text-anthrazit px-5 py-4 shadow-xl">
                  <MonitorCog size={28} />
                  <div>
                    <p className="font-display text-xl font-extrabold leading-none">Ihre Kasse</p>
                    <p className="text-xs font-semibold mt-1 opacity-75">Artikel · Preise · Umsätze</p>
                  </div>
                </div>
                <div aria-hidden="true" className="mx-auto h-6 w-px bg-white/30" />
                <div className="grid sm:grid-cols-2 gap-3">
                  {KASSE_LINKS.map(({ Icon, title, text }) => (
                    <div key={title} className="rounded-2xl bg-white/[0.07] border border-white/10 p-5">
                      <p className="flex items-center gap-2 font-display font-bold text-lg"><Icon size={20} className="text-accent" />{title}</p>
                      <p className="mt-2 text-sm text-white/70 leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beispiele je Betrieb */}
      <section id="beispiele" className="py-24 bg-white border-y border-linie scroll-mt-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Beispiele"
            title="Was passt zu Ihrem Betrieb?"
            lead="Wählen Sie Ihre Betriebsart. Sie sehen, was Betriebe wie Ihrer typischerweise brauchen, wie die Kasse eingebunden wird und was es ungefähr kostet."
          />

          <div role="tablist" aria-label="Betriebsart" className="mt-10 flex flex-wrap gap-2">
            {BETRIEBE.map((x, i) => (
              <button
                key={x.id}
                role="tab"
                id={`tab-${x.id}`}
                aria-selected={sel === i}
                aria-controls={`panel-${x.id}`}
                onClick={() => setSel(i)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-colors border ${sel === i ? 'bg-forest text-white border-forest' : 'bg-white text-anthrazit border-linie hover:border-forest/40'}`}
              >
                <x.Icon size={18} /> {x.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={b.id}
              id={`panel-${b.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${b.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-8 grid lg:grid-cols-[1.25fr_1fr] gap-5"
            >
              <div className="rounded-3xl bg-hellgrau p-7 md:p-9">
                <p className="text-lg text-anthrazit/80">{b.intro}</p>
                <div className="mt-7 grid sm:grid-cols-2 gap-7">
                  <div>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-[0.14em] text-forest">Typischer Bedarf</h3>
                    <ul className="mt-3 space-y-2.5">
                      {b.bedarf.map((t) => <li key={t} className="flex gap-2.5"><Check size={18} className="text-primary shrink-0 mt-0.5" />{t}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-bold uppercase tracking-[0.14em] text-forest">Das klärt die Analyse</h3>
                    <ul className="mt-3 space-y-2.5">
                      {b.analyse.map((t) => <li key={t} className="flex gap-2.5"><ClipboardCheck size={18} className="text-primary shrink-0 mt-0.5" />{t}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-7 rounded-2xl bg-white border-2 border-forest/20 p-5 flex gap-4">
                  <span className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0"><Link2 size={20} /></span>
                  <div>
                    <p className="font-display font-bold text-lg">So hängt Ihre Kasse dran</p>
                    <p className="mt-1 text-anthrazit/75 leading-relaxed">{b.kasse}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-forest text-white p-7 md:p-9 flex flex-col">
                <p className="inline-flex self-start rounded-full bg-accent text-anthrazit text-xs font-bold uppercase tracking-wider px-3 py-1.5">Beispielpreise</p>
                <ul className="mt-6 space-y-5 flex-grow">
                  {b.beispiel.map((e) => (
                    <li key={e.name} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                      <p className="text-white/80">{e.name}</p>
                      <p className="font-display text-3xl font-extrabold mt-1">{e.preis}</p>
                      {e.note && <p className="text-sm text-white/60 mt-1">{e.note}</p>}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-white/55 leading-relaxed">Richtwerte exkl. 8.1 % MwSt. Kassenanbindung inbegriffen, soweit Ihre Kasse eine Schnittstelle hat. Der verbindliche Festpreis folgt nach der Analyse.</p>
                <Link to={CONTACT_HREF} className="btn-accent mt-6">Analyse für meinen Betrieb <ArrowRight size={16} /></Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Weitere Bausteine */}
      <section className="py-24">
        <div className="container-x grid lg:grid-cols-[1fr_1.3fr] gap-10 items-start">
          <SectionHead
            eyebrow="Rundum-Service"
            title="Weitere Bausteine, einzeln oder als Komplettpaket"
            lead="Kasse, Website und KI hängen stark von Ihrem Betrieb ab. Diese Bausteine kalkuliere ich nach der Analyse in Ihr Angebot ein."
          />
          <ul className="card divide-y divide-linie px-6">
            {[
              ['Beratung & Analyse', 'Erstgespräch kostenlos'],
              ['Kassensystem-Auswahl', 'nach Analyse'],
              ['Kassensystem-Einrichtung & Datenübernahme', 'nach Analyse'],
              ['Schnittstellen & Kassenanbindung', 'im Angebot inbegriffen'],
              ['Restaurant-Website & Design', 'nach Analyse'],
              ['KI-Lösungen (SmartGastro Engine)', 'nach Analyse'],
              ['Schulung & Betreuung', 'im Angebot inbegriffen'],
            ].map(([t, p]) => (
              <li key={t} className="flex justify-between gap-4 py-4">
                <span className="font-medium">{t}</span>
                <span className="text-sm text-forest font-semibold text-right shrink-0">{p}</span>
              </li>
            ))}
          </ul>
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

      <CtaBand title="Was kostet es für Ihren Betrieb?" text="Im kostenlosen Erstgespräch und der Analyse klären wir, wie Ihre Kasse angebunden wird und was Sie wirklich brauchen. Danach erhalten Sie ein verbindliches Angebot." />
    </>
  );
}
