import React, { useState, useRef } from 'react';
import SectionTitle from '../../../shared/components/layout/SectionTitle';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver';

// Import award and affiliation images
import accaLogo from '../../../assets/images/ACCA.png';
import ciaLogo from '../../../assets/images/CIA.png';
import corporateIntlLogo from '../../../assets/images/CorporateINTL.png';
import iapaLogo from '../../../assets/images/IAPA International.jpg.jpeg';
import meaAwardLogo from '../../../assets/images/MEA-Business-Award-Winners-Logo-scaled.jpg.jpeg';
import saitLogo from '../../../assets/images/SAIT_NEWWW.png';
import taypaLogo from '../../../assets/images/Taypa-logo.png';
import wesLogo from '../../../assets/images/WES.png';

const Awards = () => {
  const { isIntersecting: isInView, ref: sectionRef } = useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState('certifications');
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [activeAffiliationIndex, setActiveAffiliationIndex] = useState(0);
  const certScrollRef = useRef<HTMLDivElement>(null);
  const affiliationScrollRef = useRef<HTMLDivElement>(null);

  // Certification data
  const certifications = [
    { name: 'ACCA', logo: accaLogo },
    { name: 'CIA', logo: ciaLogo },
    { name: 'SAIT', logo: saitLogo },
    { name: 'WES', logo: wesLogo }
  ];

  // Affiliation data
  const affiliations = [
    { name: 'IAPA International', logo: iapaLogo },
    { name: 'Taypa', logo: taypaLogo },
    { name: 'Corporate INTL', logo: corporateIntlLogo },
    { name: 'MEA Award', logo: meaAwardLogo }
  ];

  // Scroll certification carousel
  const scrollCertifications = (direction: 'prev' | 'next') => {
    if (certScrollRef.current) {
      const container = certScrollRef.current;
      const scrollAmount = container.offsetWidth / 2;
      
      if (direction === 'next') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setActiveCertIndex(prev => Math.min(prev + 1, certifications.length - 1));
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setActiveCertIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  // Scroll affiliations carousel
  const scrollAffiliations = (direction: 'prev' | 'next') => {
    if (affiliationScrollRef.current) {
      const container = affiliationScrollRef.current;
      const scrollAmount = container.offsetWidth / 2;
      
      if (direction === 'next') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setActiveAffiliationIndex(prev => Math.min(prev + 1, affiliations.length - 1));
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        setActiveAffiliationIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  return (
    <section ref={sectionRef} className={`py-20 bg-gray-50 transition-all duration-1000 ${
      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-32 bg-blue-50/50 rounded-bl-full" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-32 bg-orange-50/50 rounded-tr-full" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle
            id="awards-section-title"
            title="Awards & Certifications"
            subtitle="We're proud to be recognized for our commitment to excellence and professional standards"
            centered={true}
          />
        </div>
        
        {/* Tabs for switching between certifications and awards */}
        <div 
          className={`flex justify-center mb-10 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '200ms' }}
          role="tablist"
          aria-label="View certifications or awards"
        >
          <div className="bg-white rounded-md shadow-md p-1 flex">
            <button 
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex-1 sm:flex-none ${
                activeCategory === 'certifications' 
                  ? 'bg-[#0A0A2C] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory('certifications')}
              role="tab"
              aria-selected={activeCategory === 'certifications'}
              aria-controls="certifications-panel"
              id="certifications-tab"
            >
              Professional Certifications
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex-1 sm:flex-none ${
                activeCategory === 'affiliations'
                  ? 'bg-[#0A0A2C] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveCategory('affiliations')}
              role="tab"
              aria-selected={activeCategory === 'affiliations'}
              aria-controls="affiliations-panel"
              id="affiliations-tab"
            >
              Affiliations & Awards
            </button>
          </div>
        </div>
        
        {/* Certifications Panel */}
        <div 
          id="certifications-panel"
          role="tabpanel"
          aria-labelledby="certifications-tab"
          className={`transition-all duration-500 ease-in-out ${activeCategory === 'certifications' ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0 overflow-hidden'}`}
        >
          <div className="relative mb-16">
            {/* Certification logos */}
            <div 
              className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div 
                ref={certScrollRef}
                className="flex gap-8 overflow-x-auto hide-scrollbar py-6 px-2 -mx-2 snap-x"
              >
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    id={`cert-card-${index}`}
                    className="flex-none w-1/3 lg:w-1/5 snap-center transition-all duration-500 transform hover:scale-105"
                    tabIndex={0}
                    aria-label={`${cert.name} certification`}
                  >
                    <div className="flex flex-col items-center justify-center h-24">
                      <img 
                        src={cert.logo} 
                        alt={`${cert.name} logo`} 
                        className="h-full w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation controls */}
              <div className="flex justify-center mt-6 gap-4">
                <button 
                  onClick={() => scrollCertifications('prev')}
                  className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={activeCertIndex === 0}
                  aria-label="Previous certifications"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex gap-2">
                  {certifications.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-none transition-all duration-300 ${
                        activeCertIndex === index ? 'w-6 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => {
                        if (certScrollRef.current) {
                          const newPosition = index * (certScrollRef.current.offsetWidth / 3);
                          certScrollRef.current.scrollTo({
                            left: newPosition,
                            behavior: 'smooth'
                          });
                          setActiveCertIndex(index);
                        }
                      }}
                      aria-label={`Go to certification ${index + 1}`}
                      aria-current={activeCertIndex === index}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => scrollCertifications('next')}
                  className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={activeCertIndex === certifications.length - 1}
                  aria-label="Next certifications"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Affiliations Panel */}
        <div 
          id="affiliations-panel"
          role="tabpanel"
          aria-labelledby="affiliations-tab"
          className={`transition-all duration-500 ease-in-out ${activeCategory === 'affiliations' ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0 overflow-hidden'}`}
        >
          <div className="relative mb-16">
            {/* Affiliation logos */}
            <div 
              className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div 
                ref={affiliationScrollRef}
                className="flex gap-8 overflow-x-auto hide-scrollbar py-6 px-2 -mx-2 snap-x"
              >
                {affiliations.map((affiliation, index) => (
                  <div 
                    key={index}
                    id={`affiliation-card-${index}`}
                    className="flex-none w-1/3 lg:w-1/5 snap-center transition-all duration-500 transform hover:scale-105"
                    tabIndex={0}
                    aria-label={`${affiliation.name} affiliation`}
                  >
                    <div className="flex flex-col items-center justify-center h-24">
                      <img 
                        src={affiliation.logo} 
                        alt={`${affiliation.name} logo`} 
                        className="h-full w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation controls */}
              <div className="flex justify-center mt-6 gap-4">
                <button 
                  onClick={() => scrollAffiliations('prev')}
                  className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={activeAffiliationIndex === 0}
                  aria-label="Previous affiliations"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <div className="flex gap-2">
                  {affiliations.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-none transition-all duration-300 ${
                        activeAffiliationIndex === index ? 'w-6 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      onClick={() => {
                        if (affiliationScrollRef.current) {
                          const newPosition = index * (affiliationScrollRef.current.offsetWidth / 3);
                          affiliationScrollRef.current.scrollTo({
                            left: newPosition,
                            behavior: 'smooth'
                          });
                          setActiveAffiliationIndex(index);
                        }
                      }}
                      aria-label={`Go to affiliation ${index + 1}`}
                      aria-current={activeAffiliationIndex === index}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => scrollAffiliations('next')}
                  className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={activeAffiliationIndex === affiliations.length - 1}
                  aria-label="Next affiliations"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <Link 
            to="/about#credentials" 
            className="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 transition-all duration-300 font-heading font-medium group"
          >
            <span>View All Credentials</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Awards;