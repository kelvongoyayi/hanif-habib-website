import React, { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../shared/components/layout/SectionTitle';
import { ArrowRight, Shield, TrendingUp, Briefcase, Scale, Calculator, FileText, Building, Search, CheckCircle, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../shared/hooks/useIntersectionObserver';
import { useDebounce } from '../../shared/hooks/usePerformance';

const ServiceHighlights = () => {
  // State and refs
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeService, setActiveService] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Use shared intersection observer hook
  const { isIntersecting: isInView, ref: sectionRef } = useIntersectionObserver();
  
  // Use debounced search for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'audit', label: 'Audit & Assurance' },
    { id: 'business', label: 'Business Services' },
    { id: 'tax', label: 'Tax Services' },
    { id: 'advisory', label: 'Advisory Services' }
  ];

  // Service data with additional metadata
  const services = [
    {
      title: 'Audit Services',
      description: 'Comprehensive internal and external audit services with CIA-backed processes for maximum reliability.',
      icon: <Shield className="h-10 w-10 text-primary" />,
      link: '/services/audit',
      category: 'audit',
      image: 'https://images.pexels.com/photos/7681522/pexels-photo-7681522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Internal Audit', 'External Audit', 'Compliance Review']
    },
    {
      title: 'Special Reviews & Investigations',
      description: 'Specialized investigation services to identify risks, fraud, and compliance issues.',
      icon: <Search className="h-10 w-10 text-accent-red" />,
      link: '/services/investigations',
      category: 'audit',
      image: 'https://images.pexels.com/photos/6863250/pexels-photo-6863250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Fraud Investigation', 'Due Diligence', 'Compliance Reviews']
    },
    {
      title: 'Book Keeping & Accounting',
      description: 'Expert bookkeeping and accounting services with modern software systems integration.',
      icon: <Calculator className="h-10 w-10 text-accent-orange" />,
      link: '/services/accounting',
      category: 'business',
      image: 'https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Bookkeeping', 'Financial Statements', 'Software Setup']
    },
    {
      title: 'Company Secretarial',
      description: 'Professional company secretarial services to ensure corporate compliance and governance.',
      icon: <FileText className="h-10 w-10 text-primary" />,
      link: '/services/secretarial',
      category: 'business',
      image: 'https://images.pexels.com/photos/8297478/pexels-photo-8297478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Corporate Governance', 'Compliance', 'Board Support']
    },
    {
      title: 'Virtual CFO',
      description: 'Strategic financial leadership, planning and management without the cost of a full-time executive.',
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      link: '/services/cfo',
      category: 'business',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Financial Strategy', 'Business Planning', 'Performance Analysis']
    },
    {
      title: 'Transaction Services',
      description: 'Specialized support for mergers, acquisitions, due diligence and complex business transactions.',
      icon: <Briefcase className="h-10 w-10 text-accent-red" />,
      link: '/services/transactions',
      category: 'business',
      image: 'https://images.pexels.com/photos/7821738/pexels-photo-7821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Due Diligence', 'Valuation', 'Deal Structure']
    },
    {
      title: 'Taxation',
      description: 'Expert tax planning, compliance and advisory services to optimize your tax position.',
      icon: <FileText className="h-10 w-10 text-accent-orange" />,
      link: '/services/taxation',
      category: 'tax',
      image: 'https://images.pexels.com/photos/6863254/pexels-photo-6863254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Tax Planning', 'VAT Returns', 'International Tax']
    },
    {
      title: 'Tax Litigation',
      description: 'Professional representation and support in tax disputes and litigation matters.',
      icon: <Scale className="h-10 w-10 text-accent-red" />,
      link: '/services/tax-litigation',
      category: 'tax',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Dispute Resolution', 'Appeals', 'Tax Court']
    },
    {
      title: 'Business Plans',
      description: 'Strategic business planning services to help you achieve your growth objectives.',
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      link: '/services/business-plans',
      category: 'advisory',
      image: 'https://images.pexels.com/photos/7681926/pexels-photo-7681926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Strategic Planning', 'Financial Projections', 'Market Analysis']
    },
    {
      title: 'Corporate Training',
      description: 'Specialized training programs for finance, tax, and business management.',
      icon: <Users className="h-10 w-10 text-accent-orange" />,
      link: '/services/training',
      category: 'advisory',
      image: 'https://images.pexels.com/photos/7688334/pexels-photo-7688334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Finance Training', 'Tax Workshops', 'Management Skills']
    },
    {
      title: 'Company Setup',
      description: 'Complete guidance for establishing your business legally and efficiently.',
      icon: <Building className="h-10 w-10 text-accent-red" />,
      link: '/services/company-setup',
      category: 'advisory',
      image: 'https://images.pexels.com/photos/7821714/pexels-photo-7821714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      features: ['Registration', 'Licensing', 'Legal Structure']
    }
  ];

  // Filter services based on category and search query
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = debouncedSearchQuery === '' || 
      service.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Scroll handler for carousel
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollWidth, clientWidth } = carouselRef.current;
      const cardWidth = clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      
      let newPosition;
      if (direction === 'left') {
        newPosition = Math.max(0, scrollPosition - (cardWidth / 2));
      } else {
        newPosition = Math.min(maxScroll, scrollPosition + (cardWidth / 2));
      }
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };

  // Handle scroll position change from direct user scrolling
  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  // Lazy loading of images - simplified with shared hook
  useEffect(() => {
    if (isInView && carouselRef.current) {
      const cardElements = carouselRef.current.querySelectorAll('.service-card');
      cardElements.forEach((card) => {
        card.classList.add('loaded');
      });
    }
  }, [isInView, filteredServices]);

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Calculate if we can scroll left or right
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = carouselRef.current
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
    : false;

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gray-50 relative overflow-hidden"
      aria-labelledby="services-section-title"
    >
      {/* Background decorations */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-white opacity-70"
        aria-hidden="true"
      ></div>
      <div 
        className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary opacity-5"
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-32 left-10 w-40 h-40 rounded-full bg-accent-orange opacity-5"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle
            title={<span className="tracking-tight font-heading">Our Core Services</span>}
            subtitle="We offer a comprehensive range of professional services tailored to meet your business needs"
            centered={false}
          />
        </div>
        
        <div 
          className={`mb-12 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Category filters and navigation */}
          <div className="flex flex-wrap items-center gap-4 justify-between w-full">
            <div className="flex flex-wrap gap-2 justify-start flex-1">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 flex-1 sm:flex-none ${
                  selectedCategory === category.id 
                   ? 'bg-primary text-white shadow-md'
                   : 'bg-white text-gray-600 hover:text-primary hover:bg-white border border-gray-200'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filter by ${category.label}`}
              >
                {category.label}
              </button>
            ))}
            </div>
          </div>
        </div>
        
        {/* Services carousel with navigation */}
        <div className={`relative transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
          
          {/* Carousel */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-8 pt-4 -mx-4 px-4 hide-scrollbar"
          >
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <div 
                  key={index}
                  className={`service-card-wrapper transition-all duration-500 transform
                    ${isInView ? 'opacity-100' : 'opacity-0'}
                    min-w-[300px] w-[300px] md:min-w-[340px] md:w-[340px] snap-center
                  `}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div 
                    className={`
                      service-card bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 h-full relative z-10
                      ${activeService === index ? 'ring-2 ring-primary/30 translate-y-[-4px]' : 'hover:translate-y-[-4px]'} 
                      group h-full flex flex-col
                    `}
                    onMouseEnter={() => setActiveService(index)}
                    onMouseLeave={() => setActiveService(null)}
                    onFocus={() => setActiveService(index)}
                    onBlur={() => setActiveService(null)}
                    tabIndex={0}
                  >
                    {/* Image container */}
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={`${service.title} service`}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        loading="lazy"
                        width="340"
                        height="192"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent h-48 opacity-70"></div>
                      
                      {/* Service icon on image */}
                      <div className="absolute top-4 left-4 p-2.5 bg-white/90 rounded-lg shadow-md">
                        {service.icon}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="px-6 py-6 flex flex-col flex-grow">
                      {/* Service title with animated underline */}
                      <h3 className="text-xl font-heading font-bold mb-3 relative">
                        {service.title}
                      </h3>
                      
                      {/* Service description */}
                      <p className="text-gray-600 mb-6 tracking-wide leading-relaxed flex-grow text-sm">
                        {service.description}
                      </p>
                      
                      {/* Feature list with check icons */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-sans tracking-wide">
                            <CheckCircle className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Link to service detail */}
                    <div className="mt-auto border-t border-gray-100">
                      <Link 
                        to={service.link}
                        className="group/link flex items-center justify-between p-4 text-primary hover:text-primary-dark font-heading font-medium transition-colors duration-300 hover:bg-gray-50"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <span>Learn more</span>
                        <span className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/link:bg-primary/10">
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-20">
                <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
                <button 
                  className="mt-4 text-primary hover:text-primary-dark font-medium"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
          
          {/* Scroll indicator dots */}
          {filteredServices.length > 3 && (
            <div className="flex items-center justify-center mt-6 gap-4">
              <button 
                onClick={() => scroll('left')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  canScrollLeft 
                    ? 'bg-white text-primary hover:bg-gray-50 hover:text-primary-dark' 
                    : 'bg-white/50 text-gray-300'
                }`}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5 transition-transform" />
              </button>
              
              <div className="flex gap-1">
              {Array.from({ length: Math.ceil(filteredServices.length / 3) }).map((_, index) => {
                const isActive = carouselRef.current
                  ? scrollPosition >= (index * 320) && 
                    scrollPosition < ((index + 1) * 320)
                  : index === 0;
                
                return (
                  <button
                    key={index}
                    className={`w-2 h-2 transition-all duration-300 ${
                      isActive ? 'w-6 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => {
                      if (carouselRef.current) {
                        const newPosition = index * 320;
                        carouselRef.current.scrollTo({
                          left: newPosition,
                          behavior: 'smooth'
                        });
                        setScrollPosition(newPosition);
                      }
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={isActive}
                  ></button>
                );
              })}
              </div>
              
              <button 
                onClick={() => scroll('right')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  canScrollRight 
                    ? 'bg-white text-primary hover:bg-gray-50 hover:text-primary-dark' 
                    : 'bg-white/50 text-gray-300'
                }`}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5 transition-transform" />
              </button>
            </div>
          )}
        </div>
        
        {/* View all services CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <Link 
            to="/services" 
            className="inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 transition-all duration-300 font-heading font-medium group"
            aria-label="View all services"
          >
            <span>View All Services</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        
        {/* Benefits section */}
        <div 
          className={`mt-24 bg-white shadow-xl rounded-2xl p-8 lg:p-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Work with our certified professionals with years of industry experience.',
                icon: <Shield className="h-8 w-8 text-primary" />
              },
              {
                title: 'Tailored Solutions',
                description: 'Customized services that address your specific business challenges.',
                icon: <Scale className="h-8 w-8 text-accent-orange" />
              },
              {
                title: 'Ongoing Support',
                description: 'Continuous guidance and support throughout our engagement.',
                icon: <TrendingUp className="h-8 w-8 text-accent-red" />
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-6 rounded-xl bg-gray-50/50 transform transition-all duration-500 hover:scale-110 hover:shadow-lg hover:bg-primary/5 border border-gray-100">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 font-sans leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights; 