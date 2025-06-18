import React from 'react';
import { CalendarCheck, Phone } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left column - Text content */}
          <div className="lg:w-2/5">
            <div className="pr-0 lg:pr-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
                Transform Your Financial Strategy
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Expert team ready to help your business thrive with tailored financial solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact"
                  className="border-2 border-white bg-white text-primary hover:bg-transparent hover:text-white px-6 py-3 transition-all duration-300 flex items-center justify-center font-heading font-medium w-full sm:w-auto"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </a>
                <a 
                  href="/schedule"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-6 py-3 transition-all duration-300 flex items-center justify-center font-heading font-medium"
                >
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  Schedule Call
                </a>
              </div>
            </div>
          </div>
          
          {/* Right column - Contact Form */}
          <div className="lg:w-3/5 w-full">
            <div className="bg-white shadow-xl p-8 max-w-full mx-auto rounded-lg">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 text-center">
                Get Expert Financial Guidance
              </h3>
              <form className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text" 
                      id="name" 
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-sm rounded-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel" 
                      id="phone" 
                      className="w-full px-3 py-2 border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-sm rounded-none"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-sm rounded-none"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service
                  </label>
                  <select
                    id="service" 
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-sm rounded-none"
                  >
                    <option value="">Select service</option>
                    <option value="audit">Audit</option>
                    <option value="taxation">Taxation</option>
                    <option value="accounting">Accounting</option>
                    <option value="cfo">Virtual CFO</option>
                    <option value="business-setup">Business Setup</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message" 
                    rows={2} 
                    className="w-full px-3 py-2 border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-sm rounded-none"
                    placeholder="Brief description of your needs"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-opacity-90 text-white py-3 transition duration-300 font-heading font-medium text-sm rounded"
                  > 
                    Request Callback
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;