import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat, Utensils, Building2, Sparkles, Mail } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import SmartGastroText from '../components/SmartGastroText';
import { Reveal, CtaBand } from '../components/Sections';
import { BRAND, CONTACT_HREF } from '../constants';

const PATH = [
  { icon: <ChefHat size={20} />, title: 'Gelernter Koch', text: 'Das Handwerk von der Pike auf gelernt.' },
  { icon: <Utensils size={20} />, title: 'Küchenchef', text: 'Verantwortung für Team, Einkauf und Kalkulation.' },
  { icon: <Building2 size={20} />, title: 'Pächter eines grossen Landgasthofs', text: 'Über viele Jahre als Unternehmer geführt, mit allen Höhen und Tiefen.' },
  { icon: <Sparkles size={20} />, title: 'Zertifizierter KI-Spezialist', text: 'Heute bringe ich digitale Werkzeuge und KI in Gastrobetriebe.' },
];

export default function About() {
  return (
    <>
      <PageMeta
        title="Über mich: Thomas Ballinari"
        description="Thomas Ballinari ist gelernter Koch, Küchenchef, langjähriger Pächter und zertifizierter KI-Spezialist. Er digitalisiert Gastrobetriebe in der Schweiz."
      />
      <section className="pt-10 pb-24 md:pt-16">
        <div className="container-x grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20 items-center">
          <Reveal className="relative max-w-md mx-auto w-full lg:max-w-none">
            <div className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[2.5rem] bg-accent" />
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-[#8d9298]">
              <img src="/assets/img/v2/thomas.webp" alt="Thomas Ballinari" className="w-full h-full object-cover object-top" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-5">Über mich</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">Vom Koch zum <span className="text-forest">KI-Spezialisten</span></h1>
            <div className="mt-7 space-y-5 text-lg text-anthrazit/75 leading-relaxed">
              <p>
                Ich bin Thomas Ballinari. Als gelernter Koch, Küchenchef und langjähriger Pächter eines grossen Landgasthofs kenne ich den Gastro-Alltag aus erster Hand: Hektik im Service, Personalnot und lange Abende mit Excel-Tabellen.
              </p>
              <p>
                Heute führe ich als zertifizierter KI-Spezialist mit <SmartGastroText /> Kassensysteme, digitale Speisekarten, Kalkulation und KI-Lösungen in Schweizer Gastrobetrieben ein. So, dass sie im Stress auch wirklich funktionieren.
              </p>
            </div>
            <blockquote className="mt-8 border-l-4 border-accent pl-6 font-display text-xl md:text-2xl leading-snug">
              «Ich will, dass Gastronominnen und Gastronomen wieder Gastgeber sein können, präsent im Gastraum und kreativ in der Küche.»
            </blockquote>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to={CONTACT_HREF} className="btn-primary">Erstgespräch buchen <ArrowRight size={18} /></Link>
              <a href={`mailto:${BRAND.email}`} className="btn-ghost"><Mail size={18} /> {BRAND.email}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-linie">
        <div className="container-x">
          <p className="eyebrow mb-4">Mein Weg</p>
          <h2 className="h-section max-w-2xl">Vom Herd zur KI, mit dem Gast immer im Blick.</h2>
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PATH.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <li className="h-full rounded-2xl bg-hellgrau p-7">
                  <span className="w-11 h-11 rounded-xl bg-forest text-white flex items-center justify-center">{p.icon}</span>
                  <h3 className="text-xl mt-5">{p.title}</h3>
                  <p className="mt-2 text-anthrazit/65 leading-relaxed">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Lernen wir uns kennen." text="Ein Gespräch unter Gastronomen, kostenlos und unverbindlich." />
    </>
  );
}
