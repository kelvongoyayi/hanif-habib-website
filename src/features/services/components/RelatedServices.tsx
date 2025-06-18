import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedServices } from '../data/servicesData';
import ServiceIcon from './ServiceIcon';

interface RelatedServicesProps {
  currentServiceId: string;
}

const RelatedServices: React.FC<RelatedServicesProps> = ({ currentServiceId }) => {
  const relatedServices = getRelatedServices(currentServiceId, 3);

  if (relatedServices.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-8">
      <h2 className="text-2xl font-heading font-bold mb-8 text-center">Related Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedServices.map((service) => {
          const Icon = service.icon;
          
          return (
            <div 
              key={service.id} 
              className="bg-white border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col"
            >
              {service.image && (
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={`${service.title} service`} 
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                    loading="lazy"
                    width="400"
                    height="200"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="p-3 bg-white/90 rounded-lg shadow-md">
                      {React.createElement(Icon, { className: `h-6 w-6 ${service.iconColor}` })}
                    </div>
                  </div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-heading font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{service.shortDescription}</p>
                <Link 
                  to={service.slug}
                  className="mt-auto text-primary hover:text-primary-dark font-medium text-sm flex items-center"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedServices;