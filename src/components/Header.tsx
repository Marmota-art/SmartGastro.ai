import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { NAV_LINKS, BRAND } from '../constants';
import SmartGastroText from './SmartGastroText';
import { useShop } from '../context/ShopContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useShop();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const scrollToContact = () => {
    const element = document.getElementById('kontakt');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      window.location.href = '/#kontakt';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <SmartGastroText className="text-2xl" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-anthrazit/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={scrollToContact}
              className="text-sm font-medium text-anthrazit/80 hover:text-primary transition-colors"
            >
              Kontakt
            </button>
            <Link to="/warenkorb" className="relative p-2 text-anthrazit hover:text-primary transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-anthrazit text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/warenkorb" className="relative p-2 text-anthrazit hover:text-primary transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-anthrazit text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-anthrazit hover:text-primary transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-black/5 absolute w-full left-0 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-4 text-base font-medium text-anthrazit hover:bg-hellgrau rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={scrollToContact}
              className="block w-full text-left px-3 py-4 text-base font-medium text-anthrazit hover:bg-hellgrau rounded-lg"
            >
              Kontakt
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
