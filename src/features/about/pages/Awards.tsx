import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import ContentSection from '../../../shared/components/ui/ContentSection';
import SectionTitle from '../../../shared/components/layout/SectionTitle';
import { Star, Trophy, CheckCircle, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';

const Awards = () => {
  // State for animations and carousel
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeAward, setActiveAward] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Award data with actual images
  const awards = [
    {
      id: 'award1',
      title: 'Excellence in Professional Services 2023',
      organization: 'East African Business Excellence Awards',
      description: 'Recognized for exceptional professional services and client satisfaction across East Africa.',
      image: '/images/awards/Hanif-Award-1.jpg'
    },
    {
      id: 'award2',
      title: 'Most Innovative Accounting Firm 2022',
      organization: 'Finance Monthly Magazine',
      description: 'Awarded for innovative approaches to accounting services and technological integration.',
      image: '/images/awards/Hanif-Award-2.jpg'
    },
    {
      id: 'award3',
      title: 'Excellence in Client Service 2021',
      organization: 'Professional Services Awards',
      description: 'Recognized for outstanding client service, satisfaction and relationship management.',
      image: '/images/awards/Hanif-Award-3.jpg'
    },
    {
      id: 'award4',
      title: 'Top Financial Advisory Services 2020',
      organization: 'Tanzania Corporate Awards',
      description: 'Recognized as one of the top financial advisory firms in Tanzania.',
      image: '/images/awards/Hanif-Award-4.jpg'
    },
    {
      id: 'award5',
      title: 'Best Audit Firm 2019',
      organization: 'Accounting Excellence Awards',
      description: 'Awarded for outstanding audit services and compliance excellence.',
      image: '/images/awards/Hanif-Award-5.jpg'
    },
    {
      id: 'award6',
      title: 'Professional Achievement Award 2018',
      organization: 'Institute of Chartered Accountants',
      description: 'Recognized for professional excellence and contribution to the accounting profession.',
      image: '/images/awards/Hanif-Award-6.jpg'
    }
  ];

  // Industry experience data - updated with provided content
  const industryExperience = [
    'Mining – Mineral and Gas Exploration',
    'Fast Moving Consumer Goods (FMCG) Manufacturing',
    'Schools and Educational Institutions',
    'Law Firms',
    'Trading Organizations (Retail and Wholesale)',
    'Heavy Commercial Vehicles Importers',
    'Leasing Industry',
    'Micro Finance Companies',
    'Real Estate',
    'Vehicle Renting and Leasing Companies',
    'Advertising and Marketing Companies',
    'Import and Export Oriented Companies',
    'Human Resource Management Firms',
    'Insurance Broking',
    'Energy and Utilities',
    'Other Professional Services Firms',
    'Family Owned and Small Businesses',
    'Transport and Travel',
    'Non Banking Financial Institutions',
    'Commercial Banks',
    'International Quality Assurance and Standardization Service Companies'
  ];

  // Affiliations & Awards logos
  const affiliations = [
    {
      name: 'ACCA',
      description: 'Association of Chartered Certified Accountants',
      image: '/images/affiliations-awards/ACCA.png'
    },
    {
      name: 'CIA',
      description: 'Certified Internal Auditor',
      image: '/images/affiliations-awards/CIA.png'
    },
    {
      name: 'Corporate INTL',
      description: 'Corporate INTL Awards',
      image: '/images/affiliations-awards/CorporateINTL.png'
    },
    {
      name: 'IAPA International',
      description: 'International Association of Professional Accountants',
      image: '/images/affiliations-awards/IAPA International.jpg.jpeg'
    },
    {
      name: 'MEA Business Awards',
      description: 'Middle East & Africa Business Awards',
      image: '/images/affiliations-awards/MEA-Business-Award-Winners-Logo-scaled.jpg.jpeg'
    },
    {
      name: 'SAIT',
      description: 'South African Institute of Taxation',
      image: '/images/affiliations-awards/SAIT_NEWWW.png'
    },
    {
      name: 'TAYPA',
      description: 'Tanzania Association of Young Professional Accountants',
      image: '/images/affiliations-awards/Taypa-logo.png'
    },
    {
      name: 'WES',
      description: 'World Education Services',
      image: '/images/affiliations-awards/WES.png'
    }
  ];

  // Navigate the awards carousel
  const navigateAward = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    if (direction === 'next') {
      setActiveAward((prev) => (prev + 1) % awards.length);
    } else {
      setActiveAward((prev) => (prev - 1 + awards.length) % awards.length);
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        navigateAward('next');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    // Observe sections by their IDs
    const sections = ['awards-section', 'affiliations-section', 'experience-section', 'testimonials-section'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Page Header */}
      <PageHeader
        title="Awards & Recognition"
        subtitle="Celebrating our achievements and industry expertise across Tanzania and East Africa"
        backgroundImage="/images/awards/Hanif-Award-1.jpg"
      />

      {/* Awards Showcase */}
      <ContentSection 
        id="awards-section"
        bgColor="bg-white"
        centered={true}
      >
        <SectionTitle
          title="Our Awards"
          subtitle="Recognition of our commitment to excellence and professional standards"
          centered={true}
        />

        {/* Awards Carousel */}
        <div 
          ref={carouselRef}
          className={`relative max-w-6xl mx-auto mt-12 overflow-hidden transition-all duration-1000
            ${isVisible['awards-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="flex items-center justify-center">
            <button
              onClick={() => navigateAward('prev')}
              className="absolute left-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              disabled={isTransitioning}
              aria-label="Previous award"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            {awards.map((award, index) => (
              <div
                key={award.id}
                className={`transition-all duration-500 ${
                  index === activeAward ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'
                } ${isTransitioning ? 'pointer-events-none' : ''}`}
                style={{ display: index === activeAward ? 'block' : 'none' }}
              >
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-96">
                      <img 
                        src={award.image} 
                        alt={award.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/50 to-transparent"></div>
                      
                      {/* Award Badge */}
                      <div className="absolute top-4 right-4 bg-accent-orange text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                        <Trophy className="h-4 w-4 mr-2" />
                        Award Winner
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col justify-center">
                      {/* Trophy Icon */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/10 to-accent-orange/10 flex items-center justify-center mb-6">
                        <Trophy className="h-8 w-8 text-primary" />
                      </div>
                      
                      <h3 className="text-2xl font-heading font-bold mb-2 text-gray-900">{award.title}</h3>
                      <p className="text-accent-orange font-medium mb-4">{award.organization}</p>
                      <p className="text-gray-600 leading-relaxed">{award.description}</p>
                      
                      {/* Pagination */}
                      <div className="flex mt-8 space-x-2">
                        {awards.map((_, idx) => (
                          <button
                            key={idx}
                            className={`h-3 rounded-full transition-all duration-300 ${
                              activeAward === idx ? 'bg-primary w-6' : 'bg-gray-300 w-3 hover:bg-gray-400'
                            }`}
                            onClick={() => {
                              if (!isTransitioning && idx !== activeAward) {
                                setIsTransitioning(true);
                                setActiveAward(idx);
                                setTimeout(() => setIsTransitioning(false), 500);
                              }
                            }}
                            aria-label={`View award ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button
              onClick={() => navigateAward('next')}
              className="absolute right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              disabled={isTransitioning}
              aria-label="Next award"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </ContentSection>

      {/* Affiliations & Awards Logos */}
      <ContentSection 
        id="affiliations-section"
        bgColor="bg-gray-50"
        centered={true}
      >
        <SectionTitle
          title="Affiliations & Professional Memberships"
          subtitle="Our commitment to professional excellence through recognized affiliations and certifications"
          centered={true}
        />

        <div 
          className={`mt-12 transition-all duration-1000
            ${isVisible['affiliations-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {affiliations.map((affiliation, index) => (
              <div 
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-2
                ${isVisible['affiliations-section'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                `}
                style={{ transitionDelay: `${200 + (index * 100)}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <img 
                      src={affiliation.image} 
                      alt={affiliation.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h4 className="text-lg font-heading font-bold mb-2 text-gray-900">{affiliation.name}</h4>
                <p className="text-sm text-gray-600">{affiliation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Industry Experience */}
      <ContentSection 
        id="experience-section"
        bgColor="bg-white"
      >
        <SectionTitle
          title="Industry Experience"
          subtitle="Our expertise spans across key sectors, serving diverse clients throughout Tanzania"
          centered={true}
        />

        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div 
              className={`lg:col-span-1 transition-all duration-1000 
                ${isVisible['experience-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
              `}
            >
              <div className="relative">
                <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 z-0 rounded-lg"></div>
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-32 sm:w-40 h-32 sm:h-40 bg-accent-orange/10 z-0 rounded-lg"></div>
                
                <img 
                  src="/images/awards/Hanif-Award-6.jpg" 
                  alt="Hanif Habib with awards" 
                  className="relative z-10 w-full shadow-xl rounded-lg"
                />
                
                <div className="absolute bottom-8 -right-6 bg-white py-4 px-6 shadow-lg rounded-lg">
                  <div className="text-accent-orange text-3xl font-bold">21+</div>
                  <div className="text-gray-600 text-sm">Industry Sectors</div>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-heading font-bold mb-4">Our Approach</h3>
                <p className="text-gray-600 mb-4">
                  Our extensive experience across diverse industries allows us to provide targeted solutions that address the specific challenges and opportunities in each sector.
                </p>
                <p className="text-gray-600">
                  We combine deep industry knowledge with technical expertise to deliver exceptional service to our clients regardless of their industry or size.
                </p>
              </div>
            </div>
            
            <div 
              className={`lg:col-span-2 transition-all duration-1000 
                ${isVisible['experience-section'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
              `}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-white shadow-md p-8 rounded-lg">
                <div className="mb-6">
                  <p className="text-lg text-gray-600">
                    Hanif Habib & Cco. proudly serves clients across numerous industries, 
                    providing specialized accounting, audit, tax, and advisory services 
                    tailored to each sector's unique requirements.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {industryExperience.map((industry, index) => (
                    <div 
                      key={index}
                      className={`flex items-start space-x-3 bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-all duration-300 hover:shadow-md
                      ${isVisible['experience-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                      `}
                      style={{ transitionDelay: `${300 + (index * 50)}ms` }}
                    >
                      <Building className="h-5 w-5 text-accent-orange mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{industry}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="primary"
                  icon={CheckCircle}
                  to="/contact"
                  className="mt-8"
                >
                  Contact Us About Your Industry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Client Testimonials */}
      <ContentSection 
        bgColor="bg-primary"
        id="testimonials-section"
        className="text-white"
      >
        <SectionTitle
          title="Client Testimonials"
          subtitle="What our clients say about our award-winning services"
          centered={true}
          light={true}
        />
        
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Hanif Habib & Cco. has provided exceptional tax advisory services for our mining operations, helping us navigate complex regulatory requirements with ease.",
                author: "David Makala",
                position: "CFO, Tanzanite Mining Company"
              },
              {
                quote: "Their industry knowledge and professional approach to audit services has been invaluable. We've worked with them for over 7 years and consistently receive excellent service.",
                author: "Sarah Kimario",
                position: "Financial Director, East Africa Bank"
              },
              {
                quote: "As a family-owned business, we needed specialized accounting support that understood our unique challenges. Hanif Habib & Cco. delivered beyond our expectations.",
                author: "Michael Njombe",
                position: "Owner, Njombe Retailers"
              },
              {
                quote: "Their expertise in educational institutions finance has helped our school optimize operations and ensure full compliance with all regulations.",
                author: "Grace Mwakasege",
                position: "Principal, Dar International Academy"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white/10 backdrop-blur-sm p-6 rounded-lg transition-all duration-1000
                  ${isVisible['testimonials-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-accent-orange fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <blockquote className="italic text-white/90 mb-6 flex-grow">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-white/70 text-sm">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Awards;