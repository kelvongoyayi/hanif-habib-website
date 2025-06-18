import React from 'react';
import { ArrowRight, Award, Target, Shield, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from '../../shared/hooks/useIntersectionObserver';

const AboutSnippet = () => {
  // Use shared intersection observer hook
  const { isIntersecting: isInView, ref: sectionRef } = useIntersectionObserver();

  // Values section data
  const valueCards = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Professional Excellence',
      description: 'Our team consists of certified professionals with extensive experience and expertise.'
    },
    {
      icon: <Target className="h-6 w-6 text-accent-orange" />,
      title: 'Client-Centered Approach',
      description: 'We prioritize understanding your unique business needs to deliver tailored solutions.'
    },
    {
      icon: <Award className="h-6 w-6 text-accent-red" />,
      title: 'Industry Recognition',
      description: 'Recipient of multiple awards for excellence in accounting and advisory services.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
      aria-labelledby="about-section-title"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-bl-[100px] opacity-50" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-orange-50 rounded-tr-[80px] opacity-40" aria-hidden="true"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-blue-50/20 to-transparent opacity-30" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left column - Sticky Image */}
          <div className={`w-full lg:w-1/2 mb-8 lg:mb-0 transition-all duration-1000 lg:sticky lg:top-32 ${isInView ? 'opacity-100' : 'opacity-0 translate-x-[-50px]'}`}>
            <div className="relative">
              {/* Blue background shape */}
              <div 
                className={`absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 z-0 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: '200ms' }}
                aria-hidden="true"
              ></div>
              
              {/* Orange accent */}
              <div 
                className={`absolute -bottom-3 sm:-bottom-5 -right-3 sm:-right-5 w-32 sm:w-40 h-32 sm:h-40 bg-accent-orange/10 z-0 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: '300ms' }}
                aria-hidden="true"
              ></div>
              
              {/* Main image */}
              <img 
                src={import.meta.env.BASE_URL + 'images/Hanif_Habib.webp'} 
                alt="Hanif Habib, Founder" 
                className={`shadow-xl relative z-10 w-full max-w-md mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="800"
                height="1000"
                style={{ transitionDelay: '300ms' }}
              />
              
              {/* Quote box with animation - Avatar removed */}
              <div 
                className={`bg-gradient-to-br from-primary to-blue-900 text-white p-8 rounded-xl shadow-xl absolute 
                  -bottom-12 -right-12 z-20 max-w-sm transition-all duration-1000
                  backdrop-blur-sm border border-white/10
                  lg:max-w-md transform hover:scale-[1.02] hover:shadow-2xl
                  ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <div className="relative">
                  <Quote className="absolute -top-4 -left-2 h-12 w-12 text-accent-orange opacity-20" aria-hidden="true" />
                  <Quote className="absolute -bottom-8 -right-2 h-8 w-8 text-accent-orange opacity-10 transform rotate-180" aria-hidden="true" />
                  <div className="relative z-10">
                    <p className="font-heading text-lg italic leading-relaxed text-white/90">
                      "Our mission is to provide exceptional financial services that empower businesses to thrive in a complex economic landscape."
                    </p>
                    <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-4">
                      <div className="text-right">
                        <p className="font-bold text-white">Hanif Habib</p>
                        <p className="text-sm text-white/70">Founder & Managing Partner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Content with animations */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <div className="space-y-6">
              <h2 
                className="text-3xl md:text-4xl font-heading font-bold tracking-tight"
              >
                About Hanif Habib <span className="text-accent-orange inline-block relative">
                  &amp; Cco.
                  <span className="absolute bottom-2 left-0 w-full h-1 bg-accent-orange/30 rounded-full"></span>
                </span>
              </h2>
              
              <div className="w-20 h-1 bg-primary"></div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                Founded in 2010, Hanif Habib &amp; Cco. has grown to become one of Tanzania's most trusted accounting and advisory firms. With a team of highly qualified professionals, we provide comprehensive financial solutions to businesses of all sizes across multiple industries.
              </p>
              
              {/* Value cards without hover expansion */}
              <div className="space-y-4 my-8">
                {valueCards.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex p-4 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-3 rounded-md bg-gray-50 transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-heading font-bold text-gray-900 transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-600 mt-1 tracking-wide">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA link moved up - right after values */}
              <Link 
                to="/about" 
                className="group inline-flex items-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 font-heading font-medium relative overflow-hidden transition-all duration-300"
                aria-label="Learn more about our firm"
              >
                <span>Learn more about our firm</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Stats section - Full width */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 py-8 border-y border-gray-100 w-full">
          {[
            { value: '250+', label: 'Clients Served', highlight: 'text-accent-orange' },
            { value: '15+', label: 'Years Experience', highlight: 'text-primary' },
            { value: '30+', label: 'Team Members', highlight: 'text-accent-red' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className={`text-center transition-all duration-700 transform hover:scale-105 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${600 + (idx * 150)}ms` }}
            >
              <div className={`text-3xl font-bold ${stat.highlight}`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet; 