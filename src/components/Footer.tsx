import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV_LINKS, CONTACT_HREF } from '../constants';
import SmartGastroText from './SmartGastroText';

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-white/80">
      <div className="container-x pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="md:col-span-5">
            <Link to="/" aria-label="SmartGastro.ai – Startseite">
              <SmartGastroText dark className="text-2xl" />
            </Link>
            <p className="mt-5 max-w-sm leading-relaxed text-white/65">
              Kassensystem, Website, digitale Speisekarte und KI für Restaurants – alles aus einer Hand, umgesetzt von einem Koch, der den Alltag kennt.
            </p>
            <Link to={CONTACT_HREF} className="btn-accent mt-8 !py-3 text-sm">
              Kostenloses Erstgespräch <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-white/45 mb-5">Navigation</h2>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-accent transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-white/45 mb-5">Kontakt</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-accent mt-0.5 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-accent transition-colors">{BRAND.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                <span>{BRAND.location}, Schweiz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-white/45">
          <p>© {new Date().getFullYear()} SmartGastro.ai · Thomas Ballinari · Entwickelt für die Schweizer Gastronomie.</p>
          <ul className="flex gap-6">
            <li><Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link></li>
            <li><Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link></li>
            <li><Link to="/sicherheit" className="hover:text-white transition-colors">Sicherheit</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
