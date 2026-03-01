import { Link } from 'react-router-dom';
import { BRAND, NAV_LINKS } from '../constants';
import SmartGastroText from './SmartGastroText';

export default function Footer() {
  return (
    <footer className="bg-hellgrau pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <Link to="/" className="text-2xl">
              <SmartGastroText />
            </Link>
            <p className="text-sm text-anthrazit/70 leading-relaxed">
              Digitale Lösungen für die Gastronomie der Zukunft. Wir machen Gastgeber wieder zu Gastgebern.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-6">Kontakt</h4>
            <ul className="space-y-3 text-sm text-anthrazit/70">
              <li>{BRAND.location}</li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="hover:text-primary transition-colors">
                  {BRAND.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="grid grid-cols-1 gap-3 text-sm text-anthrazit/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/ueber" className="hover:text-primary transition-colors">Über <SmartGastroText className="text-sm" /></Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-6">Rechtliches</h4>
            <ul className="space-y-3 text-sm text-anthrazit/70">
              <li><Link to="/impressum" className="hover:text-primary transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="hover:text-primary transition-colors">Datenschutz</Link></li>
              <li><Link to="/sicherheit" className="hover:text-primary transition-colors">Sicherheit</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-anthrazit/50">
          <p>© {new Date().getFullYear()} <SmartGastroText className="text-xs" />. Alle Rechte vorbehalten.</p>
          <p className="mt-2 md:mt-0">Entwickelt für die Schweizer Gastronomie.</p>
        </div>
      </div>
    </footer>
  );
}
