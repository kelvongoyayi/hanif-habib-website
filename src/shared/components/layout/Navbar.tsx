import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = [
    { 
      name: 'Home', 
      path: '/',
      hasDropdown: false
    },
    { 
      name: 'About', 
      path: '/about',
      hasDropdown: true,
      sections: [
        {
          title: 'Company',
          items: [
            { name: 'About Us', path: '/about' },
            { name: 'Our Team', path: '/team' }
          ]
        }
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      hasDropdown: true,
      sections: [
        {
          title: 'Audit & Assurance',
          items: [
            { name: 'Audit Services', path: '/services/audit' },
            { name: 'Special Reviews & Investigations', path: '/services/investigations' }
          ]
        },
        {
          title: 'Business Services',
          items: [
            { name: 'Book Keeping & Accounting', path: '/services/accounting' },
            { name: 'Company Secretarial', path: '/services/secretarial' },
            { name: 'Virtual CFO', path: '/services/cfo' },
            { name: 'Transaction Services', path: '/services/transactions' }
          ]
        },
        {
          title: 'Tax Services',
          items: [
            { name: 'Taxation', path: '/services/taxation' },
            { name: 'Tax Litigation', path: '/services/tax-litigation' }
          ]
        },
        {
          title: 'Advisory Services',
          items: [
            { name: 'Business Plans', path: '/services/business-plans' },
            { name: 'Corporate Training', path: '/services/training' },
            { name: 'Company Setup', path: '/services/company-setup' }
          ]
        }
      ]
    },
    {
      name: 'Calculator',
      path: '/calculator',
      hasDropdown: true,
      sections: [
        {
          title: 'Financial Tools',
          items: [
            { name: 'Overtime Calculator', path: '/calculator/overtime' },
            { name: 'Tax Planning Tools', path: '/calculator/tax-planning' },
            { name: 'Budget Impact Simulator', path: '/calculator/budget-impact' }
          ]
        }
      ]
    },
    { 
      name: 'Resources', 
      path: '/resources',
      hasDropdown: true,
      sections: [
        {
          title: 'Publications & Insights',
          items: [
            { name: 'All Resources', path: '/resources' },
            { name: 'Media Coverage', path: '/resources?category=media' },
            { name: 'Tax Guides', path: '/resources?category=guides' },
            { name: 'Forms & Templates', path: '/resources?category=forms' },
            { name: 'Expert Articles', path: '/resources?category=articles' }
          ]
        },
        {
          title: 'Tools & Multimedia',
          items: [
            { name: 'Financial Calculators', path: '/calculator' },
            { name: 'Video Resources', path: '/resources?category=videos' }
          ]
        }
      ]
    },
    { 
      name: 'Awards', 
      path: '/awards',
      hasDropdown: false
    },
    { 
      name: 'Contact', 
      path: '/contact',
      hasDropdown: false
    }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo variant={isScrolled ? "default" : "white"} />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  {link.hasDropdown ? (
                    <div className="relative inline-block text-left group">
                      <button 
                        className={`text-gray-800 font-heading font-medium group-hover:text-accent-orange flex items-center py-2 px-3 rounded-md transition-all duration-150 ${isScrolled ? 'text-gray-800' : 'text-white'} hover:bg-accent-orange/5`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDropdown(link.name);
                        }}
                        onMouseEnter={() => {
                          setActiveDropdown(link.name);
                        }}
                      >
                        {link.name}
                        <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180`} />
                      </button>
                      
                      {/* Dropdown menu */}
                      <div 
                        className={`
                          absolute left-0 mt-1 w-64 rounded-md shadow-lg bg-white border border-gray-100 
                          transition-all duration-200 transform origin-top-left
                          ${activeDropdown === link.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                        `}
                        onMouseEnter={() => setActiveDropdown(link.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="absolute top-0 left-5 -mt-2 w-3 h-3 bg-white transform rotate-45 border-t border-l border-gray-100"></div>
                        <div className="py-2 relative z-10 rounded-md bg-white overflow-hidden">
                          {link.sections?.map((section, idx) => (
                            <div key={idx} className="py-2">
                              <h3 className="px-4 py-1 text-xs uppercase tracking-wider text-gray-500 font-semibold bg-gray-50">
                                {section.title}
                              </h3>
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    // Force scroll to top for same-page navigation
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                  className="block px-4 py-2 text-sm font-heading text-gray-700 hover:bg-gray-50 hover:text-accent-orange transition-colors duration-150"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={link.path}
                      className={`text-gray-800 font-heading font-medium hover:text-accent-orange hover:bg-accent-orange/5 py-2 px-3 rounded-md transition-all duration-150 flex items-center ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <Link 
              to="/contact" 
              className={`inline-flex items-center border-2 px-6 py-3 transition-all duration-300 font-heading ${
                isScrolled 
                  ? 'border-primary text-primary hover:bg-primary hover:text-white' 
                  : 'border-white text-white hover:bg-white hover:text-primary'
              } font-medium`}
            >
              <Phone className="mr-2 h-4 w-4" />
              Book a Call
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              className={`${isScrolled ? 'text-gray-800' : 'text-white'} p-2`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Fullscreen */}
      <div 
        className={`
          lg:hidden fixed inset-0 bg-white z-50 transition-all duration-300 transform
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <Link to="/" onClick={closeMobileMenu}>
              <Logo variant="colored" />
            </Link>
            <button
              className="text-gray-800 p-2"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        className="flex justify-between items-center w-full px-4 py-3 text-left text-lg font-heading font-medium text-gray-800 hover:bg-gray-50 hover:text-accent-orange rounded-lg transition-colors duration-150"
                        onClick={() => toggleDropdown(link.name)}
                      >
                        <span className="flex items-center">
                          {link.name}
                        </span>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {activeDropdown === link.name && (
                        <div className="mt-2 ml-4 pl-4 border-l-2 border-gray-200">
                          {link.sections?.map((section, idx) => (
                            <div key={idx} className="mb-4">
                              <h3 className="px-4 py-2 text-sm uppercase tracking-wider text-gray-500 font-semibold">
                                {section.title}
                              </h3>
                              {section.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={closeMobileMenu}
                                  className="block py-2 px-4 text-base font-heading text-gray-600 hover:text-accent-orange hover:bg-accent-orange/5 rounded-lg transition-all duration-150"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={closeMobileMenu}
                      className="flex items-center px-4 py-3 text-lg font-heading font-medium text-gray-800 hover:bg-gray-50 hover:text-accent-orange rounded-lg transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile CTA */}
          <div className="p-4 border-t border-gray-100">
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300 font-heading font-medium"
            >
              <Phone className="mr-2 h-5 w-5" />
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;