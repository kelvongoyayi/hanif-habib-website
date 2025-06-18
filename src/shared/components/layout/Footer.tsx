import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white/80 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo variant="white" />
            </div>
            <p className="text-white/70 mb-4 max-w-md">
              Professional accounting, audit and advisory services tailored to help your business succeed.
            </p>
            <div className="flex items-center text-white/70 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">123 Business Avenue, Dar es Salaam, Tanzania</span>
            </div>
            <div className="flex items-center text-white/70 mb-2">
              <Phone className="h-4 w-4 mr-2" />
              <a href="tel:+255123456789" className="text-sm hover:text-white transition duration-300">+255 123 456 789</a>
            </div>
            <div className="flex items-center text-white/70">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:info@hanifhabib.co.tz" className="text-sm hover:text-white transition duration-300">info@hanifhabib.co.tz</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium mb-4 text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/70 text-sm hover:text-white transition duration-300">About Us</Link></li>
              <li><Link to="/services" className="text-white/70 text-sm hover:text-white transition duration-300">Our Services</Link></li>
              <li><Link to="/industries" className="text-white/70 text-sm hover:text-white transition duration-300">Industries</Link></li>
              <li><Link to="/resources" className="text-white/70 text-sm hover:text-white transition duration-300">Resources</Link></li>
              <li><Link to="/contact" className="text-white/70 text-sm hover:text-white transition duration-300">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter simplified */}
          <div>
            <h3 className="text-sm uppercase tracking-wider font-medium mb-4 text-white/90">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-3">Subscribe to our newsletter for updates and insights.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 bg-white/10 text-white border border-white/20 rounded-l text-sm w-full focus:outline-none focus:ring-1 focus:ring-white placeholder-white/50" 
              />
              <button 
                type="submit" 
                className="bg-white text-primary px-4 py-2 rounded-r text-sm hover:bg-opacity-90 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer - Minimal */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-xs">
            &copy; {currentYear} Hanif Habib & Cco. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-white/60 text-xs hover:text-white transition duration-300">Privacy</Link>
            <Link to="/terms-of-service" className="text-white/60 text-xs hover:text-white transition duration-300">Terms</Link>
            <Link to="/sitemap" className="text-white/60 text-xs hover:text-white transition duration-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;