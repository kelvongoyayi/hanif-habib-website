import React, { useState, useRef } from 'react';
import SectionTitle from '../../../shared/components/layout/SectionTitle';
import { ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver';

const ClientSectors = () => {
  // State for animations and interactions
  const [activeSector, setActiveSector] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Use shared intersection observer hook
  const { isIntersecting: isInView, ref: sectionRef } = useIntersectionObserver();

  // Sector data
  const sectors = [
    {
      name: 'Mining & Resources',
      description: 'Specialized services for mining operations and resource extraction companies.',
      image: 'https://images.pexels.com/photos/1006115/pexels-photo-1006115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      stats: { clients: '35+', years: '12+' }
    },
    {
      name: 'Financial Services',
      description: 'Expert solutions for banks, insurance, and financial institutions.',
      image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      stats: { clients: '40+', years: '15+' }
    },
    {
      name: 'Education',
      description: 'Comprehensive accounting and advisory for educational institutions.',
      image: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      stats: { clients: '25+', years: '10+' }
    },
    {
      name: 'Real Estate',
      description: 'Specialized tax and accounting services for property developers and managers.',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      stats: { clients: '30+', years: '8+' }
    },
    {
      name: 'NGOs & Non-Profits',
      description: 'Tailored services for non-governmental and charitable organizations.',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      stats: { clients: '45+', years: '14+' }
    },
    {
      name: 'FMCG & Retail',
      description: 'Financial solutions for fast-moving consumer goods and retail businesses.',
      image: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      stats: { clients: '50+', years: '11+' }
    }
  ];

  // Handle sector change with smooth transitions
  const changeSector = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Simple fade transition
    setTimeout(() => {
      setActiveSector(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 50);
  };

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      changeSector(index);
    }
  };

  // Navigate to previous/next sector
  const navigateSector = (direction: 'next' | 'prev') => {
    const newIndex = direction === 'next'
      ? (activeSector + 1) % sectors.length
      : (activeSector - 1 + sectors.length) % sectors.length;
    
    changeSector(newIndex);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
      aria-labelledby="sectors-section-title"
    >
      {/* Screen reader announcement element */}
      <div 
        id="sector-announcement" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gray-50" aria-hidden="true"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent-orange/5" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 mb-16 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle
            id="sectors-section-title"
            title="Industries We Serve"
            subtitle="Our expertise spans across key sectors, tailored to your unique needs"
            centered={true}
          />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left side: Sector list */}
          <div className={`lg:w-1/3 transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="bg-white border border-gray-100 p-6 h-full">
              <h3 className="text-xl font-heading font-bold mb-6 text-primary">Select an Industry</h3>
              
              <ul className="space-y-3" role="tablist">
                {sectors.map((sector, index) => (
                  <li key={index}>
                    <button
                      role="tab"
                      id={`sector-tab-${index}`}
                      aria-selected={activeSector === index}
                      aria-controls={`sector-panel-${index}`}
                      className={`w-full text-left py-4 px-4 flex items-center justify-between transition-all duration-300 
                        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        activeSector === index 
                          ? 'bg-primary/5 border-l-4 border-primary text-primary font-medium' 
                          : 'hover:bg-gray-50 text-gray-700 hover:text-primary-dark border-l-4 border-transparent'
                      }`}
                      onClick={() => changeSector(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      disabled={isTransitioning}
                    >
                      <span className="font-medium">
                        {sector.name}
                      </span>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activeSector === index ? 'bg-primary-dark/10' : 'opacity-0 group-hover:opacity-100'
                      }`}>
                        <ChevronRight className={`h-4 w-4 text-primary transition-transform duration-300 ${
                          activeSector === index ? 'translate-x-0.5' : ''
                        }`} />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link 
                  to="/industries" 
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-all duration-300 group/link"
                >
                  <span>Explore all industries</span>
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right side: Large interactive visual */}
          <div 
            className={`lg:w-2/3 transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div 
              ref={imageContainerRef}
              className="bg-white border border-gray-100 overflow-hidden transition-all duration-500 transform h-full opacity-100 scale-100"
            >
              {sectors.map((sector, index) => (
                <div 
                  key={index}
                  id={`sector-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`sector-tab-${index}`}
                  aria-hidden={activeSector !== index}
                  className={`relative transition-opacity duration-300 ${
                    activeSector === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ display: activeSector === index ? 'block' : 'none' }}
                >
                  <div className="relative h-[600px] md:h-[650px] group overflow-hidden">
                    {/* Large image with lazy loading */}
                    <img 
                      src={sector.image} 
                      alt={`${sector.name} industry visual representation`}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
                      <div className="transform transition-all duration-500 group-hover:translate-y-[-10px]">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{sector.name}</h2>
                        
                        <p className="text-white/90 text-lg mb-8 max-w-xl leading-relaxed">
                          {sector.description}
                        </p>
                        
                        {/* Stats */}
                        <div className="flex gap-8">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-accent-orange mb-1 animate-pulse-slow">
                              {sector.stats.clients}
                            </div>
                            <div className="text-sm text-white/80">Clients Served</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-accent-orange mb-1 animate-pulse-slow" style={{ animationDelay: '1s' }}>
                              {sector.stats.years}
                            </div>
                            <div className="text-sm text-white/80">Years Experience</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Interactive navigation elements */}
                    <div className="absolute top-4 right-4 p-4">
                      <div className="flex space-x-2">
                        {sectors.map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-3 h-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                              activeSector === idx ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                            }`}
                            onClick={() => changeSector(idx)}
                            aria-label={`View ${sectors[idx].name} sector`}
                            aria-current={activeSector === idx}
                            disabled={isTransitioning}
                          ></button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Large screen navigation arrows */}
                    <div className="hidden md:block">
                      <button 
                        onClick={() => navigateSector('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Previous sector"
                        disabled={isTransitioning}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      
                      <button 
                        onClick={() => navigateSector('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
                        aria-label="Next sector"
                        disabled={isTransitioning}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Mobile navigation (visible only on small screens) */}
              <div className="flex justify-between items-center p-4 md:hidden bg-gray-50">
                <button
                  onClick={() => navigateSector('prev')}
                  className="p-2 text-primary/70 hover:text-primary transition-all duration-300 focus:outline-none"
                  aria-label="Previous industry"
                  disabled={isTransitioning}
                >
                  <ChevronLeft className="h-5 w-5 text-primary" />
                </button>
                
                <div className="text-sm font-medium text-gray-600">
                  {activeSector + 1} / {sectors.length}
                </div>
                
                <button
                  onClick={() => navigateSector('next')}
                  className="p-2 text-primary/70 hover:text-primary transition-all duration-300 focus:outline-none"
                  aria-label="Next industry"
                  disabled={isTransitioning}
                >
                  <ChevronRight className="h-5 w-5 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSectors;