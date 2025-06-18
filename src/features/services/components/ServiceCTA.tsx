import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { Button } from '../../../shared/components';

interface ServiceCTAProps {
  title?: string;
  subtitle?: string;
}

const ServiceCTA: React.FC<ServiceCTAProps> = ({
  title = "Ready to Get Started?",
  subtitle = "Speak with our experts about how this service can benefit your business."
}) => {
  return (
    <div className="bg-primary text-white p-8 shadow-md">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-heading font-bold mb-4">{title}</h2>
        <p className="text-gray-200 mb-8 text-lg">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            to="/contact" 
            variant="white"
            icon={Mail}
          >
            Request this Service
          </Button>
          <Button 
            href="tel:+255785020404" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
            icon={Phone}
          >
            Call Us Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCTA;