import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'Solutions', path: '/#solutions' },
    { name: 'Case Studies', path: '/#case-studies' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-navy-900 py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BarChart2 className={`h-8 w-8 ${isScrolled ? 'text-navy-900' : 'text-gold-500'}`} />
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-navy-900' : 'text-white'}`}>
            Nexiora<span className={isScrolled ? 'text-gold-600' : 'text-gold-500'}>.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path.startsWith('/#') && location.pathname === '/' ? link.path.substring(1) : link.path}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-navy-900' : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/book-consultation"
            className={`px-5 py-2.5 rounded text-sm font-semibold transition-all ${
              isScrolled 
                ? 'bg-navy-900 text-white hover:bg-navy-800' 
                : 'bg-gold-500 text-navy-900 hover:bg-gold-400'
            }`}
          >
            Book Consultation
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-navy-900' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-navy-900' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col px-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 text-navy-900 font-medium border-b border-gray-100"
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/book-consultation"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 text-center bg-navy-900 text-white py-3 rounded font-medium"
          >
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
