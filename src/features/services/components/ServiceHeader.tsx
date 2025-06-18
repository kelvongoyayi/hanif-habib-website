import React from 'react';
import { LucideIcon } from 'lucide-react';
import ServiceIcon from './ServiceIcon';

interface ServiceHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  features?: string[];
  backgroundImage?: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  description,
  icon,
  iconColor = 'text-primary',
  features,
  backgroundImage
}) => {
  return (
    <div className="bg-white shadow-md mb-8 relative overflow-hidden flex flex-col">
      {/* Main image banner */}
      {backgroundImage && (
        <div className="w-full h-64 relative">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <div className="p-3 bg-white/90 rounded-lg shadow-md">
              {React.createElement(icon, { className: `h-6 w-6 ${iconColor}` })}
            </div>
          </div>
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-0 opacity-10 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
            width="1200"
            height="600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/80"></div>
        </div>
        
        <div className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Title and description */}
            <div className="w-full">
              <h1 className="text-3xl font-heading font-bold mb-4">{title}</h1>
              <p className="text-gray-700 text-lg mb-6">{description}</p>
              
              {/* Features list */}
              {features && features.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {features.map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeader;