import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#awards", label: "Awards" },
  { href: "#experience", label: "Experience" },
  { href: "#techstack", label: "Tech Stack" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const activeSection = useScrollSpy(
    navLinks.map(link => link.href.substring(1)),
    { offsetTop: 100 }
  );

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    
    // Scroll to the section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      
      // Update URL hash without page jump
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${isScrolled 
        ? 'bg-dark/80 backdrop-blur-md py-2 shadow-md' 
        : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 
            className="text-2xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 cursor-pointer"
            onClick={() => setLocation("/")}
          >
            PKB
          </h1>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative hover:text-primary transition-colors py-2
                    ${activeSection === link.href.substring(1) ? 'text-primary' : 'text-slate-300'}
                    after:content-[''] after:absolute after:-bottom-1 after:left-0 
                    after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-pink-500 
                    after:transition-all after:duration-300
                    ${activeSection === link.href.substring(1) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                  `}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-slate-900/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
        mobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
      }`}>
        <ul className="flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`transition-colors ${
                  activeSection === link.href.substring(1) ? 'text-primary' : 'text-slate-300 hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
