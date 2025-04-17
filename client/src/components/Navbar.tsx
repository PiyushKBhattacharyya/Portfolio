import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { Menu, X } from 'lucide-react';

// Define the navigation links for easy reference
const navigationLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#awards", label: "Awards" },
  { href: "#experience", label: "Experience" },
  { href: "#techstack", label: "Tech Stack" },
];

export default function Navbar() {
  // State for handling mobile menu and scroll behavior
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use 'useLocation' hook to handle navigation
  const [, setLocation] = useLocation();

  // Use 'useScrollSpy' hook to track the active section based on the scroll position
  const activeSection = useScrollSpy(
    navigationLinks.map(link => link.href.substring(1)), // Extract section IDs from hrefs
    { offsetTop: 100 } // Adjust the offset for active section tracking
  );

  // Effect to track scroll position and modify navbar appearance
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change navbar style after scrolling 50px
    };

    // Attach scroll event listener
    window.addEventListener('scroll', onScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle navigation click to scroll to the respective section and update the URL
  const handleNavigationClick = (href: string) => {
    setIsMobileMenuOpen(false); // Close the mobile menu on click

    const targetElement = document.querySelector(href); // Find the element to scroll to
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      // Update the URL hash without causing a page reload
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled 
          ? 'bg-dark/80 backdrop-blur-md py-2 shadow-md' // Apply dark background on scroll
          : 'bg-transparent py-4'}`} // Transparent background when at the top
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Home Navigation */}
        <div>
          <h1 
            className="text-2xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 cursor-pointer"
            onClick={() => setLocation("/")} // Navigate to homepage
          >
            PKB
          </h1>
        </div>
        
        {/* Desktop navigation menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigationClick(link.href); // Handle smooth scrolling on click
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
        
        {/* Mobile menu toggle button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu visibility
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />} {/* Show close icon when menu is open */}
        </button>
      </div>
      
      {/* Mobile navigation menu */}
      <div className={`md:hidden bg-slate-900/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
      }`}>
        <ul className="flex flex-col items-center space-y-4">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigationClick(link.href); // Handle smooth scrolling on click
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