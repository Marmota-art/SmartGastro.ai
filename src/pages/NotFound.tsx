import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { NAV_LINKS, CONTACT_HREF } from '../constants';

/** Wird für unbekannte Adressen angezeigt. Netlify liefert dazu den Status 404 (siehe public/_redirects). */
export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <PageMeta title="Seite nicht gefunden" description="Diese Seite gibt es auf smartgastro.ai nicht (mehr)." />
      <div className="container-x max-w-2xl">
        <p className="eyebrow mb-4">Fehler 404</p>
        <h1 className="text-4xl sm:text-5xl leading-[1.05]">Diese Seite gibt es nicht (mehr).</h1>
        <p className="lead mt-6">
          Vielleicht hat sich die Adresse geändert. Hier finden Sie weiter:
        </p>
        <ul className="mt-8 grid sm:grid-cols-2 gap-3">
          <li><Link to="/" className="card flex items-center justify-between p-5 font-semibold hover:border-forest/40 transition-colors">Startseite <ArrowRight size={18} /></Link></li>
          {NAV_LINKS.map((l) => (
            <li key={l.href}><Link to={l.href} className="card flex items-center justify-between p-5 font-semibold hover:border-forest/40 transition-colors">{l.name} <ArrowRight size={18} /></Link></li>
          ))}
        </ul>
        <Link to={CONTACT_HREF} className="btn-primary mt-10">Kostenloses Erstgespräch <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
