import React from 'react';
import { useParams } from 'react-router-dom';
import { getServiceByID } from '../data/servicesData';
import ServiceLayout from '../components/ServiceLayout';
import ServiceHeader from '../components/ServiceHeader';
import ServiceContent from '../components/ServiceContent';
import ContentSection from '../../../shared/components/ui/ContentSection';
import Button from '../../../shared/components/ui/Button';
import RelatedServices from '../components/RelatedServices';
import ServiceCTA from '../components/ServiceCTA';
import { ArrowLeft } from 'lucide-react';

const ServiceTemplate = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = getServiceByID(serviceId || '');

  if (!service) {
    return (
      <ContentSection bgColor="bg-gray-50">
        <div className="text-center py-16">
          <h1 className="text-3xl font-heading font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist or has been moved.</p>
          <Button to="/services" variant="primary" icon={ArrowLeft}>
            Back to Services
          </Button>
        </div>
      </ContentSection>
    );
  }

  const Icon = service.icon;

  return (
    <ServiceLayout 
      title={service.title} 
      category={service.category}
      description={service.description}
      backgroundImage={service.image}
    >
      {/* Service Header with background image */}
      <ServiceHeader
        title={service.title}
        description={service.description || ''}
        icon={Icon}
        iconColor={service.iconColor}
        features={service.features}
        backgroundImage={service.image}
      />
      
      {/* Service Content with image */}
      <ServiceContent 
        content={service.content} 
      />
      
      {/* Full-width sections in container */}
      <div className="mt-8">
        {/* Related Services - Full width */}
        <RelatedServices currentServiceId={service.id} />
        
        {/* Call to Action - Full width */}
        <div className="mt-8">
          <ServiceCTA />
        </div>
      </div>
    </ServiceLayout>
  );
};

export default ServiceTemplate;