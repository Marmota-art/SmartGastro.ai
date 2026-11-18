import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { NAV_LINKS, CONTACT_HREF } from '../constants';
import SmartGastroText from './SmartGastroText';
import { useShop } from '../context/ShopContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useShop();
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 rounded-full text-sm font-medium transition-colors ${
      isActive ? 'text-forest bg-forest/[0.07]' : 'text-anthrazit/75 hover:text-anthrazit'
    }`;

  const CartLink = (
    <Link to="/warenkorb" aria-label={`Warenkorb${cartCount ? `, ${cartCount} Artikel` : ''}`} className="relative p-2 rounded-full text-anthrazit/80 hover:text-anthrazit hover:bg-black/5 transition-colors">
      <ShoppingBag size={20} />
      {cartCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-accent text-anthrazit text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-creme/90 backdrop-blur-md border-b border-linie' : 'bg-creme/0 border-b border-transparent'}`}>
      <div className="container-x">
        <div className="flex justify-between items-center h-[72px] gap-4">
          <Link to="/" aria-label="SmartGastro.ai Startseite" className="shrink-0">
            <SmartGastroText className="text-[22px]" />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} to={link.href} className={linkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            {cartCount > 0 && CartLink}
            <Link to={CONTACT_HREF} className="btn-primary !py-2.5 !px-5 text-sm">
              Erstgespräch buchen <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            {cartCount > 0 && CartLink}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              aria-label={isOpen ? 'Menü schliessen' : 'Menü öffnen'}
              className="p-2 rounded-full text-anthrazit hover:bg-black/5 transition-colors"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-nav" className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-creme overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="container-x pt-4 pb-10 flex flex-col">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => `py-4 border-b border-linie font-display text-2xl font-semibold ${isActive ? 'text-forest' : 'text-anthrazit'}`}
              >
                {link.name}
              </NavLink>
            ))}
            <Link to={CONTACT_HREF} className="btn-primary mt-8 text-base">
              Kostenloses Erstgespräch <ArrowRight size={18} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
