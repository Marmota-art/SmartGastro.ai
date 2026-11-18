import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Mail, MapPin, Clock, Check, ClipboardCheck, Scale, MonitorCog, Globe, QrCode, Workflow, BrainCircuit, GraduationCap } from 'lucide-react';
import { BRAND, REFERENCES, CONTACT_HREF, SERVICES } from '../constants';

/** Sanftes Einblenden beim Scrollen. */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, lead, center = false }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="h-section">{title}</h2>
      {lead && <p className="lead mt-5">{lead}</p>}
    </div>
  );
}

/** Seitenkopf für Unterseiten. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="pt-14 pb-16 md:pt-20 md:pb-20">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">{title}</h1>
          {lead && <p className="lead mt-6 max-w-2xl">{lead}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

function RefVisual({ r }: { r: (typeof REFERENCES)[number] }) {
  if (r.img) {
    return (
      <div className="relative h-56 overflow-hidden">
        <img src={r.img} alt={`${r.name}, ${r.place}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {r.logo && (
          <div className="absolute left-5 bottom-5 bg-white rounded-xl px-3 py-2 shadow-lg">
            <img src={r.logo} alt={`Logo ${r.name}`} className="h-12 w-auto" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="relative h-56 overflow-hidden bg-forest grain flex items-end p-6">
      <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-primary/40 blur-2xl" />
      <div className="absolute right-6 top-6 font-display font-extrabold text-[5.5rem] leading-none text-white/10 select-none">{r.initials}</div>
      <div className="relative">
        <p className="text-accent text-xs font-semibold uppercase tracking-[0.18em]">{r.type}</p>
        <p className="font-display text-2xl font-bold text-white mt-1">{r.name}</p>
      </div>
    </div>
  );
}

export function ReferenceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {REFERENCES.map((r, i) => (
        <Reveal key={r.id} delay={i * 0.08}>
          <article className="group card overflow-hidden h-full flex flex-col">
            <RefVisual r={r} />
            <div className="p-7 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-sm text-anthrazit/55">
                <MapPin size={14} /> {r.place}
              </div>
              <h3 className="text-xl mt-2">{r.name}</h3>
              <p className="mt-1 text-sm font-semibold text-forest">{r.project}</p>
              <p className="mt-4 text-anthrazit/70 leading-relaxed flex-grow">{r.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <li key={t} className="text-xs font-medium px-2.5 py-1 rounded-full bg-hellgrau text-anthrazit/70">{t}</li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function CtaBand({ title = 'Lassen Sie uns über Ihren Betrieb sprechen.', text = 'Im kostenlosen Erstgespräch schauen wir gemeinsam, wo Digitalisierung in Ihrem Betrieb am meisten bringt. Ehrlich und unverbindlich.' }: { title?: string; text?: string }) {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest text-white px-8 py-14 md:px-16 md:py-20 grain">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/50 blur-3xl" />
          <div className="absolute -left-10 bottom-0 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl leading-[1.05]">{title}</h2>
              <p className="mt-5 text-white/75 text-lg max-w-xl">{text}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={CONTACT_HREF} className="btn-accent">Erstgespräch buchen <ArrowRight size={18} /></Link>
              <a href={`mailto:${BRAND.email}`} className="btn-ghost-dark"><Mail size={18} /> E-Mail schreiben</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="kontakt" className="py-24 scroll-mt-20">
      <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-14">
        <div>
          <SectionHead
            eyebrow="Kontakt"
            title={<>Kostenloses Erstgespräch</>}
            lead="Erzählen Sie mir kurz von Ihrem Betrieb. Ich melde mich persönlich bei Ihnen und schlage Ihnen einen Termin vor, bei Ihnen vor Ort oder online."
          />
          <ul className="mt-10 space-y-4">
            {[
              'Unverbindlich und kostenlos',
              'Konkrete Einschätzung für Ihren Betrieb',
              'Vor Ort in Ihrem Betrieb oder online',
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5"><Check size={14} strokeWidth={3} /></span>
                <span className="text-anthrazit/80">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 card p-6 flex items-center gap-4">
            <img src="/assets/img/v2/thomas.webp" alt="Thomas Ballinari" loading="lazy" className="w-16 h-16 rounded-full object-cover object-top" />
            <div className="text-sm">
              <p className="font-semibold">Thomas Ballinari</p>
              <a href={`mailto:${BRAND.email}`} className="text-forest hover:underline">{BRAND.email}</a>
              <p className="flex items-center gap-1.5 text-anthrazit/55 mt-1"><Clock size={13} /> Sie erhalten eine persönliche Antwort</p>
            </div>
          </div>
        </div>

        <form
          name="kontakt"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          action="/thanks"
          className="card p-6 sm:p-10 space-y-5 self-start"
        >
          <input type="hidden" name="form-name" value="kontakt" />
          <p className="hidden">
            <label>Nicht ausfüllen: <input name="bot-field" /></label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="field-label">Name</label>
              <input type="text" id="name" name="name" required autoComplete="name" className="field" placeholder="Vor- und Nachname" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="field-label">E-Mail</label>
              <input type="email" id="email" name="email" required autoComplete="email" className="field" placeholder="ihre@email.ch" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="firma" className="field-label">Betrieb <span className="font-normal text-anthrazit/45">(optional)</span></label>
              <input type="text" id="firma" name="firma" autoComplete="organization" className="field" placeholder="Name Ihres Betriebs" />
            </div>
            <div className="space-y-2">
              <label htmlFor="anliegen" className="field-label">Interesse</label>
              <select id="anliegen" name="anliegen" className="field appearance-none" defaultValue="Komplettpaket (alles aus einer Hand)">
                <option>Komplettpaket (alles aus einer Hand)</option>
                <option>Kassensystem: Auswahl &amp; Einrichtung</option>
                <option>Website &amp; Design</option>
                <option>Digitale Speisekarte</option>
                <option>Order &amp; Pay</option>
                <option>KI-Lösungen (Engine)</option>
                <option>Mehrere Standorte</option>
                <option>Academy / Schulung</option>
                <option>Noch offen</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="nachricht" className="field-label">Nachricht</label>
            <textarea id="nachricht" name="nachricht" required rows={5} className="field resize-none" placeholder="Was beschäftigt Sie im Betrieb gerade am meisten?" />
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="privacy" name="privacy" required className="mt-1 w-4 h-4 accent-[#0B5D33]" />
            <label htmlFor="privacy" className="text-sm text-anthrazit/65 leading-relaxed">
              Ich bin einverstanden, dass meine Angaben zur Beantwortung meiner Anfrage gespeichert werden. Keine Weitergabe an Dritte. <Link to="/datenschutz" className="underline underline-offset-2">Datenschutz</Link>
            </label>
          </div>

          <button type="submit" className="btn-primary w-full text-base">
            Anfrage senden <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

export const SERVICE_ICONS: Record<string, ReactNode> = {
  beratung: <ClipboardCheck size={22} />,
  kassenwahl: <Scale size={22} />,
  kasse: <MonitorCog size={22} />,
  website: <Globe size={22} />,
  speisekarte: <QrCode size={22} />,
  schnittstellen: <Workflow size={22} />,
  engine: <BrainCircuit size={22} />,
  schulung: <GraduationCap size={22} />,
};

/** Rundum-Service als nummerierte Bausteine. */
export function ServiceGrid({ linked = true }: { linked?: boolean }) {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SERVICES.map((s, i) => {
        const inner = (
          <>
            <div className="flex items-center justify-between">
              <span className="w-12 h-12 rounded-2xl bg-forest text-white flex items-center justify-center group-hover:bg-accent group-hover:text-anthrazit transition-colors">{SERVICE_ICONS[s.id]}</span>
              <span className="font-display text-sm font-bold text-anthrazit/30 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="text-xl mt-6">{s.title}</h3>
            <p className="mt-2 text-sm text-anthrazit/65 leading-relaxed flex-grow">{s.short}</p>
            {linked && (
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </>
        );
        return (
          <Reveal key={s.id} delay={(i % 4) * 0.06}>
            <li className="h-full">
              {linked ? (
                <Link to={`/leistungen#${s.id}`} className="group card p-6 h-full flex flex-col hover:border-forest/40 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.35)] transition-all duration-500">{inner}</Link>
              ) : (
                <div className="group card p-6 h-full flex flex-col">{inner}</div>
              )}
            </li>
          </Reveal>
        );
      })}
    </ol>
  );
}
