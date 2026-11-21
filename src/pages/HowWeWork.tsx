import { Link } from 'react-router-dom';
import { Search, FileText, Database, Settings, Rocket, CheckCircle2, CreditCard, ShieldCheck, Clock, UserCheck, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { PageHero, Reveal, SectionHead, CtaBand } from '../components/Sections';
import { CONTACT_HREF } from '../constants';

const STEPS = [
  { title: 'Erstgespräch', icon: <Search size={22} />, desc: 'Wir lernen uns kennen und klären, wo es in Ihrem Betrieb am meisten drückt. Kostenlos und unverbindlich.' },
  { title: 'Analyse & Konzept', icon: <FileText size={22} />, desc: 'Ich analysiere Abläufe, Speisekarte und Kasse und erstelle ein individuelles Konzept mit massgeschneidertem Angebot.' },
  { title: 'Bearbeitung Ihrer Daten', icon: <Database size={22} />, desc: 'Import, Strukturierung und Qualitätsprüfung Ihrer Daten wie Speisekarte, Artikel und Kassendaten, unter Wahrung des Datenschutzes.' },
  { title: 'Einrichtung & Schulung', icon: <Settings size={22} />, desc: 'Ich richte die Systeme ein und schule Ihr Team vor Ort oder online, abgestimmt auf Ihre Öffnungszeiten.' },
  { title: 'Go-Live & Begleitung', icon: <Rocket size={22} />, desc: 'Start ohne Betriebsunterbruch. Danach bleibe ich Ihr Ansprechpartner für Fragen und Weiterentwicklung.' },
];

const CONDITIONS = [
  { title: 'Transparente Preise', icon: <CheckCircle2 size={22} />, desc: 'Keine versteckten Kosten. Alle Preise verstehen sich exkl. 8.1 % MwSt.' },
  { title: 'Zahlungsarten', icon: <CreditCard size={22} />, desc: 'Kreditkarte, TWINT und Banküberweisung.' },
  { title: 'Datenschutz & Sicherheit', icon: <ShieldCheck size={22} />, desc: 'Ihre Daten bleiben geschützt, nach Schweizer Datenschutzgesetz.' },
  { title: 'Flexibilität', icon: <Clock size={22} />, desc: 'Die Lösungen passen sich an Ihre Abläufe an.' },
  { title: 'Persönlicher Support', icon: <UserCheck size={22} />, desc: 'Ein fester Ansprechpartner, vor Ort oder digital.' },
];

export default function HowWeWork() {
  return (
    <>
      <PageMeta
        title="Ablauf und Konditionen"
        description="Vom kostenlosen Erstgespräch bis zum Go-Live ohne Betriebsunterbruch: der Projektablauf und die Konditionen von SmartGastro.ai."
      />
      <PageHero
        eyebrow="Ablauf"
        title={<>Vom ersten Gespräch bis zum <span className="text-forest whitespace-nowrap">Go-Live</span></>}
        lead="Fünf Schritte, ein Ansprechpartner und keine Überraschungen bei den Kosten."
      >
        <div className="mt-9">
          <Link to={CONTACT_HREF} className="btn-primary">Mit dem Erstgespräch starten <ArrowRight size={18} /></Link>
        </div>
      </PageHero>

      <section className="pb-24">
        <div className="container-x">
          <ol className="relative border-l-2 border-linie ml-5 md:ml-6 space-y-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <li className="relative pl-10 md:pl-14">
                  <span className="absolute -left-[23px] md:-left-[27px] top-0 w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-forest text-white flex items-center justify-center shadow-lg">{s.icon}</span>
                  <div className="card p-7 md:p-8 max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Schritt {i + 1}</p>
                    <h2 className="text-2xl mt-2">{s.title}</h2>
                    <p className="mt-3 text-anthrazit/70 leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="konditionen" className="py-24 bg-white border-y border-linie scroll-mt-20">
        <div className="container-x">
          <SectionHead eyebrow="Konditionen" title="Fair und transparent" lead="Die Basis jeder Zusammenarbeit." />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONDITIONS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl bg-hellgrau p-7">
                  <span className="w-11 h-11 rounded-xl bg-white text-forest flex items-center justify-center shadow-sm">{c.icon}</span>
                  <h3 className="text-xl mt-5">{c.title}</h3>
                  <p className="mt-2 text-anthrazit/70 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
