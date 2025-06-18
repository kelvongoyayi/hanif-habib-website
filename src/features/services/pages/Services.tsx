import React, { useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Layout from '../../../shared/components/layout/Layout';
import PageHeader from '../../../shared/components/ui/PageHeader';
import FeatureCard from '../../../shared/components/ui/FeatureCard';
import Button from '../../../shared/components/ui/Button';
import ContentSection from '../../../shared/components/ui/ContentSection';
import { services, categories } from '../data/servicesData';
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { isIntersecting: isInView, ref: sectionRef } = useIntersectionObserver();

  // Filter services based on active category
  const filteredServices = services.filter(service => 
    activeCategory === 'all' || service.category === activeCategory
  );

  return (
    <Layout>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive financial and advisory solutions tailored for your business needs"
        backgroundImage="https://images.pexels.com/photos/7681522/pexels-photo-7681522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <Button 
            to="/contact" 
            variant="white"
          >
            Request a Service
          </Button>
          <Button 
            to="/about" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Learn About Our Approach
          </Button>
        </div>
      </PageHeader>

      {/* Service Categories */}
      <ContentSection 
        bgColor="bg-gray-50"
        id="service-categories"
      >
        <div ref={sectionRef as React.RefObject<HTMLDivElement>} className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-10">
            <div className="inline-flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id 
                     ? 'bg-primary text-white shadow-md'
                     : 'bg-white text-gray-600 hover:text-primary hover:bg-white border border-gray-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  aria-pressed={activeCategory === category.id}
                  id={category.id}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  className={`transition-all duration-500 transform ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <FeatureCard 
                    title={service.title}
                    description={service.shortDescription || (service.description?.substring(0, 120) + '...') || ''}
                    icon={Icon}
                    iconColor={service.iconColor || 'text-primary'}
                    link={service.slug}
                    image={service.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ContentSection>

      {/* Approach Section */}
      <ContentSection
        title="Our Approach"
        subtitle="How we deliver exceptional service and results for our clients"
        centered={true}
        bgColor="bg-white"
        id="service-approach"
      >
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '200ms' }}>
          {[
            {
              title: 'Understand',
              description: 'We begin by thoroughly understanding your business, goals, and challenges.',
              icon: 'search',
              iconColor: 'text-primary',
              image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            },
            {
              title: 'Analyze',
              description: 'Our experts analyze your situation and develop tailored solutions.',
              icon: 'trending-up',
              iconColor: 'text-accent-orange',
              image: 'https://images.pexels.com/photos/7821711/pexels-photo-7821711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            },
            {
              title: 'Implement',
              description: 'We implement solutions with precision and ongoing support.',
              icon: 'check-circle',
              iconColor: 'text-accent-red',
              image: 'https://images.pexels.com/photos/7688358/pexels-photo-7688358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            }
          ].map((step, index) => (
            <div 
              key={step.title}
              className={`text-center overflow-hidden transition-all duration-500 transform hover:shadow-lg ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              <div className="h-48 relative">
                <img 
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <CheckCircle className={`h-12 w-12 ${step.iconColor} text-white`} />
                </div>
              </div>
              <div className="bg-white p-6 shadow-md">
                <h3 className="text-xl font-heading font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection
        bgColor="bg-primary"
        className="text-white"
        id="service-cta"
      >
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '400ms' }}>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Contact us today to discuss how our professional services can help your business succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              to="/contact" 
              variant="white"
              size="lg"
            >
              Contact Us
            </Button>
            <Button 
              to="/about" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              size="lg"
            >
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </ContentSection>
    </Layout>
  );
};

export default Services;