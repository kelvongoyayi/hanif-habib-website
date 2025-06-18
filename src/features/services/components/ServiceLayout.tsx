import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../../shared/components/layout/Layout';
import ServiceSidebar from './ServiceSidebar';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '../../../shared/components';

interface ServiceLayoutProps {
  children: React.ReactNode;
  title: string;
  category: string;
  description?: string;
  backgroundImage?: string;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({ 
  children, 
  title,
  category,
  description,
  backgroundImage
}) => {
  // Map category to its label
  const getCategoryLabel = (categoryId: string): string => {
    const categories = {
      'audit': 'Audit & Assurance',
      'business': 'Business Services',
      'tax': 'Tax Services',
      'advisory': 'Advisory Services'
    };
    return categories[categoryId as keyof typeof categories] || 'Services';
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="relative bg-gradient-to-r from-gray-900 to-primary text-white pt-32 pb-20 overflow-hidden">
        {/* Background image */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={backgroundImage} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
              loading="eager"
                             fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-primary opacity-75"></div>
          </div>
        )}
        
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/src/assets/images/pattern.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-white/70 mb-8">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <Link to={`/services#${category}`} className="hover:text-white">
              {getCategoryLabel(category)}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 opacity-50" />
            <span className="text-white font-medium">{title}</span>
          </div>
          
          {/* Banner content */}
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">{title}</h1>
            {description && (
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{description}</p>
            )}
            <div className="flex flex-wrap gap-4">
              <Button 
                to="/contact" 
                variant="white"
                icon={ArrowRight}
                iconPosition="right"
              >
                Request This Service
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <ServiceSidebar />
            </div>
            
            {/* Main content */}
            <div className="lg:w-3/4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceLayout;