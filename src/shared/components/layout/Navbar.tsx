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

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navLinks = [
    { 
      name: 'About', 
      path: '/about',
      hasDropdown: false 
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
      name: 'Team', 
      path: '/team',
      hasDropdown: false 
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
            <Logo variant="default" />
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
                        onClick={() => toggleDropdown(link.name)}
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
                      className={`text-gray-800 font-heading font-medium hover:text-accent-orange hover:bg-accent-orange/5 py-2 px-3 rounded-md transition-all duration-150 block ${isScrolled ? 'text-gray-800' : 'text-white'}`}
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
              className={`${isScrolled ? 'text-gray-800' : 'text-white'}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <button
                    className="block w-full text-left px-3 py-2 text-base font-heading font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-orange"
                    onClick={() => toggleDropdown(link.name)}
                  >
                    <div className="flex justify-between items-center">
                      {link.name}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className="block w-full text-left px-3 py-2 text-base font-heading font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-orange"
                  >
                    {link.name}
                  </Link>
                )}
                
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="pl-4 pb-2 border-l-2 border-primary ml-3 mt-1">
                    {link.sections?.map((section, idx) => (
                      <div key={idx} className="mb-2">
                        <h3 className="px-3 py-1 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                          {section.title}
                        </h3>
                        {section.items.map((item) => (
                          <Link 
                            key={item.name}
                            to={item.path}
                            className="block py-2 px-3 text-sm font-heading text-gray-600 hover:text-accent-orange hover:bg-accent-orange/5 rounded transition-all duration-150"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="block w-full text-center bg-primary text-white px-3 py-2 rounded hover:bg-opacity-90 transition duration-300 mt-2 font-heading"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;